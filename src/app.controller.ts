import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { NinjasService } from './ninjas/ninjas.service';
import { Roles } from 'roles.decorator';
import { Role } from 'role.enum';

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
  @Roles(Role.Admin)
  async getAllData(): Promise<string[]> {
    const user = await this.userService.findAll();
    return [
      JSON.stringify(user),
      JSON.stringify(this.ninjaService.getNinjas()),
    ];
  }
}
