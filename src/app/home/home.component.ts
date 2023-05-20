import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { Product, Category } from '../core/models/products';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  productName: string = '';
  categoryId: string = '0';
  productDelId: string='';

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.productsService.getProducts().subscribe();
    this.productsService.productsObs.subscribe({
      next: (result) => {
        this.products = result;
      },
    });

    this.categoriesService.getCategories().subscribe();
    this.categoriesService.cateObs.subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }

  filterChanged() {
    if (this.productName || this.categoryId) {
      // this.productName = this.productName.toUpperCase();
      this.productsService
        .getProductsFilter(this.productName, this.categoryId)
        .subscribe({
          next: (result) => {
            this.products = result;
          },
        });
    } else {
      this.productsService.getProducts().subscribe();
      this.productsService.productsObs.subscribe({
        next: (result) => {
          this.products = result;
        },
      });
    }
  }
  onClear() {
    this.productName = '';
    this.categoryId = '0';
    this.filterChanged();
  }
  openModalDel(id:string){
    this.productDelId=id;
  } 
  deleteProduct() {
    this.productsService.deleteProduct(this.productDelId).subscribe({
      next: (result) => {
        this.productDelId='';
        this.onClear();
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
