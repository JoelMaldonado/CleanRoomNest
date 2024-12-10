import { Module } from '@nestjs/common';
import { FrigobarService } from './frigobar.service';
import { FrigobarController } from './frigobar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frigobar } from './entities/frigobar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Frigobar])],
  controllers: [FrigobarController],
  providers: [FrigobarService],
})
export class FrigobarModule {}
