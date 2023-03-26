import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {
  ngOnInit() {
    this.carousel();
  }
  public carousel() {
    const items = document.getElementsByClassName('.carousel .carousel-item');

    Array.from(items).forEach(el => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (let i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        const cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.childNodes[0]);
        next = next.nextElementSibling;
      }
    });
  }
}
