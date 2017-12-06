import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NovoModalParams,
  NovoModalRef,
  StaticActivityTableService,
  NovoToastService,
  SimpleTablePaginationOptions,
  SimpleTableColumn,
  ActivityTableRenderers } from 'novo-elements';

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.scss']
})
export class TestHistoryComponent implements OnInit {
  public columns: SimpleTableColumn<any>[] = [
    {
      id: 'date',
      label: 'Date',
      renderer: ActivityTableRenderers.dateRenderer<any>('date'),
      config: {
        sortable: true,
        filterable: true,
      },
    },
    {
      id: 'result',
      label: 'Result',
      renderer: ActivityTableRenderers.propertyRenderer<any>('result'),
      config: {
        sortable: true,
        filterable: true,
      },
    },
  ];
  public title: string;
  public activityService: StaticActivityTableService<any>;
  public displayedColumns: string[] = ['date', 'result'];
  public hasAction: boolean = false;
  public actionLabel: string;

  constructor(public params: NovoModalParams,
    private modalRef: NovoModalRef,
    public ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.setupTable();
  }

  public close(): void {
    this.modalRef.close();
  }

  private setupTable(): void {
    this.title = this.params['title'];
    this.activityService = new StaticActivityTableService<any>(this.params['data']);
    this.ref.markForCheck();
  }

}
