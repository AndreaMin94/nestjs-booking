import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = await this.prisma.room.create({
      data: {
        description: createRoomDto.description?.trim() ?? undefined,
        roomTypeId: createRoomDto.roomTypeId,
        hotelId: createRoomDto.hotelId,
        number: createRoomDto.roomNumber.trim(),
        floor: createRoomDto.floor,
        status: createRoomDto.status,
      },
    });
    return room;
  }

  async getRoomsByHotelId(hotelId: string) {
    const rooms = await this.prisma.room.findMany({
      where: { hotelId },
      orderBy: { createdAt: 'desc' },
    });
    return rooms;
  }
}
