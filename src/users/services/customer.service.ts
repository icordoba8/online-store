import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../entities/customer.entity';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(params: FilterCustomerDto) {
    try {
      const { offset, limit }: FilterCustomerDto = params;
      const filters: FilterQuery<Customer> = {};
      return await this.customerModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    return this.customerModel.findById(id);
  }

  create(data: CreateCustomerDto) {
    const newModel = new this.customerModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    return this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
