import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from '../../brand/entities/brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  // @Prop(
  //   raw({
  //     name: { type: String },
  //     image: { type: String },
  //   }),
  // )
  // category: Record<string, any>;
  @Prop({ type: Types.ObjectId, ref: Brand.name, required: true })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
