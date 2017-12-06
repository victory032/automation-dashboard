import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormUtils, SelectControl, NovoModalService, TextBoxControl } from 'novo-elements';

import { TestService } from '../../services/test/test.service';
import { TeamService } from '../../services/team/team.service';
import { ResultService } from '../../services/result/result.service';
import { ProjectService } from '../../services/project/project.service';

import { PreferencesComponent } from '../preferences/preferences.component';
import { TeamPageComponent } from '../team-page/team-page.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() defaults: any;
  @Output() filter: EventEmitter<any> = new EventEmitter();
  controls = [];
  sidebarForm: any;
  preferences: any;
  refreshValue: any;
  sidebarTotals: any;
  showTotals = false;
  toggleTitle: string = 'View Totals';

  constructor(private testService: TestService, private teamService: TeamService, private resultService: ResultService,
              private projectService: ProjectService, private formUtils: FormUtils, private modalService: NovoModalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('initSidebar');
    this.initOptions().then(res => {
      this.controls = this.initControls(res.teamOptions, res.resultOptions, res.projectOptions);
      this.sidebarForm = this.formUtils.toFormGroup(this.controls);
      this.sidebarForm.valueChanges.debounceTime(500).subscribe(value => {
        this.refreshValue = value;
        this.filter.emit(this.refreshValue);
        this.testService.sidebarTotals(value).subscribe(res => {
          this.sidebarTotals = res;
        });
      });

      this.route.queryParams.subscribe(params => {
        let newParams: any = params;
        this.preferences = localStorage.getItem('AutomationPreferences');
        if (this.preferences) {
          this.preferences = JSON.parse(this.preferences);
          newParams = Object.assign(this.preferences, newParams);
          this.sidebarForm.controls.teamFilter.setValue(newParams.team);
          this.sidebarForm.controls.resultFilter.setValue(newParams.result);
          this.sidebarForm.controls.projectFilter.setValue(newParams.project);
        }
      });
    });
  }

  private initControls(teamOptions, resultOptions, projectOptions): Array<any> {
    const returnControls = [];
    returnControls.push(new TextBoxControl({
      key: 'testFilter',
      value: '',
      type: 'text',
      placeholder: 'Search Tests...'
    }));
    returnControls.push(new TextBoxControl({
      key: 'suiteFilter',
      value: '',
      type: 'text',
      placeholder: 'Search Suites...'
    }));
    returnControls.push(new SelectControl({
      key: 'resultFilter',
      options: resultOptions,
      value: (this.defaults && this.defaults.resultView) ? this.defaults.resultView : '',
      placeholder: 'Result Filter'
    }));
    returnControls.push(new SelectControl({
      key: 'teamFilter',
      options: teamOptions,
      placeholder: 'Team Filter',
      value: (this.defaults && this.defaults.team) ? this.defaults.team : '',
    }));
    returnControls.push(new SelectControl({
      key: 'projectFilter',
      options: projectOptions,
      placeholder: 'Project Filter',
      value: (this.defaults && this.defaults.project) ? this.defaults.project : '',
    }));
    return returnControls;
  }

  private initOptions(): any {
    const promises = [this.projectService.getOptions(), this.teamService.getOptions(), this.resultService.getOptions()];
    return Promise.all(promises).then(options => {
      return {
        projectOptions: options[0].data,
        teamOptions: options[1].data,
        resultOptions: options[2].data
      };
    });
  }

  openPreferences() {
    this.modalService.open(PreferencesComponent);
  }

  openTeams() {
    this.modalService.open(TeamPageComponent);
  }

  refreshList() {
    this.filter.emit(this.refreshValue);
  }

  handleSidebarTotals() {
    this.sidebarForm.valueChanges.next(this.sidebarForm.value);
    this.showTotals = !this.showTotals;
    if (this.showTotals === true) {
      this.toggleTitle = 'View Menu';
    } else {
      this.toggleTitle = 'View Totals';
    }
  }
}
