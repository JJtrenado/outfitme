import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OutfitDocument = HydratedDocument<Outfit>;

@Schema()
export class Outfit {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true, unique: true })
  validation: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  cabezaBarCode: string;

  @Prop()
  torsoBarCode: string;

  @Prop()
  piernasBarCode: string;

  @Prop()
  piesBarCode: string;

  @Prop({ required: true })
  available: boolean;
}

export const OutfitSchema = SchemaFactory.createForClass(Outfit);
