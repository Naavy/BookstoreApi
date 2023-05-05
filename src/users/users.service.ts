import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleType } from './role.enum';
import { RolesService } from './roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.email = createUserDto.email;

    if (createUserDto.role === RoleType.Admin) {
      const adminRole = await this.rolesService.findByName(RoleType.Admin);
      user.roles = [adminRole];
    } else {
      const defaultRole = await this.rolesService.findByName(RoleType.User);
      user.roles = [defaultRole];
    }

    return this.usersRepository.save(user);
  }
}
