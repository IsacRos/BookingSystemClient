import { Injectable, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) {}
  
  openPopup(component: any, data?: any) {
    this.dialog.open(component, {
      data: data, 
      panelClass: 'my-dialog',
      backdropClass: 'my-backdrop',
      
    });
  }
}
