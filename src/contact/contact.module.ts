import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entites from './entities';
@Module({
  imports: [TypeOrmModule.forFeature(entites)],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
