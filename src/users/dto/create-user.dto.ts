export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: string[];
}
