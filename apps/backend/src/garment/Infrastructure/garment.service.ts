import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Garment } from './garment.schema';
import { CreateGarmentDto } from './create-garment.dto';

@Injectable()
export class GarmentService {
  constructor(
    @InjectModel(Garment.name) private garmentModel: Model<Garment>,
  ) {}

  async create(createGarmentDto: CreateGarmentDto): Promise<Garment> {
    const createdGarment = new this.garmentModel(createGarmentDto);
    return createdGarment.save();
  }

  async findAll(): Promise<Garment[]> {
    return this.garmentModel.find().exec();
  }

  async findByUser(userId: string): Promise<Garment[]> {
    return this.garmentModel.find({ user: userId }).exec();
  }
}
