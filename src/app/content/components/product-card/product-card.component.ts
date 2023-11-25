import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ProductDetailsModalComponent } from "../product-details-modal/product-details-modal.component";
import { selectProductById } from "../../../core/state/products/products.state";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  constructor(private dialog: MatDialog,private store: Store) {}

  ngOnInit() {
    // Assuming product has a property 'id', adjust it accordingly
  }

  openDialog(): void {
    const productId = this.product.id;

    this.dialog.open(ProductDetailsModalComponent, {
      width: '90vw',
      height: '90vh',
      data: { productId: productId }
    });
  }

}
