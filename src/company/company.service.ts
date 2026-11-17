import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyInput, UpdateCompanyInput } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  // Получить список всех компаний
  async findAll() {
    return this.prisma.company.findMany();
  }

  // Найти компанию по ID
  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }

    return company;
  }

  async searchCompanies(searchTerm: string) {
    return this.prisma.company.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive', 
        },
      },
      include: {
        experiences: true, 
      },
    });
  }

  // Создать новую компанию
  async create(input: CreateCompanyInput) {
    return this.prisma.company.create({
      data: {
        name: input.name,
        website: input.website,
      },
    });
  }

  // Обновить существующую компанию
  async update(id: string, input: UpdateCompanyInput) {
    // Сначала проверим, существует ли компания
    await this.findOne(id);

    return this.prisma.company.update({
      where: { id },
      data: {
        name: input.name,
        website: input.website,
      },
    });
  }

  // Удалить компанию
  async remove(id: string): Promise<boolean> {
    await this.findOne(id);

    await this.prisma.company.delete({
      where: { id },
    });

    return true;
  }
}