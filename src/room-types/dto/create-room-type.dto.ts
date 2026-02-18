/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CreateRoomTypeDto {
  @IsUUID()
  hotelId!: string;

  @IsUUID()
  roomTypeId!: string;

  @IsString()
  name!: string;

  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  capacityAdults!: number;

  @IsInt()
  @Min(1)
  capacityChildren!: number;
}
