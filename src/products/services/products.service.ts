import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    // @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params: FilterProductsDto): Promise<Product[]> {
    try {
      const { offset, limit, minPrice, maxPrice }: FilterProductsDto = params;
      const filters: FilterQuery<Product> = {};
      if (minPrice && maxPrice)
        filters.price = { $gte: minPrice, $lte: maxPrice };

      return await this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException(`Product #${id} not found`);
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(payload: CreateProductDto) {
    try {
      const newProduct = new this.productModel(payload);
      return await newProduct.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, payload: UpdateProductDto) {
    try {
      const product: Product = await this.productModel.findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        { new: true },
      );
      if (!product) throw new NotFoundException(`Product #${id} not found`);
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const product: Product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException(`Product #${id} not found`);
      }
      return await this.productModel.findByIdAndRemove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
