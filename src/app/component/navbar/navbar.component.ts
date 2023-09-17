import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

totalItem : number = 0;

  constructor( private router:Router ,private cart:CartService) {}


  ngOnInit(): void {
    
    this.cart.getProducts().subscribe(res=>{
     this.totalItem=res.length;
    })
  }


  handleClick(){
    this.router.navigate(['/cart']);
  }
}
