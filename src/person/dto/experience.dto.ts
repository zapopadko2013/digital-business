import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания записи об опыте работы' })
export class CreateExperienceInput {
  @Field({ description: 'Должность' })
  position: string;

  @Field({ description: 'Период работы (например, 2022 - Present)' })
  period: string;

  @Field(() => [String], { description: 'Список достижений' })
  achievements: string[];

  @Field({ description: 'ID владельца (Person)' })
  personId: string;

  @Field({ description: 'ID компании-работодателя (Company)' })
  companyId: string;
}

@InputType({ description: 'Данные для обновления опыта работы' })
export class UpdateExperienceInput extends PartialType(CreateExperienceInput) {}