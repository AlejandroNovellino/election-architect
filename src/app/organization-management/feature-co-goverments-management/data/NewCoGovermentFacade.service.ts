import { computed, inject, Injectable } from '@angular/core';
import { CoGoverment } from '@organization-management/data/interfaces/CoGoverment';
import { CoGovermentService } from '@organization-management/data/services/CoGoverment.service';
import { CoGovermentTypeService } from '@organization-management/data/services/CoGovermentType.service';
import { CoGovermentVotingTypeService } from '@organization-management/data/services/CoGovermentVotingType.service';
import { DependencyService } from '@organization-management/data/services/Dependency.service';
import { OfficeService } from '@organization-management/data/services/Office.service';
import { PopulationService } from '@organization-management/data/services/Population.service';

@Injectable({
  providedIn: 'root',
})
export class NewCoGovermentFacadeService {
  // services to provide the facade of
  private coGovermentService = inject(CoGovermentService); // just for creating the new coGoverment
  private coGovermentTypeService = inject(CoGovermentTypeService);
  private coGovermentVotingTypeService = inject(CoGovermentVotingTypeService);
  private dependencyService = inject(DependencyService);
  private officeService = inject(OfficeService);
  private populationService = inject(PopulationService);

  // signals to get the data
  public coGovermentTypes = computed(() =>
    this.coGovermentTypeService.coGovermentTypes()
  );

  public coGovermentVotingTypes = computed(() =>
    this.coGovermentVotingTypeService.coGovermentVotingTypes()
  );

  public dependencies = computed(() => this.dependencyService.dependencies());

  public offices = computed(() => this.officeService.offices());

  public populations = computed(() => this.populationService.population());

  public loading = computed(() => {
    return (
      this.coGovermentTypeService.loading() &&
      this.coGovermentVotingTypeService.loading() &&
      this.dependencyService.loading() &&
      this.officeService.loading() &&
      this.populationService.loading()
    );
  });

  constructor() {
    // get the data
    this.getData();
  }

  getData(): void {
    // get the data from the services
    this.coGovermentTypeService.getData();
    this.coGovermentVotingTypeService.getData();
    this.dependencyService.getData();
    this.officeService.getData();
    this.populationService.getData();
  }

  addNewCoGoverment(coGoverment: CoGoverment) {
    // add the new co-goverment
    this.coGovermentService.addNewCoGoverment(coGoverment);
  }
}
