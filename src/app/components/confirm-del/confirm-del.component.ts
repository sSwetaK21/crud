import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-del',
  templateUrl: './confirm-del.component.html',
  styleUrls: ['./confirm-del.component.css']
})
export class ConfirmDelComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDelComponent>) { }

}
