import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Outfit } from './outfit.schema';
import { CreateOutfitDto } from '../Application/create-outfit.dto';
import { OutfitService } from './outfit.service';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';

@Controller('outfits')
export class OutfitController {
  constructor(
    private readonly outfitService: OutfitService,
    private readonly verifyJwtService: VerifyJwtService,
  ) {}

  @Post()
  async create(
    @Body() createOutfitDto: CreateOutfitDto,
    @Req() request: Request,
  ): Promise<Outfit> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        return this.outfitService.create(createOutfitDto);
      }
    }
  }

  @Get('byUser/:userId')
  async findByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ): Promise<Outfit[]> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        return this.outfitService.findByUser(userId);
      }
    }
    console.log('no jwt');
    return null;
  }
}
