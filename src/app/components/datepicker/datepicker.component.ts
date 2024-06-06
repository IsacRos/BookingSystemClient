import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { Table } from '../../models/Table';


@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    MatNativeDateModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})

export class DatepickerComponent {
  dateValue!: Date;
  
  @Input() disabled: boolean = false;

  @Input() placeholder: string = "";

  @Input() selectedDate?: Date;

  @Input() tables?: Table[];

  @Output() dateChange = new EventEmitter<Date>();

  // addEvent(val: Date) {
  //   this.dateChange.emit(val);
  // }
  pickerEvent() {
    this.dateChange.emit(this.dateValue);
  }

  dateFilter = (date: Date | null): boolean => {
    if(!date) return true;
    const newDate = new Date(date);
    const todaysDate = new Date();
    let isSameDay = this.isSameDay(newDate, todaysDate);
    let beforeToday = date >= todaysDate;
    return isSameDay || beforeToday;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
