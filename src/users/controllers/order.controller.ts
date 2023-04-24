import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateOderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dto/order.dto';
import { OrdersService } from '../services/orders.service';
import { ParseIntPartialPipe } from '../../common/parse-int-partial/parse-int-partial.pipe';
import { MongoIdPipe } from '../../common/pipes/mongo-id/mongo-id.pipe';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  getAll(
    @Query(new ParseIntPartialPipe(['limit', 'offset']))
    params: FilterOrderDto,
  ) {
    return this.ordersService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }
  @Get('/user/:id')
  getOrdersUser(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateOderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Put(':id/product/:productId')
  addProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.addProduct(id, productId);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':id/product/:productId')
  deleteProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
