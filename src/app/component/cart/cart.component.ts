import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product: any = [];
  grandTotal!: number;


  constructor(private cart:CartService) { }


  ngOnInit(): void {
   this.cart.getProducts().subscribe(res=>{
    this.product=res;
    this.grandTotal = this.cart.getTotalPrice();
   })
  }

  removeItem(item: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, remove the item from the cart
        this.cart.removeCartItem(item);
        swalWithBootstrapButtons.fire(
          'Removed!',
          'The item has been removed from your cart.',
          'success'
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // User canceled, do nothing
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'The item remains in your cart.',
          'error'
        );
      }
    });
  }

  emptyCart(){{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, empty cart!'
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, delete the items
          this.cart.removeAllCart();
          Swal.fire(
            'Deleted!',
            'Your cart has been emptied.',
            'success'
          );
        }
      });
    }
  }
}
