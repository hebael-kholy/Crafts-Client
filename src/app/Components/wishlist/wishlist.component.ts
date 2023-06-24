import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  items: any[] = [];
  itemId: any;
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user).user.id;
  wishListId:any;
  wishlistitems: any;
  constructor(
    public route: ActivatedRoute,
    public myService: WishlistService
  ) {}
  ngOnInit(): void {
    console.log(this.userId);
    this.myService.getUserWishList(this.userId).subscribe((res: any) => {
      console.log(res);
      this.items = res.products;
      this.wishListId=res.id;
      console.log(this.wishListId)
      console.log(this.items);
    });
  }

  removeItem(item: any) {
    console.log(item.id);
    this.itemId = item.id;
    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    console.log(`this id for wishlistId ${this.wishListId}`);
    this.myService
      .removeitemfromWishlist(this.itemId, this.wishListId)
      .subscribe((res) => {
        this.items.splice(this.items.indexOf(item), 1);
        console.log(res);
        this.wishlistitems = Number(localStorage.getItem('wishlistitems'));
        this.wishlistitems -= 1;
        localStorage.setItem('wishlistitems', this.wishlistitems);
      });
  }
}
