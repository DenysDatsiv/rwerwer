import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { initialState, productsAdapter } from './products.state';

export const productsReducer = createReducer(
    initialState,
on(ProductsActions.loadProducts, (state, { page, pageSize }) => ({
        ...state,
        loading: true,
        error: null,
        page,
        pageSize,
    })),
    on(ProductsActions.loadProductsSuccess, (state, { products }) => {
        return productsAdapter.setAll(products, {
            ...state,
            loading: false,
            error: null,
        });
    }),
    on(ProductsActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(ProductsActions.addToCart, (state, { product }) => {
        const updatedCart = [...state.cart, product];
        return { ...state, cart: updatedCart };
    }),
    on(ProductsActions.getCartProductsSuccess, (state, { cartProducts }) => {
        return { ...state, cart: cartProducts };
    })
    , on(ProductsActions.loadProductsSuccess, (state, { products }) => {
        return productsAdapter.setAll(products, {
            ...state,
            loading: false,
            error: null,
        });
    }),
);
