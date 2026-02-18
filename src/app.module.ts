import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomTypesModule } from './room-types/room-types.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [PrismaModule, HotelsModule, RoomTypesModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
