import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
