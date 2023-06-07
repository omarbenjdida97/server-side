import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/createAd.dto';
import { AdEntity } from './ad.entity';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, getRepository } from 'typeorm';
import { UserEntity } from '@app/user/entities/user.entity';
import { AdResponseInterface } from './types/adResponse.interface';
import slugify from 'slugify';
import { AdsResponseInterface } from './types/adsResponse.interface';
import { CommentsRO } from './commentInt.interface';
import { CreateCommentDto } from './dto/createComment.dto';
@Injectable()
export class AdService {
  constructor(
    @InjectRepository(AdEntity)
    private readonly adRepository: Repository<AdEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(
    currentUserId: number,
    query: any,
  ): Promise<AdsResponseInterface> {
    const queryBuilder = getRepository(AdEntity)
      .createQueryBuilder('ads')
      .leftJoinAndSelect('ads.author', 'author');
    if (query.tags) {
      const tags = query.tags.split(',');
      queryBuilder.where('ads.tagList && ARRAY[:...tags]', { tags });
    }
    if (query.latitude && query.longitude) {
      const latitude = query.latitude;
      const longitude = query.longitude;
      const radiusInKm = 30;
      queryBuilder.where(
        `
        2 * 6371 * ASIN(
          SQRT(
            POWER(SIN(RADIANS(ads.latitude - :latitude) / 2), 2) +
            COS(RADIANS(:latitude)) * COS(RADIANS(ads.latitude)) *
            POWER(SIN(RADIANS(ads.longitude - :longitude) / 2), 2)
          )
        )
      <= :radius
      `,
        { latitude, longitude, radius: radiusInKm },
      );
    }
    if (query.latitude && query.longitude && query.tags) {
      const tags = query.tags.split(',');
      const latitude = query.latitude;
      const longitude = query.longitude;
      const radiusInKm = 30;
      queryBuilder.where(
        `
        2 * 6371 * ASIN(
          SQRT(
            POWER(SIN(RADIANS(ads.latitude - :latitude) / 2), 2) +
            COS(RADIANS(:latitude)) * COS(RADIANS(ads.latitude)) *
            POWER(SIN(RADIANS(ads.longitude - :longitude) / 2), 2)
          )
        )
      <= :radius
      AND ads.tagList && ARRAY[:...tags]
      `,
        { latitude, longitude, radius: radiusInKm, tags },
      );
    }
    if (query.type) {
      const types = query.type.split(',');
      queryBuilder.where('ads.type && ARRAY[:...types]', { types });
    }
    if (query.author) {
      const author = await this.userRepository.findOne({
        username: query.author,
      });

      queryBuilder.andWhere('ads.authorId = :id', {
        id: author.id,
      });
    }
    if (query.tags && query.type) {
      const types = query.type.split(',');
      const tags = query.tags.split(',');
      queryBuilder
        .where('ads.type && ARRAY[:...types]', { types })
        .andWhere('ads.tagList && ARRAY[:...tags]', { tags });
    }

    if (query.authorId) {
      const author = await this.userRepository.findOne(query.authorId);
      queryBuilder.andWhere('ads.authorId = :id', { id: author.id });
    }

    if (query.favorited) {
      const author = await this.userRepository.findOne(
        {
          username: query.favorited,
        },
        { relations: ['favorites'] },
      );
      const ids = author.favorites.map((el) => el.id);
      if (ids.length > 0) {
        queryBuilder.andWhere('ads.id IN (:...ids)', { ids });
      } else {
        queryBuilder.andWhere('1=0');
      }
    }
    queryBuilder.orderBy('ads.createdAt', 'DESC');
    const adsCount = await queryBuilder.getCount();
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    let favoriteIds: number[] = [];
    if (currentUserId) {
      const currentUser = await this.userRepository.findOne(currentUserId, {
        relations: ['favorites'],
      });
      favoriteIds = currentUser.favorites.map((favorite) => favorite.id);
    }
    const ads = await queryBuilder.getMany();
    const adsWithFavorited = ads.map((ad) => {
      const favorited = favoriteIds.includes(ad.id);
      return { ...ad, favorited };
    });
    return { ads: adsWithFavorited, adsCount };
  }
  async createAd(
    currentUser: UserEntity,
    createAdDto: CreateAdDto,
  ): Promise<AdEntity> {
    const ad = new AdEntity();
    Object.assign(ad, createAdDto);
    if (!ad.tagList) {
      ad.tagList = [];
    }

    ad.slug = this.getSlug(createAdDto.title);

    ad.author = currentUser;
    console.log(ad);

    return await this.adRepository.save(ad);
  }

  async findBySlug(slug: string): Promise<AdEntity> {
    return await this.adRepository.findOne({ slug });
  }

  async addAdToFavorites(slug: string, userId: number): Promise<AdEntity> {
    const ad = await this.findBySlug(slug);
    const user = await this.userRepository.findOne(userId, {
      relations: ['favorites'],
    });
    const isNotFavorited =
      user.favorites.findIndex(
        (adInFavorites) => adInFavorites.id === ad.id,
      ) === -1;
    if (isNotFavorited) {
      user.favorites.push(ad);
      ad.reccCount++;
      await this.userRepository.save(user);
      await this.adRepository.save(ad);
    }
    return ad;
  }

  async addComment(
    currentUser: UserEntity,
    slug: string,
    commentData: CreateCommentDto,
  ): Promise<AdEntity> {
    let ad = await this.adRepository.findOne({ slug });
    const comment = new Comment();
    comment.author = currentUser;
    comment.body = commentData.body;

    ad.comments.push(comment);
    await this.commentRepository.save(comment);
    ad = await this.adRepository.save(ad);
    return ad;
  }

  async deleteComment(slug: string, id: string): Promise<AdEntity> {
    let ad = await this.adRepository.findOne({ slug });

    const comment = await this.commentRepository.findOne(id);
    const deleteIndex = ad.comments.findIndex(
      (_comment) => _comment.id === comment.id,
    );

    if (deleteIndex >= 0) {
      const deleteComments = ad.comments.splice(deleteIndex, 1);
      await this.commentRepository.delete(deleteComments[0].id);
      ad = await this.adRepository.save(ad);
      return ad;
    } else {
      return ad;
    }
  }

  async findComments(slug: string): Promise<CommentsRO> {
    const ad = await this.adRepository.findOne({ slug });
    return { comments: ad.comments };
  }

  async removeAdFromFavorites(slug: string, userId: number): Promise<AdEntity> {
    const ad = await this.findBySlug(slug);
    const user = await this.userRepository.findOne(userId, {
      relations: ['favorites'],
    });
    const adIndex = user.favorites.findIndex(
      (adInFavorites) => adInFavorites.id === ad.id,
    );
    if (adIndex >= 0) {
      user.favorites.splice(adIndex, 1);
      ad.reccCount--;
      await this.userRepository.save(user);
      await this.adRepository.save(ad);
    }
    return ad;
  }

  buildAdResponse(ad: AdEntity): AdResponseInterface {
    return { ad };
  }
  private getSlugUpdate(title: string): string {
    return slugify(title, { lower: true });
  }
  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  async deleteAd(slug: string, currentUserId: number): Promise<DeleteResult> {
    const ad = await this.findBySlug(slug);
    if (!ad) {
      throw new HttpException('Ad does not exist', HttpStatus.NOT_FOUND);
    }
    if (ad.author.id !== currentUserId) {
      throw new HttpException(
        'You are not an the instructor',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.adRepository.delete({ slug });
  }

  async updateAd(
    slug: string,
    updateAdDto: CreateAdDto,
    currentUserId: number,
  ): Promise<AdEntity> {
    const ad = await this.findBySlug(slug);
    if (!ad) {
      throw new HttpException('Ad does not exist', HttpStatus.NOT_FOUND);
    }

    if (ad.author.id !== currentUserId) {
      throw new HttpException(
        'You are not the instructor',
        HttpStatus.FORBIDDEN,
      );
    }
    if (updateAdDto.title !== ad.title) {
      const lastDashIndex = ad.slug.lastIndexOf('-');
      const oldIdString = ad.slug.substring(lastDashIndex + 1);
      const newSlug = this.getSlugUpdate(updateAdDto.title);
      ad.slug = newSlug + '-' + oldIdString;
    }

    Object.assign(ad, updateAdDto);
    return await this.adRepository.save(ad);
  }

  async getUsersNearby(latitude: number, longitude: number) {
    const radiusInKm = 30;
    console.log(latitude, longitude);
    const ads = await this.adRepository
      .createQueryBuilder('ad')
      .where(
        `
        2 * 6371 * ASIN(
          SQRT(
            POWER(SIN(RADIANS(ad.latitude - :latitude) / 2), 2) +
            COS(RADIANS(:latitude)) * COS(RADIANS(ad.latitude)) *
            POWER(SIN(RADIANS(ad.longitude - :longitude) / 2), 2)
          )
        )
      ) <= :radius
      `,
        { latitude, longitude, radius: radiusInKm },
      )
      .getMany();

    return ads;
  }
}
