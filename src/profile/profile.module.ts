import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PersonModule } from '../person/person.module'; 

@Module({
  imports: [PrismaModule, PersonModule], 
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}