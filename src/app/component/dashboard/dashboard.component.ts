import { Component, OnInit } from '@angular/core';
import { FootballKit } from 'src/app/football-kit';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  footballKits: FootballKit[] = []; 
  searchTerm: string = '';
  dataSource: any;

  constructor(private products: ProductsService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.products.getProduct().subscribe((res: FootballKit[]) => { 
      this.footballKits = res;
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}