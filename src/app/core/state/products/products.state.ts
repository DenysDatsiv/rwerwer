import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Product } from "../../models/models";

export interface ProductsState extends EntityState<Product> {
    loading: boolean;
    error: any;
    currentPage: number,

    cart: Product[];
}

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductsState = productsAdapter.getInitialState({
    loading: false,
    error: null,
    cart: [],
    currentPage: 1,

});

export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductEntities,
} = productsAdapter.getSelectors();

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAll = createSelector(
    selectProductsState,
    selectAllProducts
);

export const selectProductsLoading = createSelector(
    selectProductsState,
    (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
    selectProductsState,
    (state: ProductsState) => state.error
);

export const selectProductById = (productId: string) => createSelector(
    selectProductsState,
    (state) => selectProductEntities(state)[productId]
);

export const selectCartProducts = createSelector(
    selectProductsState,
    (state: ProductsState) => state.cart
);
