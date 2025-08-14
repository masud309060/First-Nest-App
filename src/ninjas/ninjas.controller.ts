import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) { }

  // GET /ninjas --> []
  @Get()
  @UseGuards(BeltGuard)
  getNinjas(@Query('weapon') weapon: string) {
    // return ninjas;
    // const service = new NinjasService();

    return this.ninjasService.getAllNinjas(weapon);
  }

  // POST /ninjas --> {...}
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // GET /ninjas/:id --> {...}
  @Get(':id')
  getNinjaById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinjaById(id);
    } catch () {
      throw new NotFoundException();
    }
  }

  // PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(updateNinjaDto, parseInt(id));
  }

  // DELETE /ninjas/:id --> {...}
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(parseInt(id));
  }
}
