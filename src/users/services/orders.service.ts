import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import {
  CreateOderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dto/order.dto';

export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll(params: FilterOrderDto) {
    try {
      const { offset, limit }: FilterOrderDto = params;
      const filters: FilterQuery<Order> = {};
      const pipeline = [
        {
          $unwind: '$products',
        },
        {
          $lookup: {
            from: 'products',
            localField: 'products.product',
            foreignField: '_id',
            as: 'products.product',
          },
        },
        {
          $group: {
            _id: '$_id',
            date: { $first: '$date' },
            customer: { $first: '$customer' },
            products: { $push: '$products' },
          },
        },
      ];

      return await this.orderModel.aggregate(pipeline);

      return await this.orderModel
        .find(filters)
        .populate('customer')
        .populate({ path: 'products.product', model: 'Product' })
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        throw new NotFoundException(`Order #${id} not found`);
      }
      return order;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(payload: CreateOderDto) {
    try {
      const newProduct = new this.orderModel(payload);
      return await newProduct.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, payload: UpdateOrderDto) {
    try {
      const order: Order = await this.orderModel.findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        { new: true },
      );
      if (!order) throw new NotFoundException(`Order #${id} not found`);
      return order;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addProduct(id: string, productId: string) {
    try {
      const order: Order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException(`Order #${id} not found`);
      }
      return this.orderModel.updateOne(
        { _id: id },
        { $push: { products: { product: productId } } },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const order: Order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException(`Order #${id} not found`);
      }
      return await this.orderModel.findByIdAndRemove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async removeProduct(id: string, productId: string) {
    try {
      const order: Order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException(`Order #${id} not found`);
      }
      return this.orderModel.updateOne(
        { _id: id },
        { $pull: { products: { product: productId } } },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getOrderByUser(id: string): Promise<Order[]> {
    try {
      const filters: FilterQuery<Order> = { customer: id };
      return this.orderModel
        .find(filters)
        .populate('customer')
        .populate('products.product', 'name image brand')
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
