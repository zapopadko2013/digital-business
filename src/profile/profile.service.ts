import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileInput, UpdateProfileInput } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Получить список всех профилей
  async findAll() {
    return this.prisma.profile.findMany({
      include: {
        person: {
          include: {
            profiles: true,
            skills: true,
            experiences: { include: { company: true } },
            projects: { include: { company: true } },
          },
        },
        skills: true,
        experiences: { include: { company: true } },
        projects: true,
      },
    });
  }

  // 2. Получить один профиль по slug (для публичной страницы визитки)
  async findBySlug(slug: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { slug },
      include: {
        person: {
          include: {
            profiles: true,
            skills: true,
            experiences: { include: { company: true } },
            projects: { include: { company: true } },
          },
        },
        skills: true,
        experiences: { include: { company: true } },
        projects: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with slug "${slug}" not found`);
    }

    return profile;
  }

  // 3. Создать новый профиль (привязывая его к существующему personId)
  async create(input: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        slug: input.slug,
        name: input.name,
        description: input.description,
        links: input.links,
        personId: input.personId, // ID владельца из таблицы Person
      },
      include: {
        person: {
          include: {
            profiles: true,
            skills: true,
            experiences: { include: { company: true } },
            projects: { include: { company: true } },
          },
        },
        skills: true,
        experiences: { include: { company: true } },
        projects: true,
      },
    });
  }

  // 4. Обновить профиль
  async update(id: string, input: UpdateProfileInput) {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }

    return this.prisma.profile.update({
      where: { id },
      data: {
        slug: input.slug,
        name: input.name,
        description: input.description,
        links: input.links,
      },
      include: {
        person: {
          include: {
            profiles: true,
            skills: true,
            experiences: { include: { company: true } },
            projects: { include: { company: true } },
          },
        },
        skills: true,
        experiences: { include: { company: true } },
        projects: true,
      },
    });
  }

  // 5. Удалить профиль
  async remove(id: string): Promise<boolean> {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }

    await this.prisma.profile.delete({
      where: { id },
    });

    return true;
  }
}