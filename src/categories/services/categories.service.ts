import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto, CreateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  findAll() {
    return '';
  }

  findOne(id: string) {
    return '';
  }

  create(payload: CreateCategoryDto) {
    return '';
  }

  update(id: string, payload: UpdateCategoryDto) {
    return '';
  }

  remove(id: string) {
    return '';
  }
}
