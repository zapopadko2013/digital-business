import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания человека' })
export class CreatePersonInput {
  @Field({ description: 'Имя' })
  firstName: string;

  @Field({ description: 'Фамилия' })
  lastName: string;

  @Field({ description: 'Email (уникальный)' })
  email: string;
}

@InputType({ description: 'Данные для обновления человека' })
export class UpdatePersonInput extends PartialType(CreatePersonInput) {}