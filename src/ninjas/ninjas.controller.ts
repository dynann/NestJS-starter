import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

//dependencies injection

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  // GET /ninjas --> []

  // @Get()
  // getNinjas() {
  //   return [];
  // }

  // GET /ninjas?type=fast --> []
  // @Get()
  // getNinjas(@Query('type') type: string) {
  //   return [{ type }];
  // }

  //GET /ninjas by weapon //ninjas?type=sword
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'sword') {
    return this.ninjasService.getNinjas(weapon);
  }

  //GET /ninjas

  @Get(':id')
  getOneNinjas(@Param('id') id: string) {
    try {
      return this.ninjasService.getNinja(+id);
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // Post /ninjas
  @Post()
  createNinja(@Body() createNinjasDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjasDto);
  }

  // PUT /ninjas/:id
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
