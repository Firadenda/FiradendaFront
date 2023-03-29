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

  constructor(private productService: ApiCallService) {}

  ngOnInit(): void {
    this.commands$ = this.productService.getCommands();
  }

  downloadPDF() {
    const doc = new jsPDF();

    this.commands$.subscribe((commands) => {
      commands.forEach((command, index) => {
        doc.text(`Order ${command.id}`, 10, (index + 1) * 10);
        command.items.forEach((item, itemIndex) => {
          doc.text(
            `${item.name} - ${item.price} € - Item quantity mock`,
            20,
            (index + 1) * 10 + (itemIndex + 1) * 10
          );
        });
        doc.text(
          `Total: ${command.total} €`,
          20,
          (index + 1) * 10 + (command.items.length + 1) * 10
        );
        doc.text(
          `Address: ${command.address}`,
          20,
          (index + 1) * 10 + (command.items.length + 2) * 10
        );
      });

      doc.save('orders.pdf');
    });
  }
}
