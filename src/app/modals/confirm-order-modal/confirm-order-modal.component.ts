import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-order-modal',
  templateUrl: './confirm-order-modal.component.html',
  styleUrls: ['./confirm-order-modal.component.css'],
})
export class ConfirmOrderModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmOrderModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
