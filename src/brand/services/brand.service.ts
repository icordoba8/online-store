import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  async findAll(): Promise<Brand[]> {
    try {
      return await this.brandModel.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const brand = await this.brandModel.findById(id).exec();
      if (!brand) {
        throw new NotFoundException(`Brand #${id} not found`);
      }
      return brand;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async create(payload: CreateBrandDto) {
    try {
      const newProduct = new this.brandModel(payload);
      return await newProduct.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, payload: UpdateBrandDto) {
    try {
      const brand: Brand = await this.brandModel.findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        { new: true },
      );
      if (!brand) throw new NotFoundException(`Brand #${id} not found`);
      return brand;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const brand: Brand = await this.brandModel.findById(id);
      if (!brand) {
        throw new NotFoundException(`Brand #${id} not found`);
      }
      return await this.brandModel.findByIdAndRemove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
