import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания навыка' })
export class CreateSkillInput {
  @Field({ description: 'Название навыка (например, TypeScript)' })
  name: string;

  @Field({ nullable: true, description: 'Категория (например, Frontend, Backend)' })
  category?: string;

  @Field({ description: 'ID владельца (Person)' })
  personId: string;
}

@InputType({ description: 'Данные для обновления навыка' })
export class UpdateSkillInput extends PartialType(CreateSkillInput) {}