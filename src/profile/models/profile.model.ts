import { ObjectType, Field, ID } from '@nestjs/graphql';
// Импортируем связанные типы (их можно вынести в отдельные файлы или импортировать из person/company)
import { Person } from '../../person/models/person.model';
import { Skill } from '../../person/models/skill.model';
import { Experience } from '../../person/models/experience.model';
import { Project } from '../../person/models/project.model';

@ObjectType({ description: 'Цифровая визитка (Profile)' })
export class Profile {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Уникальный URL-идентификатор (slug)' })
  slug: string;

  @Field({ description: 'Название профиля' })
  name: string;

  @Field({ description: 'Описание / Статус' })
  description: string;

  @Field(() => [String], { description: 'Ссылки на соцсети и ресурсы' })
  links: string[];

  @Field(() => ID, { description: 'ID владельца профиля' })
  personId: string;

  @Field(() => Person, { description: 'Владелец профиля' })
  person: Person;

  @Field(() => [Skill], { description: 'Навыки, привязанные к этому профилю' })
  skills: Skill[];

  @Field(() => [Experience], { description: 'Опыт работы, привязанный к профилю' })
  experiences: Experience[];

  @Field(() => [Project], { description: 'Проекты, привязанные к профилю' })
  projects: Project[];

  @Field(() => Date, { description: 'Дата создания' })
  createdAt: Date;

  @Field(() => Date, { description: 'Дата обновления' })
  updatedAt: Date;
}