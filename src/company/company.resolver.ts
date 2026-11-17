import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Company } from './models/company.model';
import { CreateCompanyInput, UpdateCompanyInput } from './dto/company.dto';
import { CompanyService } from './company.service';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  // Получить список всех компаний
  @Query(() => [Company], { name: 'companies' })
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Query(() => [Company], { name: 'searchCompanies' })
  async searchCompanies(
    @Args('searchTerm', { type: () => String }) searchTerm: string,
  ) {
    return this.companyService.searchCompanies(searchTerm);
  }

  // Создать компанию
  @Mutation(() => Company, { name: 'createCompany' })
  async createCompany(
    @Args('input') input: CreateCompanyInput,
  ): Promise<Company> {
    return this.companyService.create(input);
  }

  // Обновить компанию
  @Mutation(() => Company, { name: 'updateCompany' })
  async updateCompany(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateCompanyInput,
  ): Promise<Company> {
    return this.companyService.update(id, input);
  }

  // Удалить компанию
  @Mutation(() => Boolean, { name: 'deleteCompany' })
  async deleteCompany(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.companyService.remove(id);
  }
}