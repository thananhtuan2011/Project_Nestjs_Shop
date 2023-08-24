import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { ITableState } from 'src/app/_metronic/shared/crud-table';
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilsService {
  constructor(private auth: AuthService) { }
  getFindHTTPParams(queryParams): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('page', (queryParams.pageNumber + 1).toString())
      .set('record', queryParams.pageSize.toString());
    let keys = [],
      values = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|')).append('filter.vals', values.join('|'));
    }
    return params;
  }
  getFindHTTPParamsJeeMeeting(queryParams): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('pageNumber', (queryParams.pageNumber + 1).toString())
      .set('pageSize', queryParams.pageSize.toString());
    let keys = [], values = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|'))
        .append('filter.vals', values.join('|'));
    }
    return params;
  }
  parseFilter(data) {
    var filter = {
      keys: '',
      vals: '',
    };
    let keys = [],
      values = [];
    Object.keys(data).forEach(function (key) {
      if (typeof data[key] !== 'string' || data[key] !== '') {
        keys.push(key);
        values.push(data[key]);
      }
    });
    if (keys.length > 0) {
      filter.keys = keys.join('|');
      filter.vals = values.join('|');
    }
    return filter;
  }

  getHTTPHeaders(): HttpHeaders {
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'TimeZone': (new Date()).getTimezoneOffset().toString()
    });
    return result;
  }

  //====================Sử dụng cho quy trình=========================
  getHTTPHeaders_New(): HttpHeaders {

    let offset = new Date().getTimezoneOffset() / (-60);
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'TimeZone': '' + offset
    });
    return result;
  }

  //========================Sử dụng cho gọi form JeeWork (Thiên)
  getFindHTTPParamsWW(queryParams): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('page', (queryParams.pageNumber + 1).toString())
      .set('record', queryParams.pageSize.toString());
    let keys = [], values = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|'))
        .append('filter.vals', values.join('|'));
    }
    return params;
  }

  getHTTPHeadersWW(): HttpHeaders {
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'TimeZone': (new Date()).getTimezoneOffset().toString()
    });
    return result;
  }
  getFindHTTPParamsV2(queryParams): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('pageNumber', (queryParams.pageNumber + 1).toString())
      .set('pageSize', queryParams.pageSize.toString());
    let keys = [], values = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|'))
        .append('filter.vals', values.join('|'));
    }
    return params;
  }

  getFindHTTPParamsITableState(tableState: ITableState, more: boolean = false): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', tableState.sorting.direction)
      .set('sortField', tableState.sorting.column)
      .set('page', tableState.paginator.page.toString())
      .set('record', tableState.paginator.pageSize.toString());
    let keys = [],
      values = [];
    if (more) {
      params = params.append('more', 'true');
    }
    Object.keys(tableState.filter).forEach(function (key) {
      if (typeof tableState.filter[key] !== 'string' || tableState.filter[key] !== '') {
        keys.push(key);
        values.push(tableState.filter[key]);
      }
    });
    if (tableState.searchTerm) {
      keys.push('keyword');
      values.push(tableState.searchTerm);
    }
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|')).append('filter.vals', values.join('|'));
    }
    return params;
  }

  getFindHTTPParamsJeeRequest(queryParams): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('pageNumber', (queryParams.pageNumber + 1).toString())
      .set('pageSize', queryParams.pageSize.toString());
    let keys = [], values = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|'))
        .append('filter.vals', values.join('|'));
    }
    return params;
  }

  getFindHTTPParamsJeeWF(queryParams): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('pageNumber', (queryParams.pageNumber + 1).toString())
      .set('pageSize', queryParams.pageSize.toString());
    let keys = [], values = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|'))
        .append('filter.vals', values.join('|'));
    }
    return params;
  }
  //==============================================================
  getHTTPHeadersVersion(version: any): HttpHeaders {
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'TimeZone': (new Date()).getTimezoneOffset().toString(),
      'x-api-version': `${version}`,
    });
    return result;
  }
}
