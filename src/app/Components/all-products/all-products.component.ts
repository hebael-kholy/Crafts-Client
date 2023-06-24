import { Component, EventEmitter, OnInit } from '@angular/core';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/Services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  page: number = 1;
  totalRecords: number = 0;
  icon = faStar;
  iconCart = faCartShopping;
  products: any[] = [];
  categoryId:any;
  searchKey:string ='';
  filterCategory:any;
  showButton: boolean = false;
  isLoading = false;
  isLoadingg = false;

  constructor(public myService: ProductsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.myService.getAllProducts().subscribe((data: any) => {
      this.isLoading = false;
      this.products = data;
      this.filterCategory = data;
      console.log(this.filterCategory)
      this.totalRecords = data.length;
    })
  }

  filter(category:any){
    console.log(category);
    console.log(typeof category);
    if(category==''){
      this.getProducts();
    }
    this.myService.getProductsbyCategory(category).subscribe({
      next:(res)=>{
        console.log(res);
        this.filterCategory=res;
        console.log(this.filterCategory);
        this.filterCategory = this.products.filter((a:any)=>{
          console.log(a);             //product
          console.log(a.categoryName);//categoryName
          if(a.categoryName === category || category == ''){
            return a;
          }
        })
        console.log(this.filterCategory.products);
      },error:(err)=>{
        console.log(err);
      }})
  }

  onclick(){
    console.log("hala");
    this.isLoadingg= true;
  }

  clickk(){
    console.log("hala");
    setInterval(()=>{
    },1000)
    this.isLoadingg= false;
  }
}
