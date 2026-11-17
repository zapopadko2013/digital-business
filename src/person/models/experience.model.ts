import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Person } from './person.model';
import { Company } from '../../company/models/company.model';

@ObjectType({ description: 'Опыт работы' })
export class Experience {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Должность' })
  position: string;

  @Field({ description: 'Период работы (например, 2021 - Present)' })
  period: string;

  @Field(() => [String], { description: 'Список достижений на позиции' })
  achievements: string[];

  @Field(() => ID)
  personId: string;

  @Field(() => Person)
  person: Person;

  @Field(() => ID)
  companyId: string;

  @Field(() => Company, { description: 'Компания-работодатель' })
  company: Company;
}