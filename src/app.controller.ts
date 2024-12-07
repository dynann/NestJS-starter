import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { NinjasService } from './ninjas/ninjas.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly ninjaService: NinjasService,
  ) {}

  @Get('/cat')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getAllData(): string[] {
    return [
      JSON.stringify(this.userService.findAll()),
      JSON.stringify(this.ninjaService.getNinjas()),
    ];
  }
}
