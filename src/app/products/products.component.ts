import {Component, OnInit} from '@angular/core';
import {ProductsHomeComponent} from "../products-home/products-home.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends ProductsHomeComponent implements OnInit{
  banniereProduct1:any = "./assets/videos/test2.mp4";
  banniereProduct2:any = "./assets/videos/bannieremonde.mp4";
  banniereProduct3:any = "./assets/videos/bannierecasquette.mp4";

}
