// products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../models/models';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private productsUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) {}

    getProducts(page: number, pageSize: number): Observable<Product[]> {
        const url = `${this.productsUrl}?_page=${page}&_limit=${pageSize}`;
        return this.http.get<Product[]>(url).pipe(
            map((data) => data),
            catchError(this.handleError)
        );
    }
    getAllProducts(): Observable<Product[]> {
        const url = `${this.productsUrl}`;
        return this.http.get<Product[]>(url);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
