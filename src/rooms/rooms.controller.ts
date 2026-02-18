import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('hotels/:hotelId/rooms')
  getRoomsByHotelId(@Param('hotelId') hotelId: string) {
    return this.roomsService.getRoomsByHotelId(hotelId);
  }
}
