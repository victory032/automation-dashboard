// NG2
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TestService } from '../../services/test/test.service';
import { NovoModalService } from 'novo-elements';
import { TestHistoryComponent } from './test-history/test-history.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() filter: any;
  tests: any;
  isLoading: Boolean = true;

  constructor(private testService: TestService, private modalService: NovoModalService) { }

  ngOnInit() {
    this.testService.query(this.filter, true, 'name', 100, {name: 1}, {pastResults: 0}).subscribe(res => {
      this.tests = res.data;
      this.isLoading = false;
    });
  }

  ngOnChanges() {
    this.isLoading = true;
    this.testService.query(this.filter, true, 'name', 100, {name: 1}, {pastResults: 0}).subscribe(res => {
      this.tests = res.data;
      this.isLoading = false;
    });
  }

  delete(test) {
    this.testService.delete(test._id).subscribe(res => {
      this.ngOnChanges();
    });
  }

  markAsBug(test) {
    this.testService.update(test._id, {result: 'Bug'}).subscribe(res => {
      this.ngOnChanges();
    });
  }

  markAsFailed(test) {
    this.testService.update(test._id, {result: 'Failed'}).subscribe(res => {
      this.ngOnChanges();
    });
  }

  public viewHistory(test): void {
    this.testService.getTestData(test._id).subscribe((res) => {
      const data = {
        title: res.data[0].name,
        data: res.data[0].pastResults
      }
      this.modalService.open(TestHistoryComponent, data);
    });
  }

  getIconForResult(test) {
    switch (test.result) {
        case 'Passed':
        case 'passed':
            return 'check';
        case 'Failed':
        case 'failed':
            return 'times';
        case 'Skipped':
            return 'republish';
        case 'Bug':
            return 'overview';
        case 'Pending':
            return 'flag';
        default:
            return 'question-o';
    }
  }
}
