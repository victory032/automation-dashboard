import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ListComponent } from './components/list/list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { SummarySidebarComponent } from './components/summary-sidebar/summary-sidebar.component';
import { TestHistoryComponent } from './components/list/test-history/test-history.component';

// Services
import { TestService } from './services/test/test.service';
import { TeamService } from './services/team/team.service';
import { ProjectService } from './services/project/project.service';
import { ResultService } from './services/result/result.service';

import {
    NovoModalModule, NovoModalRef, FormUtils, NovoFormModule, NovoLabelService,
    NovoToastService, ComponentUtils, NovoModalService, NovoHeaderModule, NovoButtonModule,
    NovoSelectModule, NovoFormExtrasModule, NovoElementsModule, NovoTableModule, NovoTableExtrasModule,
    NovoLoadingModule, NovoElementProviders } from 'novo-elements';

import { TeamPageComponent } from './components/team-page/team-page.component';
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { TotalsComponent } from './components/totals/totals.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SummaryComponent,
    ListComponent,
    MainPageComponent,
    PreferencesComponent,
    SummarySidebarComponent,
    TeamPageComponent,
    SummaryTableComponent,
    TotalsComponent,
    TestHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NovoModalModule,
    NovoFormModule,
    NovoHeaderModule,
    NovoButtonModule,
    NovoSelectModule,
    NovoFormExtrasModule,
    NovoElementsModule,
    NovoLoadingModule,
    NovoTableModule,
    NovoTableExtrasModule,
    NovoElementProviders.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'teams',
        component: TeamPageComponent
      }
    ])
  ],
  entryComponents: [PreferencesComponent, TestHistoryComponent],
  providers: [
    TestService,
    TeamService,
    ProjectService,
    ResultService,
    NovoModalRef,
    FormUtils,
    NovoLabelService,
    NovoToastService,
    ComponentUtils,
    NovoModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
