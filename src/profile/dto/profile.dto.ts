import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания профиля' })
export class CreateProfileInput {
  @Field({ description: 'Уникальный slug (например, ivan-backend)' })
  slug: string;

  @Field({ description: 'Название визитки (например, Fullstack Portfolio)' })
  name: string;

  @Field({ description: 'Краткое описание' })
  description: string;

  @Field(() => [String], { description: 'Массив ссылок' })
  links: string[];

  @Field({ description: 'ID владельца (Person)' })
  personId: string;
}

@InputType({ description: 'Данные для обновления профиля' })
export class UpdateProfileInput extends PartialType(CreateProfileInput) {}