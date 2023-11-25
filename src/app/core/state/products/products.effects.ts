import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import * as ProductsActions from './products.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from '@ngrx/store';
import { selectProductsState } from './products.state';

@Injectable()
export class ProductsEffects {
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.loadProducts),
            mergeMap((action) =>
                this.productsService.getProducts(action.page, action.pageSize).pipe(
                    map((products) => ProductsActions.loadProductsSuccess({ products })),
                    catchError((error) => {
                        console.error(error);
                        return EMPTY;
                    })
                )
            )
        )
    );

    addToCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.addToCart),
            withLatestFrom(this.store.pipe(select(selectProductsState))),
            map(([action, state]) => {
                const existingProduct = state.cart.find((p) => p.id === action.product.id);

                if (existingProduct) {
                    console.log('Product already in cart:', existingProduct);
                    return ProductsActions.getCartProducts();
                }

                const updatedCart = [...state.cart, action.product];
                return ProductsActions.getCartProductsSuccess({ cartProducts: updatedCart });
            }),
            catchError((error) => {
                console.error('Error adding to cart', error);
                return EMPTY;
            })
        )
    );

    getCartProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getCartProducts),
            withLatestFrom(this.store.pipe(select(selectProductsState))),
            map(([action, state]) => {
                return ProductsActions.getCartProductsSuccess({ cartProducts: state.cart });
            }),
            catchError((error) => {
                console.error('Error getting cart products', error);
                return EMPTY;
            })
        )
    );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private store: Store
    ) {
    }
}
