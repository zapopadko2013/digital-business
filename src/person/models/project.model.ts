import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Person } from './person.model';
import { Company } from '../../company/models/company.model';

@ObjectType({ description: 'Проект' })
export class Project {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Название проекта' })
  name: string;

  @Field({ description: 'Ссылка на проект' })
  url: string;

  @Field(() => ID)
  personId: string;

  @Field(() => Person)
  person: Person;

  @Field(() => ID, { nullable: true })
  companyId?: string;

  @Field(() => Company, { nullable: true, description: 'Компания, если проект связан с ней' })
  company?: Company;
}