import { Component, OnInit, ViewChild } from '@angular/core';
import { Category, Product } from '../core/models/products';
import { CategoriesService } from '../core/services/categories.service';
import { ProductsService } from '../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import  {FormGroup, FormControl, Validators} from "@angular/forms";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  //addProductForm: FormGroup;
  product: Product = {
    id: '',
    name: '',
    description: '',
    color: '',
    pictureUrl: '',
    price: 0,
    createdDate: '',
    categoryId: '',
    categoryName: '',
  };
  categories: Category[] = [];
  message: string = '';
  typeNote: string = '';
  @ViewChild('addProductForm', { static: true }) addProductForm: NgForm = {} as NgForm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {
  //   this.addProductForm = new FormGroup({
  //     name: new FormControl('',[
  //         Validators.required,
  //     ]),
  //     categoryId: new FormControl('',[
  //         Validators.required,
  //     ]),
  //     color: new FormControl('',[
  //         Validators.required,
  //     ]),
  //     price: new FormControl('',[
  //         Validators.required,
  //     ]),
  // })
  }
  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.productsService.getProductDetail(id).subscribe({
        next: (result) => {
          this.product = result;
        },
      });
    }

    this.categoriesService.getCategories().subscribe();
    this.categoriesService.cateObs.subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }
  handleSubmit() {
  //   if(this.addProductForm.invalid){
  //     console.log(this.addProductForm)
  //     return;
  // }
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.productsService.updateProduct(id, this.product).subscribe({
        next: (result) => {
          console.log(result);
          this.addProductForm.form.markAsPristine();
          this.message = 'Update product success';
          this.typeNote = 'success';
        },
        error: (err) => {
          this.message = err.error.message;
          this.typeNote = 'error';
        },
      });
    } else {
      console.log(this.product)
      this.productsService.createProduct(this.product).subscribe({
        next: (result) => {
          console.log('first')
          this.message = 'Create product success';
          this.typeNote = 'success';
        },
        error: (err) => {
          this.message = err.error.message;
          this.typeNote = 'error';
        },
      });
    }
  }
  onCloseAlter() {
    this.message = '';
    this.typeNote = '';
  }
}
