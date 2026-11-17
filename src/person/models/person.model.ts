import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from '../../profile/models/profile.model';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType({ description: 'Сущность человека (владелец визитки)' })
export class Person {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Имя' })
  firstName: string;

  @Field({ description: 'Фамилия' })
  lastName: string;

  @Field({ description: 'Email' })
  email: string;

  @Field(() => [Profile], { description: 'Связанные цифровые визитки' })
  profiles: Profile[];

  @Field(() => [Skill], { description: 'Навыки человека' })
  skills: Skill[];

  @Field(() => [Experience], { description: 'Опыт работы человека' })
  experiences: Experience[];

  @Field(() => [Project], { description: 'Проекты человека' })
  projects: Project[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}