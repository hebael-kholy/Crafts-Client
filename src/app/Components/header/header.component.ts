import {
  Component,
  OnChanges,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/auth/auth.service';
import { CartService } from 'src/app/Services/cart/cart.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  icon = faShoppingCart;
  icon2 = faHeart;
  items: any;
  items2: any;
  totalitems: number = 0;
  totalitems2: number = 0;
  cartitems: any;
  wishlistitems: any;
  username: any;
  image: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    public cartService: CartService,
    public authService: LoginService,
    public wishlistService: WishlistService,
    public userService: UserService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userParsed = user && JSON.parse(user).user;

    let userId = user && JSON.parse(user).user.id;
    console.log(userParsed);
    this.cartService.getCartitems(userId).subscribe({
      next: (res: any) => {
        this.items = res;
        this.totalitems = this.items.cartItems.length;
        console.log(this.totalitems);
        localStorage.setItem('cartitems', this.totalitems.toString());
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(userId);
    this.wishlistService.getUserWishList(userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.items2 = res;
        this.totalitems2 = res.products.length;
        console.log(this.totalitems2);
        localStorage.setItem('wishlistitems', this.totalitems2.toString());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngAfterViewChecked(): void {
    this.image = localStorage.getItem('image');
    this.username = localStorage.getItem('name');
    this.cartitems = localStorage.getItem('cartitems'); //
    this.wishlistitems = localStorage.getItem('wishlistitems');
    this.cdRef.detectChanges();
  }

  logOut() {
    this.authService.logOut();
  }
}
