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

  downloadPdf() {
    const doc = new jsPDF();
    const commands = this.commands$;
    let y = 10;

    commands.subscribe((data) => {
      data.forEach((command) => {
        doc.text(`Order ${command.id}`, 10, y);
        y += 10;
        command.items.forEach((item) => {
          doc.text(`${item.name} - ${item.price} - Item quantity mock`, 10, y);
          y += 10;
        });
        doc.text(`Total: ${command.total}`, 10, y);
        y += 10;
        doc.text(`Address: ${command.address}`, 10, y);
        y += 20;
      });
    });

    doc.save('commands.pdf');
  }
}
