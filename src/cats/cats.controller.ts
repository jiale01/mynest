import {
  Controller,
  Get,
  Post,
  Req,
  Redirect,
  Body,
  Query,
  Param,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/httpException/http-exception.filter';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { CreateCatDto } from './create-cat.dto';
import * as Joi from 'joi';

const createCatSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  breed: Joi.string().required(),
});

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findAll(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
