import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../components/popup/popup.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) {}

  openPopup(component: any, data?: any) {
    this.dialog.open(component, {data: data});
  }
}
