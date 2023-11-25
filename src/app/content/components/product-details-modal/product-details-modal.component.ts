import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SnackbarService } from "../../../core/services/snackbar.service";
import * as ProductsActions from '../../../core/state/products/products.actions';
import { selectProductById } from "../../../core/state/products/products.state";

@Component({
    selector: 'app-product-details-modal',
    templateUrl: './product-details-modal.component.html',
    styleUrls: ['./product-details-modal.component.scss']
})
export class ProductDetailsModalComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<ProductDetailsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { productId: string },
        private store: Store,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    close(): void {
        this.dialogRef.close();
    }

    get selectedProduct$() {
        return this.store.select(selectProductById(this.data.productId));
    }

    addToCart() {
        this.dialogRef.close();
        this.selectedProduct$.pipe(
            take(1),
            takeUntil(this.unsubscribe$)
        ).subscribe((product) => {
            this.store.dispatch(ProductsActions.addToCart({ product }));
            this.snackbarService.showSnackbar(`${product.name} was successfully added to the cart`);
        });
    }
}
