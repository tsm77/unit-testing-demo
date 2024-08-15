import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  let baseAPI = environment.baseAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const spyHttp = spyOn(httpClient, 'get');
    service.getProducts();
    expect(spyHttp).toHaveBeenCalledWith(`${baseAPI}products`)
  });

  it('should test saveProducts', () => {
    const spyHttp = spyOn(httpClient, 'post');
    const productMock = {} as Product;
    service.saveProduct(productMock);
    expect(spyHttp).toHaveBeenCalledWith(`${baseAPI}products`, productMock)
  });

  it('should test updateProduct', () => {
    const spyHttp = spyOn(httpClient, 'put');
    const productMock = {} as Product;
    service.updateProduct(productMock);
    expect(spyHttp).toHaveBeenCalledWith(`${baseAPI}products/${productMock.id}`, productMock)
  });

  it('should test deleteProduct', () => {
    const spyHttp = spyOn(httpClient, 'delete');
    const idProduct  = 1;
    service.deleteProduct(idProduct);
    expect(spyHttp).toHaveBeenCalledWith(`${baseAPI}products/${idProduct}`)
  });
});
