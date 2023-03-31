import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiCallService } from '../services/api-call/api-call.service';
import { addOrder, loadProducts, loadProductsSuccess } from './actions';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.apiCallService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrder),
      exhaustMap((action) =>
        this.apiCallService.postOrder(action.order).pipe(
          // Here, you could dispatch another action to update the products list if necessary
          tap(() => this.store.dispatch(loadProducts())),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiCallService: ApiCallService,
    private store: Store
  ) {}
}
