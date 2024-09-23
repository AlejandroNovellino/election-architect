import { computed, inject, Injectable } from '@angular/core';
import { DependencyService } from '@organization-management/data/services/Dependency.service';
import { DependencyTypeService } from '@organization-management/data/services/DependencyType.service';

@Injectable({
  providedIn: 'root',
})
export class DependencyFacadeService {
  // services to provide the facade of
  private dependencyService = inject(DependencyService);
  private dependencyTypeService = inject(DependencyTypeService);

  // signals to get the data
  public dependencies = computed(() => this.dependencyService.dependencies());

  public dependencyTypes = computed(() =>
    this.dependencyTypeService.dependenciesTypes()
  );

  public loading = computed(() => {
    return (
      this.dependencyService.loading() && this.dependencyTypeService.loading()
    );
  });

  constructor() {
    // get the data
    this.getData();
  }

  getData(): void {
    // get the data from the services
    this.dependencyService.getData();
    this.dependencyTypeService.getData();
  }

  addNewDependency(
    name: string,
    description: string,
    dependencyType: string,
    fatherDependency: string
  ) {
    // add the new co-goverment
    this.dependencyService.addNewDependency(
      name,
      description,
      dependencyType,
      fatherDependency
    );
  }
}
