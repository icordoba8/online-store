import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../products/entities/product.entity';
import { Customer } from './customer.entity';
import { number } from 'joi';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  @Prop({
    type: [
      {
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product: { type: Types.ObjectId, required: true, ref: Product.name },
      },
    ],
    required: true,
  })
  products: [
    {
      quantity: number;
      price: number;
      product: Types.ObjectId;
    },
  ];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
