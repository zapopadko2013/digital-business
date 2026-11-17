import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания проекта' })
export class CreateProjectInput {
  @Field({ description: 'Название проекта' })
  name: string;

  @Field({ description: 'Ссылка на проект' })
  url: string;

  @Field({ description: 'ID владельца (Person)' })
  personId: string;

  @Field({ nullable: true, description: 'ID связанной компании (опционально)' })
  companyId?: string;
}

@InputType({ description: 'Данные для обновления проекта' })
export class UpdateProjectInput extends PartialType(CreateProjectInput) {}