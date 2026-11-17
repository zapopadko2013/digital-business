import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonInput, UpdatePersonInput } from './dto/person.dto';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.dto';
import { CreateExperienceInput, UpdateExperienceInput } from './dto/experience.dto';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.dto';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== PERSON (ЧЕЛОВЕК) ====================

  async findAllPersons() {
    return this.prisma.person.findMany({
      include: {
        profiles: true,
        skills: true,
        experiences: { include: { company: true } },
        projects: { include: { company: true } },
      },
    });
  }

  async findFirstPerson() {
    const person = await this.prisma.person.findFirst({
      include: {
        profiles: true,
        skills: true,
        experiences: { include: { company: true } },
        projects: { include: { company: true } },
      },
    });

    if (!person) {
      throw new NotFoundException('Person not found in database.');
    }

    return person;
  }

  async findPersonById(id: string) {
    const person = await this.prisma.person.findUnique({
      where: { id },
      include: {
        profiles: true,
        skills: true,
        experiences: { include: { company: true } },
        projects: { include: { company: true } },
      },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID "${id}" not found.`);
    }

    return person;
  }

  async createPerson(input: CreatePersonInput) {
    return this.prisma.person.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
      },
      include: {
        profiles: true,
        skills: true,
        experiences: true,
        projects: true,
      },
    });
  }

  async updatePerson(id: string, input: UpdatePersonInput) {
    await this.findPersonById(id); // Проверка на существование

    return this.prisma.person.update({
      where: { id },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
      },
      include: {
        profiles: true,
        skills: true,
        experiences: true,
        projects: true,
      },
    });
  }

  async removePerson(id: string): Promise<boolean> {
    await this.findPersonById(id);

    await this.prisma.person.delete({
      where: { id },
    });

    return true;
  }


  // ==================== SKILLS (НАВЫКИ) ====================

  async findAllSkills() {
    return this.prisma.skill.findMany({ include: { person: true } });
  }

  async findFirstSkill() {
    const skill = await this.prisma.skill.findFirst({ include: { person: true } });
    if (!skill) throw new NotFoundException('Skill not found.');
    return skill;
  }

  async createSkill(input: CreateSkillInput) {
    return this.prisma.skill.create({
      data: {
        name: input.name,
        category: input.category,
        personId: input.personId,
      },
      include: { person: true },
    });
  }

  async updateSkill(id: string, input: UpdateSkillInput) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException(`Skill with ID "${id}" not found.`);

    return this.prisma.skill.update({
      where: { id },
      data: {
        name: input.name,
        category: input.category,
      },
      include: { person: true },
    });
  }

  async removeSkill(id: string): Promise<boolean> {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException(`Skill with ID "${id}" not found.`);

    await this.prisma.skill.delete({ where: { id } });
    return true;
  }


  // ==================== EXPERIENCES (ОПЫТ РАБОТЫ) ====================

  async findAllExperiences() {
    return this.prisma.experience.findMany({ include: { person: true, company: true } });
  }

  async findFirstExperience() {
    const exp = await this.prisma.experience.findFirst({ include: { person: true, company: true } });
    if (!exp) throw new NotFoundException('Experience not found.');
    return exp;
  }

  async createExperience(input: CreateExperienceInput) {
    return this.prisma.experience.create({
      data: {
        position: input.position,
        period: input.period,
        achievements: input.achievements,
        personId: input.personId,
        companyId: input.companyId,
      },
      include: { person: true, company: true },
    });
  }

  async updateExperience(id: string, input: UpdateExperienceInput) {
    const exp = await this.prisma.experience.findUnique({ where: { id } });
    if (!exp) throw new NotFoundException(`Experience with ID "${id}" not found.`);

    return this.prisma.experience.update({
      where: { id },
      data: {
        position: input.position,
        period: input.period,
        achievements: input.achievements,
        companyId: input.companyId,
      },
      include: { person: true, company: true },
    });
  }

  async removeExperience(id: string): Promise<boolean> {
    const exp = await this.prisma.experience.findUnique({ where: { id } });
    if (!exp) throw new NotFoundException(`Experience with ID "${id}" not found.`);

    await this.prisma.experience.delete({ where: { id } });
    return true;
  }


  // ==================== PROJECTS (ПРОЕКТЫ) ====================

  async findAllProjects() {
    return this.prisma.project.findMany({ include: { person: true, company: true } });
  }

  async findFirstProject() {
    const proj = await this.prisma.project.findFirst({ include: { person: true, company: true } });
    if (!proj) throw new NotFoundException('Project not found.');
    return proj;
  }

  async createProject(input: CreateProjectInput) {
    return this.prisma.project.create({
      data: {
        name: input.name,
        url: input.url,
        personId: input.personId,
        companyId: input.companyId,
      },
      include: { person: true, company: true },
    });
  }

  async updateProject(id: string, input: UpdateProjectInput) {
    const proj = await this.prisma.project.findUnique({ where: { id } });
    if (!proj) throw new NotFoundException(`Project with ID "${id}" not found.`);

    return this.prisma.project.update({
      where: { id },
      data: {
        name: input.name,
        url: input.url,
        companyId: input.companyId,
      },
      include: { person: true, company: true },
    });
  }

  async removeProject(id: string): Promise<boolean> {
    const proj = await this.prisma.project.findUnique({ where: { id } });
    if (!proj) throw new NotFoundException(`Project with ID "${id}" not found.`);

    await this.prisma.project.delete({ where: { id } });
    return true;
  }
}