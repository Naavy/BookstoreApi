import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleType } from './role.enum';
import { Role } from './user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findByName(name: RoleType): Promise<Role> {
    return this.rolesRepository.findOne({ where: { name } });
  }
}
