import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FootballKit } from 'src/app/football-kit';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  originalFootballKits: FootballKit[] = [];
  footballKits: FootballKit[] = [];
  searchTerm: string = '';

  constructor(private products: ProductsService, private router:Router ,private cart:CartService) {}

  ngOnInit() {
    this.fetchProducts();

    this.originalFootballKits.forEach((a:any)=>{
Object.assign(a,{quantity:1,total:a.price})
    });
  }

  fetchProducts() {
    this.products.getProduct().subscribe((res: FootballKit[]) => {
      this.originalFootballKits = res;
      this.resetFilter();
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    if (filterValue) {
      this.footballKits = this.originalFootballKits.filter(kit => {
        return (
          kit.name.toLowerCase().includes(filterValue) ||
          kit.description.toLowerCase().includes(filterValue)
        );
      });
    } else {
      this.resetFilter();
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.footballKits = [...this.originalFootballKits];
  }
handleClick(){
 
 this.router.navigate(['/kit']) 
}

addToCart(kit: any){

  this.cart.addToCart(kit);
}
}
