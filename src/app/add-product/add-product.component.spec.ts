import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);

  const mockProduct = {
    title: 'Indra',
    price: '250',
    description: 'Indra Company',
    category: 'Tecnologia'
  } as Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: ProductsService, useValue: mockProductService },
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: mockDialogRef}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {

    component.data = mockProduct;
    component.ngOnInit();

    expect(component.productForm instanceof FormGroup).toBe(true);
    expect(component.productForm.controls['title'].value).toBe('Indra');
    expect(component.productForm.controls['price'].value).toBe('250');
    expect(component.productForm.controls['description'].value).toBe('Indra Company');
    expect(component.productForm.controls['category'].value).toBe('Tecnologia');
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      component.productForm.setValue(mockProduct);
      component.data = {} as Product;

      mockProductService.saveProduct.and.returnValue(of([mockProduct]));
      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(mockProduct);
      expect(matSnackBar.open).toHaveBeenCalledWith('Added Successfully!...', '', { duration: 3000});
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while add a new product', () => {
      component.productForm.setValue(mockProduct);
      component.data = {} as Product;

      mockProductService.saveProduct.and.returnValue(throwError(() => new Error('error')));
      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(mockProduct);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', { duration: 3000});
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      const product = {
        id: '1',
        title: 'Indra',
        price: '250',
        description: 'Indra Company',
        category: 'Tecnologia'
      } as Product;

      component.productForm.setValue(mockProduct);
      component.data = {
        id: '1',
        title: 'Indra',
        price: '250',
        description: 'Indra Company',
        category: 'Tecnologia'} as Product;

      mockProductService.updateProduct.and.returnValue(of(product));
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(product);
      expect(matSnackBar.open).toHaveBeenCalledWith('Updated Successfully!...', '', { duration: 3000});
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should call the saveProduct while editing the product', () => {
      const product = {
        id: '1',
        title: 'Indra',
        price: '250',
        description: 'Indra Minsait',
        category: 'Tecnologia',
      } as Product;
      component.data = {
        id: '1'
      } as Product;

      component.productForm.setValue({
        title: 'Indra',
        price: '250',
        description: 'Indra Minsait',
        category: 'Tecnologia',
      });

      mockProductService.updateProduct.and.returnValue(of(product));
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(product);
      expect(matSnackBar.open).toHaveBeenCalledWith('Updated Successfully!...', '', { duration: 3000});
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Indra',
        description: 'Minsait teste',
        price: '20.00',
        category: 'Tecnologia'
      };

      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue((throwError(() => error)));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });
});
