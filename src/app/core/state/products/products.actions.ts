import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/models'


export const loadProducts = createAction('[Products] Load Products', props<{ page: number; pageSize: number }>());


export const loadProductsSuccess = createAction(
    '[Products] Load Products Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{ error: any }>()
);


export const addToCart = createAction(
    '[Products] Add To Cart',
    props<{ product: Product }>()
);

export const getCartProducts = createAction(
    '[Products] Get Cart Products'
);

export const getCartProductsSuccess = createAction(
    '[Products] Get Cart Products Success',
    props<{ cartProducts: Product[] }>()
);

