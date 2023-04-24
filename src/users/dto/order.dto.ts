import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsPositive,
  Min,
  IsArray,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly customer: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly products: [
    {
      quantity: number;
      price: number;
      product: string;
    },
  ];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOderDto, ['products']), // 👈 implement OmitType
) {}
export class FilterOrderDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;
}
