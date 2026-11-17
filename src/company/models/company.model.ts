import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Информация о компании-работодателе или заказчике' })
export class Company {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Название компании' })
  name: string;

  @Field({ nullable: true, description: 'Официальный веб-сайт компании' })
  website?: string;
}