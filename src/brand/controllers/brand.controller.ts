import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { BrandService } from '../services/brand.service';
import { CreateBrandDto } from '../dtos/brand.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bands')
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  async getProducts(
    @Query()
    params: any,
  ) {
    return await this.brandService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  // @Get(':id')
  // @HttpCode(HttpStatus.ACCEPTED)
  // async getOne(@Param('id', MongoIdPipe) id: string) {
  //   return await this.productsService.findOne(id);
  // }

  @Post()
  async create(@Body() payload: CreateBrandDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return await this.brandService.create(payload);
  }

  // @Put(':id')
  // async update(
  //   @Param('id', MongoIdPipe) id: string,
  //   @Body() payload: UpdateProductDto,
  // ) {
  //   return await this.productsService.update(id, payload);
  // }

  // @Delete(':id')
  // async delete(@Param('id', MongoIdPipe) id: string) {
  //   return await this.productsService.remove(id);
  // }
}
