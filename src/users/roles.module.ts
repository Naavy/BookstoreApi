import { Module } from '@nestjs/common';
import { Role } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
