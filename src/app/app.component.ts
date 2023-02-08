import { Component, inject, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Firadenda';

  private _ApiCall = inject(ApiCallService);

  ngOnInit() {
    this._ApiCall.getItems();
  }
}
