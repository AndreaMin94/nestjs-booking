/* eslint-disable @typescript-eslint/no-unsafe-call */
import { RoomStatus } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @IsUUID()
  hotelId!: string;

  @IsUUID()
  roomTypeId!: string;

  @IsString()
  roomNumber!: string;

  @IsInt()
  @Min(0)
  floor!: number;

  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus; // default ACTIVE se omesso

  @IsString()
  description!: string;
}
