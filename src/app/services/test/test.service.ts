import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../../config/config';

@Injectable()
export class TestService {

  constructor(private http: Http) { }

  query(where: Object, distinct?: boolean, key?: String, limit?: Number, sort?: Object, fields?: Object) {
    let url = `${config.backendURL}test/query?where=${JSON.stringify(this.queryBuilder(where))}`;
    url = key ? `${url}&key=${key}` : url;
    url = limit ? `${url}&limit=${limit}` : url;
    url = sort ? `${url}&sort=${JSON.stringify(sort)}` : url;
    url = fields ? `${url}&fields=${JSON.stringify(fields)}` : url;
    return this.http.get(url).map(res => res.json());
  }

  public getTestData(testId: Number) {
    const url = `${config.backendURL}test/query?where=${JSON.stringify({'_id': testId})}&key=name&limit=100&sort={%22name%22:1}&fields={}`;
    return this.http.get(url).map(res => res.json());
  }

  create(body: Object) {
    const url = `${config.backendURL}test/create`;
    return this.http.post(url, body).map(res => res.json());
  }

  massCreate(body: Object) {
    const url = `${config.backendURL}test/massCreate`;
    return this.http.post(url, body).map(res => res.json());
  }

  update(id: String, body: Object) {
    const url = `${config.backendURL}test/update/${id}`;
    return this.http.put(url, body).map(res => res.json());
  }

  delete(id: String) {
    const url = `${config.backendURL}test/delete/${id}`;
    return this.http.delete(url).map(res => res.json());
  }

  testListQuery() {
    const url = `${config.backendURL}test/query?where={}`;
    return this.http.get(url).map(res => res.json());
  }

  resultTotals(team: String) {
    let url = `${config.backendURL}test/totals`;
    if (team) {
      url += `?team=${JSON.stringify(team)}`;
    }
    return this.http.get(url).map(res => res.json());
  }

  sidebarTotals(where: Object) {
    const url = `${config.backendURL}test/totals?where=${JSON.stringify(this.queryBuilder(where))}`;
    return this.http.get(url).map(res => res.json());
  }

  private queryBuilder(filter): Object {
    const query = {
      team: filter.teamFilter,
      result: filter.resultFilter,
      suite: filter.suiteFilter,
      name: filter.testFilter,
      project: filter.projectFilter
    };
    return query;
  }
}
