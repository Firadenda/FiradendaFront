import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from '../services/api-call/api-call.service';
import { Order } from '../interfaces/order.interface';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent {
  public commands$: Observable<Order[]>;

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.commands$ = this.apiCallService.getCommands();
  }

  downloadPDF(command: Order) {
    const doc = new jsPDF();

    doc.text(
      `Order ${command.id} - ${command.firstName} ${command.lastName}`,
      10,
      10
    );
    command.items.forEach((items, index) => {
      doc.text(
        `Product: ${items.item.name} - Price: ${items.item.price} € - Quantity: ${items.number}`,
        20,
        30 + index * 10
      );
    });
    doc.text(`Total: ${command.total} €`, 20, 50 + command.items.length * 10);
    doc.text(`Address: ${command.address}`, 20, 60 + command.items.length * 10);

    doc.save(`order_${command.id}.pdf`);
  }
}
