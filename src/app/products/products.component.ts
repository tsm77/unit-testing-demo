import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData!: Product[];
  showSpinner = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
  * - Função que busca uma lista de produtos.
  * - Se a buscar for bem sucedida, ela salva os produtos em uma variavel e esconder o spinner.
  * - Caso ocorra algum erro, ela esconde o spinner e mostra uma mensagem de erro em um snackbar.
  * @author Tiago S Martins
  */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      }
    });
  }

 /**
  * - Função abre um dialog para adicionar um novo produto.
  * - É configurado para ter 40% de largura.
  * @author Tiago S Martins
  */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

 /**
  * - Abre um dialog para editar um produto existente.
  * - É passado um produto selecionado como dados, permitindo que seja editado.
  * - É configurado para ter 40% de largura.
  * @author Tiago S Martins
  */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

 /**
  * - Excluir um produto, recebendo o seu id.
  * - Em caso de sucesso ou falha mostra uma mensagem em um snackbar com duração de 3 segundos.
  * @author Tiago S Martins
  */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      },
    });
  }
}
