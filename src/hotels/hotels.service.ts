import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: {
    name: string;
    description?: string;
    address?: string;
    timezone?: string;
    checkInTime?: string;
    checkOutTime?: string;
  }) {
    const hotel = await this.prisma.hotel.create({
      data: {
        name: input.name.trim(),
        timezone: input.timezone?.trim() ?? undefined,
        description: input.description?.trim(),
        address: input.address?.trim(),
        checkInTime: input.checkInTime?.trim() ?? undefined,
        checkOutTime: input.checkOutTime?.trim() ?? undefined,
      },
    });
    return hotel;
  }

  async findAll(params: { q?: string; skip: number; take: number }) {
    const where = params.q
      ? {
          name: { contains: params.q, mode: 'insensitive' as const },
        }
      : undefined;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.hotel.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: params.skip,
        take: params.take,
      }),
      this.prisma.hotel.count({ where }),
    ]);

    return {
      items,
      page: { skip: params.skip, take: params.take, total },
    };
  }

  async findOne(id: string) {
    const hotel = await this.prisma.hotel.findUnique({ where: { id } });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async update(
    id: string,
    input: {
      name?: string;
      address?: string;
      description?: string;
      timezone?: string;
      checkInTime?: string;
      checkOutTime?: string;
    },
  ) {
    const hotel = await this.prisma.hotel.update({
      where: { id },
      data: {
        name: input.name?.trim(),
        description: input.description?.trim(),
        address: input.address?.trim(),
        timezone: input.timezone?.trim(),
        checkInTime: input.checkInTime?.trim(),
        checkOutTime: input.checkOutTime?.trim(),
      },
    });
    return hotel;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.hotel.delete({ where: { id } });
    return { deleted: true };
  }
}
