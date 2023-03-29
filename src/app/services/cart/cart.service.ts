import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct } from '../../interfaces/cart-product.interface';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call/api-call.service';
import { Order } from '../../interfaces/order.interface';
import { ConfirmOrderModalComponent } from '../../modals/confirm-order-modal/confirm-order-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public isVisible = false;
  private cartSubject = new BehaviorSubject<CartProduct[]>([]);
  private personalInfoSubject = new BehaviorSubject<any>([]);
  public cart$: Observable<CartProduct[]> = this.cartSubject.asObservable();
  public personalInfo$: Observable<any> =
    this.personalInfoSubject.asObservable();

  constructor(
    private router: Router,
    private apiCallService: ApiCallService,
    private dialog: MatDialog
  ) {}

  public addToCart(product: CartProduct): void {
    const currentCart = this.cartSubject.getValue();
    const existingProductIndex = currentCart.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingProductIndex > -1) {
      currentCart[existingProductIndex].quantity++;
      this.cartSubject.next(currentCart);
    } else {
      this.cartSubject.next([...currentCart, product]);
      if (currentCart.length === 0) {
        this.isVisible = true;
      }
    }
  }

  public removeProduct(productId: number): void {
    const currentCart = this.cartSubject.getValue();
    const index = currentCart.findIndex((product) => product.id === productId);

    if (index !== -1) {
      if (currentCart[index].quantity > 1) {
        currentCart[index].quantity--;
      } else {
        currentCart.splice(index, 1);
      }
      this.cartSubject.next([...currentCart]);
    }
  }

  public clearCart(): void {
    this.cartSubject.next([]);
  }

  public getTotal(): number {
    return this.cartSubject
      .getValue()
      .reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  public toggleCart() {
    this.isVisible = !this.isVisible;
  }

  public processOrder(): void {
    this.router.navigate(['/order-resume']);
    this.isVisible = false;
  }

  public confirmOrder() {
    const cartItems = this.cartSubject.getValue();
    const personalInfo = this.personalInfoSubject.getValue();
    const order: Order = {
      items: cartItems.map((cartItem) => {
        return {
          item: {
            id: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            stock: cartItem.stock,
          },
          number: cartItem.quantity,
        };
      }),
      total: this.getTotal(),
      credit: personalInfo.map(
        (personalInfo: {
          id: number;
          number: number;
          date: string;
          owner: string;
          cvc: number;
        }) => {
          return {
            id: personalInfo.id,
            number: personalInfo.number,
            date: personalInfo.date,
            owner: personalInfo.owner,
            cvc: personalInfo.cvc,
          };
        }
      ),
      firstname: personalInfo.map(
        (personalInfo: { firstname: string }) => personalInfo.firstname
      ),
      lastname: personalInfo.map(
        (personalInfo: { lastname: string }) => personalInfo.lastname
      ),
      address: '19 rue Lucien Faure, Bordeaux',
    };

    this.apiCallService.postOrder(order).subscribe(() => {
      cartItems.forEach((cartItem) => {
        this.apiCallService.getProductStock(cartItem.id).subscribe((stock) => {
          const newStock = stock - cartItem.quantity;
          this.apiCallService.updateStock(cartItem.id, newStock).subscribe(
            () => {
              console.log(`Product ${cartItem.id} stock updated successfully.`);
            },
            (error) => {
              console.error(error);
              alert(
                `An error occurred while updating product ${cartItem.id} with ${newStock} stock.`
              );
            }
          );
        });
      });

      this.clearCart();

      const dialogRef = this.dialog.open(ConfirmOrderModalComponent, {
        autoFocus: false,
      });
      setTimeout(() => {
        dialogRef.close();
      }, 5000);
      console.log('Order placed successfully!');
    });
  }
}
