import { Component, OnInit } from '@angular/core';
//import { ApiCallService } from './services/api-call/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Firadenda';

  //private apicall = inject(ApiCallService);

  ngOnInit() {

  }
}
