import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(params: FilterUserDto) {
    try {
      const { offset, limit }: FilterUserDto = params;
      const filters: FilterQuery<User> = {};
      return await this.userModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string): Promise<User | NotFoundException> {
    try {
      const user: User = await this.userModel.findById(id);
      if (!user) return new NotFoundException(`User #${id} not found`);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(payload: CreateUserDto) {
    try {
      const newUser = new this.userModel(payload);
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  update(id: string, payload: UpdateUserDto) {
    return '';
  }

  remove(id: string) {
    return '';
  }
}
