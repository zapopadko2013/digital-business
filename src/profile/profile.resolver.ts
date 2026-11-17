import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { CreateProfileInput, UpdateProfileInput } from './dto/profile.dto';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile], { name: 'profiles', description: 'Получить список всех профилей' })
  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileService.findAll();
    return profiles as unknown as Profile[]; 
  }

  @Query(() => Profile, { name: 'profileBySlug', description: 'Получить профиль по уникальному slug' })
  async findBySlug(@Args('slug') slug: string): Promise<Profile> {
    const profile = await this.profileService.findBySlug(slug);
    return profile as unknown as Profile; 
  }

  @Mutation(() => Profile, { name: 'createProfile', description: 'Создать новый профиль для человека' })
  async create(@Args('input') input: CreateProfileInput): Promise<Profile> {
    const profile = await this.profileService.create(input);
    return profile as unknown as Profile; 
  }

  @Mutation(() => Profile, { name: 'updateProfile', description: 'Обновить существующий профиль' })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProfileInput,
  ): Promise<Profile> {
    const profile = await this.profileService.update(id, input);
    return profile as unknown as Profile; 
  }

  @Mutation(() => Boolean, { name: 'deleteProfile', description: 'Удалить профиль по ID' })
  async remove(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.profileService.remove(id);
  }
}