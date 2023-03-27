import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from '../services/api-call/api-call.service';
import { Order } from '../interfaces/order.interface';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent {
  public commands$: Observable<Order[]>;

  constructor(private productService: ApiCallService) {}

  ngOnInit(): void {
    this.commands$ = this.productService.getCommands();
  }
}
