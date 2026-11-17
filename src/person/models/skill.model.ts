import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Person } from './person.model';

@ObjectType({ description: 'Навык' })
export class Skill {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Название навыка (например, TypeScript, NestJS)' })
  name: string;

  @Field({ nullable: true, description: 'Категория навыка (например, Backend, Frontend)' })
  category?: string;

  @Field(() => ID)
  personId: string;

  @Field(() => Person)
  person: Person;
}