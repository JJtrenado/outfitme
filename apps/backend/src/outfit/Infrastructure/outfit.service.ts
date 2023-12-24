import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Outfit } from './outfit.schema';
import { CreateOutfitDto } from '../Application/create-outfit.dto';
import { Model } from 'mongoose';

@Injectable()
export class OutfitService {
  constructor(@InjectModel(Outfit.name) private outfitModel: Model<Outfit>) {}

  async create(createOutfitDto: CreateOutfitDto): Promise<Outfit> {
    const createdOutfit = new this.outfitModel(createOutfitDto);
    return createdOutfit.save();
  }

  // async findAll(): Promise<Outfit[]> {
  //   return this.outfitModel.find().exec();
  // }

  async findByUser(userId: string): Promise<Outfit[]> {
    return this.outfitModel.find({ user: userId }).exec();
  }

  async deleteByValidationCode(validation: string): Promise<boolean> {
    const deletedOutfit = await this.outfitModel
      .findOneAndDelete({ validation: validation })
      .exec();
    if (deletedOutfit) {
      return true;
    }
    return false;
  }

  async deleteOutfitByGarment(barCode: string): Promise<boolean> {
    const outfitDeletedByCabeza = await this.outfitModel
      .findOneAndDelete({ cabezaBarCode: barCode })
      .exec();
    const outfitDeletedBytorso = await this.outfitModel
      .findOneAndDelete({ torsoBarCode: barCode })
      .exec();
    const outfitDeletedByPiernas = await this.outfitModel
      .findOneAndDelete({ piernasBarCode: barCode })
      .exec();
    const outfitDeletedByPies = await this.outfitModel
      .findOneAndDelete({ piesBarCode: barCode })
      .exec();

    if (
      outfitDeletedByCabeza ||
      outfitDeletedBytorso ||
      outfitDeletedByPiernas ||
      outfitDeletedByPies
    ) {
      return true;
    }
    return false;
  }
}
