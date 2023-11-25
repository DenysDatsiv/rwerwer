// page-main.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { selectAll, selectProductsError, selectProductsLoading } from '../../../core/state/products/products.state';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../../core/state/products/products.actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class PageMainComponent implements OnInit {
  pageSize = 10; // Set the page size to 10
  currentPage = 1; // Initialize the current page

  products$ = this.store.select(selectAll);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.store.dispatch(loadProducts({ page: this.currentPage, pageSize: this.pageSize }));
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.loadProducts();
  }
}
