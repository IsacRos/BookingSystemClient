import { Component, Inject, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-delete',
  standalone: true,
  imports: [],
  templateUrl: './verify-delete.component.html',
  styleUrl: './verify-delete.component.scss'
})
export class VerifyDeleteComponent {
  constructor(
    private db: DbService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VerifyDeleteComponent>) {}
  
  onDelete() {
    this.db.DeleteRestaurant(this.data).subscribe(response => console.log(response));
    this.dialogRef.close();
    location.reload();
  }
}
