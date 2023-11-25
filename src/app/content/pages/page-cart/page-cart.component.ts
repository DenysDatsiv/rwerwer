import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { Product } from "../../../core/models/models";
import { selectCartProducts } from "../../../core/state/products/products.state";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: 'app-page-cart',
    templateUrl: './page-cart.component.html',
    styleUrls: ['./page-cart.component.scss']
})
export class PageCartComponent implements OnInit,OnDestroy {
    cartProducts$: Observable<Product[]>;
    cartTotal: number;
    totalCartItem:number;

    private unsubscribe$ = new Subject<void>();

    constructor(private store: Store
    ,private router:Router) { }

    ngOnInit() {
        this.cartProducts$ = this.store.select(selectCartProducts);

        this.cartProducts$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(products => {
                this.totalCartItem = products.length;

                this.cartTotal = products.reduce((sum, product) => sum + product.price, 0);
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    navigateToMain() {
        this.router.navigate(['main']);
    }
}
