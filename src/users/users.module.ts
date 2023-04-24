import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/order.controller';
import { CustomersController } from './controllers/customer.controller';

import { User, UserSchema } from './entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';

import { OrdersService } from './services/orders.service';
import { CustomersService } from './services/customer.service';
import { UsersService } from './services/users.service';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [UsersController, OrdersController, CustomersController],
  providers: [UsersService, OrdersService, CustomersService],
})
export class UsersModule {}
