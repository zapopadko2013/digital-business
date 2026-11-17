import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Входные данные для создания компании' })
export class CreateCompanyInput {
  @Field({ description: 'Название компании' })
  name: string;

  @Field({ nullable: true, description: 'Официальный веб-сайт компании' })
  website?: string;
}

@InputType({ description: 'Входные данные для обновления компании' })
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {}
