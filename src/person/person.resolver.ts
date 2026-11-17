import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PersonService } from './person.service';

// Импортируем GraphQL-модели
import { Person } from './models/person.model';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';
import { Project } from './models/project.model';

// Импортируем DTO
import { CreatePersonInput, UpdatePersonInput } from './dto/person.dto';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.dto';
import { CreateExperienceInput, UpdateExperienceInput } from './dto/experience.dto';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.dto';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  // ==================== PERSON (ЧЕЛОВЕК) ====================

  @Query(() => [Person], { name: 'persons', description: 'Получить список всех людей' })
  async persons() {
    return this.personService.findAllPersons();
  }

  @Query(() => Person, { name: 'firstPerson', description: 'Получить первую запись человека' })
  async firstPerson() {
    return this.personService.findFirstPerson();
  }

  @Query(() => Person, { name: 'person', description: 'Получить человека по ID' })
  async person(@Args('id', { type: () => ID }) id: string) {
    return this.personService.findPersonById(id);
  }

  @Mutation(() => Person, { name: 'createPerson', description: 'Создать человека' })
  async createPerson(@Args('input') input: CreatePersonInput) {
    return this.personService.createPerson(input);
  }

  @Mutation(() => Person, { name: 'updatePerson', description: 'Обновить человека' })
  async updatePerson(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePersonInput,
  ) {
    return this.personService.updatePerson(id, input);
  }

  @Mutation(() => Boolean, { name: 'deletePerson', description: 'Удалить человека' })
  async deletePerson(@Args('id', { type: () => ID }) id: string) {
    return this.personService.removePerson(id);
  }


  // ==================== SKILLS (НАВЫКИ) ====================

  @Query(() => [Skill], { name: 'skills', description: 'Получить все навыки' })
  async skills() {
    return this.personService.findAllSkills();
  }

  @Query(() => Skill, { name: 'firstSkill', description: 'Получить первый навык' })
  async firstSkill() {
    return this.personService.findFirstSkill();
  }

  @Mutation(() => Skill, { name: 'createSkill', description: 'Добавить навык человеку' })
  async createSkill(@Args('input') input: CreateSkillInput) {
    return this.personService.createSkill(input);
  }

  @Mutation(() => Skill, { name: 'updateSkill', description: 'Обновить навык' })
  async updateSkill(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSkillInput,
  ) {
    return this.personService.updateSkill(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteSkill', description: 'Удалить навык' })
  async deleteSkill(@Args('id', { type: () => ID }) id: string) {
    return this.personService.removeSkill(id);
  }


  // ==================== EXPERIENCES (ОПЫТ РАБОТЫ) ====================

  @Query(() => [Experience], { name: 'experiences', description: 'Получить весь опыт работы' })
  async experiences() {
    return this.personService.findAllExperiences();
  }

  @Query(() => Experience, { name: 'firstExperience', description: 'Получить первую запись опыта' })
  async firstExperience() {
    return this.personService.findFirstExperience();
  }

  @Mutation(() => Experience, { name: 'createExperience', description: 'Добавить опыт работы' })
  async createExperience(@Args('input') input: CreateExperienceInput) {
    return this.personService.createExperience(input);
  }

  @Mutation(() => Experience, { name: 'updateExperience', description: 'Обновить опыт работы' })
  async updateExperience(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateExperienceInput,
  ) {
    return this.personService.updateExperience(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteExperience', description: 'Удалить опыт работы' })
  async deleteExperience(@Args('id', { type: () => ID }) id: string) {
    return this.personService.removeExperience(id);
  }


  // ==================== PROJECTS (ПРОЕКТЫ) ====================

  @Query(() => [Project], { name: 'projects', description: 'Получить все проекты' })
  async projects() {
    return this.personService.findAllProjects();
  }

  @Query(() => Project, { name: 'firstProject', description: 'Получить первый проект' })
  async firstProject() {
    return this.personService.findFirstProject();
  }

  @Mutation(() => Project, { name: 'createProject', description: 'Добавить проект' })
  async createProject(@Args('input') input: CreateProjectInput) {
    return this.personService.createProject(input);
  }

  @Mutation(() => Project, { name: 'updateProject', description: 'Обновить проект' })
  async updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProjectInput,
  ) {
    return this.personService.updateProject(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteProject', description: 'Удалить проект' })
  async deleteProject(@Args('id', { type: () => ID }) id: string) {
    return this.personService.removeProject(id);
  }
}