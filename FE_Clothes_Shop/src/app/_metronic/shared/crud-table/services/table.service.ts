// tslint:disable:variable-name
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { PaginatorState } from '../models/paginator.model';
import { ITableState, TableResponseModel } from '../models/table.model';
import { BaseModel } from '../models/base.model';
import { SortState } from '../models/sort.model';
import { GroupingState } from '../models/grouping.model';
import { environment } from '../../../../../environments/environment';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

export abstract class TableService<T> {
  // Private fields
  public _items$ = new BehaviorSubject<T[]>([]);
  public _itemsteam$ = new BehaviorSubject<T[]>([]);
  public _itemschay$ = new BehaviorSubject<T[]>([]);
  public _itemsteamtype$ = new BehaviorSubject<T[]>([]);

  public _itemsuser$ = new BehaviorSubject<T[]>([]);
  public _itemsteamDonHang$ = new BehaviorSubject<T[]>([]);
  public _itemsteamAcount$ = new BehaviorSubject<T[]>([]);
  public _itemsteamCate$ = new BehaviorSubject<T[]>([]);
  public _itemsteamHetHang$ = new BehaviorSubject<T[]>([]);
  public _itemsteamHangTon$ = new BehaviorSubject<T[]>([]);
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<ITableState>(DEFAULT_STATE);
  private _errorMessage = new BehaviorSubject<string>('');
  private _subscriptions: Subscription[] = [];
  public __responseData$ = new BehaviorSubject<any>(DEFAULT_STATE);
  // Getters
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }
  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  protected http: HttpClient;
  // API URL has to be overrided
  API_URL = `${environment.apiUrl}/endpoint`;
  API_URLProduct = `${environment.apiUrl}/product`;
  constructor(http: HttpClient) {
    this.http = http;
  }
  public patchStateAllProduect(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllProduct(apiRoute, "");
  }
  public patchStateUser(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_User(apiRoute, "");
  }
  public patchStateBanChayNhat(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_ChayNhat(apiRoute, "");
  }
  public patchStateHetHang(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_HetHang(apiRoute, "");
  }
  public patchStateHangTon(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_HangTon(apiRoute, "");
  }
  public patchStateAllProduectType(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllProductType(apiRoute, "");
  }
  public patchStateAllDonHang(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllDonHang(apiRoute, "");
  }
  public patchStateAllAcount(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllAcount(apiRoute, "");
  }
  public patchStateCategory(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllCategory(apiRoute, "");
  }
  // CREATE
  // server should return the object with ID
  create(item: BaseModel): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.post<BaseModel>(this.API_URL, item).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // READ (Returning filtered list of entities)
  find(tableState: ITableState): Observable<TableResponseModel<T>> {
    const url = this.API_URL + '/find';
    this._errorMessage.next('');
    return this.http.post<TableResponseModel<T>>(url, tableState).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ items: [], total: 0 });
      })
    );
  }
  getHttpHeaders() {


    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  getItemById(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.get<BaseModel>(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  find_HangTon(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_HetHang(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }

  find_User(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllChayNhat(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllProduct(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllDonHang(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllAcount(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllCategory(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllProductType(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  public fetch_AllCategory(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllCategory(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("cate", resItems)
          this._itemsteamCate$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllAcount(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllAcount(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("Acccc", resItems)
          this._itemsteamAcount$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllDonHang(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllDonHang(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("RẺEE", resItems)
          this._itemsteamDonHang$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllProductType(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllProductType(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("RẺEE", resItems)
          this._itemsteamtype$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_HangTon(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_HangTon(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          this._itemsteamHangTon$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_HetHang(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_HetHang(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          this._itemsteamHetHang$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public fetch_User(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_User(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("Chay nhat", resItems)
          this._itemsuser$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_ChayNhat(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllChayNhat(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("Chay nhat", resItems)
          this._itemschay$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllProduct(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllProduct(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res && res.status == 1) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("RẺEE ALL san phẩm", resItems)
          this._itemsteam$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsteam$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  // UPDATE
  update(item: BaseModel): Observable<any> {
    const url = `${this.API_URL}/${item.id}`;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.put(url, item).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE ITEM', item, err);
        return of(item);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE Status
  updateStatusForItems(ids: number[], status: number): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const body = { ids, status };
    const url = this.API_URL + '/updateStatus';
    return this.http.put(url, body).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE STATUS FOR SELECTED ITEMS', ids, status, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // DELETE
  delete(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // delete list of items
  deleteItems(ids: number[] = []): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = this.API_URL + '/deleteItems';
    const body = { ids };
    return this.http.put(url, body).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE SELECTED ITEMS', ids, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find(this._tableState$.value)
      .pipe(
        tap((res: TableResponseModel<T>) => {
          this._items$.next(res.items);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              res.total
            ),
          });
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            items: [],
            total: 0
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item.id;
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ grouping: new GroupingState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(DEFAULT_STATE);
    this._errorMessage.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }
}
