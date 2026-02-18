import { Injectable } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoomTypeDto: CreateRoomTypeDto) {
    const roomType = this.prisma.roomType.create({
      data: {
        name: createRoomTypeDto.name.trim(),
        description: createRoomTypeDto.description?.trim(),
        capacityAdults: createRoomTypeDto.capacityAdults,
        capacityChildren: createRoomTypeDto.capacityChildren,
        hotelId: createRoomTypeDto.hotelId,
      },
    });
    return roomType;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomType`;
  }

  update(id: string, updateRoomTypeDto: UpdateRoomTypeDto) {
    const roomType = this.prisma.roomType.update({
      where: { id },
      data: {
        name: updateRoomTypeDto.name?.trim(),
        description: updateRoomTypeDto.description?.trim(),
        capacityAdults: updateRoomTypeDto.capacityAdults,
        capacityChildren: updateRoomTypeDto.capacityChildren,
      },
    });
    return roomType;
  }

  remove(id: number) {
    return `This action removes a #${id} roomType`;
  }
}
