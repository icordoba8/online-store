import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/product.dto';

import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from '../../common/pipes/mongo-id/mongo-id.pipe';
import { ParseIntPartialPipe } from 'src/common/parse-int-partial/parse-int-partial.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query(new ParseIntPartialPipe(['limit', 'offset', 'minPrice', 'maxPrice']))
    params: FilterProductsDto,
  ) {
    return await this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('id', MongoIdPipe) id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return await this.productsService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.productsService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    return await this.productsService.remove(id);
  }
}
