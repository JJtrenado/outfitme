import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GarmentDocument = HydratedDocument<Garment>;

@Schema()
export class Garment {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop()
  barCode: string;

  @Prop()
  img: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  avaliable: boolean;
}

export const GarmentSchema = SchemaFactory.createForClass(Garment);
