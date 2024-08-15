// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { of, throwError } from 'rxjs';
// import { Product } from '../models/product.model';
// import { ProductsService } from '../services/products.service';
// import { SharedModule } from '../shared/shared.module';
// import { AddProductComponent } from './add-product.component';

// describe('AddProductComponent', () => {
//   let component: AddProductComponent;
//   let fixture: ComponentFixture<AddProductComponent>;
//   let dialogRef: MatDialogRef<AddProductComponent>;
//   let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
//   let mockProductService = jasmine.createSpyObj('ProductsService', [
//     'updateProduct',
//     'saveProduct',
//   ]);

//   beforeEach(async () => {

//   });

//   it('should create', () => {

//   });

//   it('should init the form', () => {

//   });

//   describe('should test add product functionality', () => {
//     it('should call the saveProduct to add new product', () => {

//     });

//     it('should test the saveProduct for failure while add a new product', () => {});
//   });

//   describe('should test edit product functionality', () => {
//     it('should set the form controls to the correct values when data is provided', () => {});

//     it('should call the saveProduct while editing the product', () => {

//     });

//     it('should test the saveProduct for failure while update a product', () => {
//       const data: Product = {
//         id: '1',
//         title: 'Test Product',
//         description: 'Test description',
//         price: '19.99',
//         category: 'Test category'
//       };
//       const error = new Error('Error while update a product');
//       component.data = data;

//       mockProductService.updateProduct.and.returnValue((throwError(() => error)));
//       component.productForm.patchValue(data);
//       component.saveProduct();
//       expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
//       expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
//         duration: 3000
//       });
//     });
//   });
// });
