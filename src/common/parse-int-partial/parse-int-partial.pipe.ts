import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPartialPipe implements PipeTransform {
  private params: string[];
  constructor(params?: string[]) {
    this.params = params;
  }
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const keysValue: any = Object.keys(value);
      this.params.forEach((key: string) => {
        const param = keysValue.find((param: string) => param === key);
        if (param) {
          const val = parseInt(value[param], 10);
          if (isNaN(val)) {
            throw new BadRequestException(`${val} is not an number`);
          }
          value[param] = val;
        }
      });
      return value;
    } catch (error: any) {
      console.log(error);
      throw new BadRequestException(`Error parce data ${error.name}`);
    }
  }
}
