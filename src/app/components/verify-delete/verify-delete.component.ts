import { Component, Inject, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteModel } from '../../models/DeleteModel';

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
    @Inject(MAT_DIALOG_DATA) public data: DeleteModel,
    private dialogRef: MatDialogRef<VerifyDeleteComponent>) {}

  onDelete() {
    switch (this.data.type) {
      case "restaurant":
        this.onDeleteRestaurant();
        break;
      case "table":
        this.onDeleteTable()
        break;
      default: alert("Something went wrong.");
    }
  }
  
  onDeleteRestaurant() {
    this.db.DeleteRestaurant(this.data.value).subscribe({
      next: () => location.reload(),
      error: err => console.error("Couldn't delete restaurant", err)      
    });
    this.onClose();
  }

  onDeleteTable() {
    this.db.DeleteTable(this.data.value.restaurantId, this.data.value.tableId).subscribe({
      next: () => location.reload(),
      error: err => console.error("Couldn't delete table", err)
    });
    this.onClose();
  }

  onClose () {
    this.dialogRef.close();    
  };
}
