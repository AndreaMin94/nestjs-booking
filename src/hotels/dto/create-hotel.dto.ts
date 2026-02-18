/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
const TIME_HH_MM_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class CreateHotelDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  timezone?: string; // es: "Europe/Rome"

  @IsOptional()
  @Matches(TIME_HH_MM_REGEX)
  checkInTime?: string; // "15:00"

  @IsOptional()
  @Matches(TIME_HH_MM_REGEX)
  checkOutTime?: string; // "11:00"
}
