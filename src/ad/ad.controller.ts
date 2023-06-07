import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AdService } from '@app/ad/ad.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { CreateAdDto } from './dto/createAd.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { AdResponseInterface } from './types/adResponse.interface';
import { AdsResponseInterface } from './types/adsResponse.interface';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { CommentsRO } from './commentInt.interface';
import { CreateCommentDto } from './dto/createComment.dto';
import { EmailConfirmationGuard } from '@app/email/emailConfirmation.guard';
import { AdEntity } from './ad.entity';

@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<AdsResponseInterface> {
    return await this.adService.findAll(currentUserId, query);
  }
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body() createAdDto: CreateAdDto,
  ): Promise<AdResponseInterface> {
    const ad = await this.adService.createAd(currentUser, createAdDto);
    console.log(ad);

    return this.adService.buildAdResponse(ad);
  }
  @Get(':slug')
  async getSingleAd(@Param('slug') slug: string): Promise<AdResponseInterface> {
    const ad = await this.adService.findBySlug(slug);
    return this.adService.buildAdResponse(ad);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async deleteAd(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.adService.deleteAd(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateAd(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body() updateAdDto: CreateAdDto,
  ) {
    const ad = await this.adService.updateAd(slug, updateAdDto, currentUserId);
    return this.adService.buildAdResponse(ad);
  }
  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addAdToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<AdResponseInterface> {
    const ad = await this.adService.addAdToFavorites(slug, currentUserId);
    return this.adService.buildAdResponse(ad);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async removeAdFromFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<AdResponseInterface> {
    const ad = await this.adService.removeAdFromFavorites(slug, currentUserId);
    return this.adService.buildAdResponse(ad);
  }

  @Get(':slug/comments')
  async findComments(@Param('slug') slug): Promise<CommentsRO> {
    return await this.adService.findComments(slug);
  }

  @Post(':slug/comments')
  @UseGuards(AuthGuard)
  async createComment(
    @User() currentUserId: UserEntity,
    @Param('slug') slug,
    @Body('comment') commentData: CreateCommentDto,
  ) {
    return await this.adService.addComment(currentUserId, slug, commentData);
  }

  @Delete(':slug/comments/:id')
  @UseGuards(AuthGuard)
  async deleteComment(@Param() params) {
    const { slug, id } = params;
    return await this.adService.deleteComment(slug, id);
  }

  @Get()
  async getUsersNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<AdsResponseInterface> {
    return await this.adService.findAll(latitude, longitude);
  }
}
