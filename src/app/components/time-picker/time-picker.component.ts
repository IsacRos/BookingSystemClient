import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from '../../models/Table';
import { UserSettings } from '../../utils/user-settings';
import { skip } from 'rxjs';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss'
})
export class TimePickerComponent implements OnChanges {

  constructor(private userSettings: UserSettings) {}

  timeSlots: Date[] = [];

  selectedTime: Date | null = null;

  chosenAmountOfPeople?: number | null;

  @Input() selectedDate?: Date | null;

  @Input() tables?: Table[];

  @Input() amountOfPeople?: number | null;

  @Output() timeChange = new EventEmitter<Date>();


  pickerEvent(val: Date) {
    this.timeChange.emit(val);
  }

  testTables = () => {
    console.log(this.tables);
  }

  ngOnChanges(): void {
    document.getElementsByName('btnradio').forEach(x => (x as HTMLInputElement).checked = false);
    this.timeChange.emit(undefined);
    this.timeSlots = [];
    console.log(this.tables)
    this.loadData();
  }

  loadData = () =>{
    const startTime = new Date(this.userSettings.openingTime);
    const endTime = new Date(this.userSettings.closingTime);
    endTime.setDate(this.selectedDate!.getDate());
    endTime.setMonth(this.selectedDate!.getMonth());
    endTime.setFullYear(this.selectedDate!.getFullYear());

    let currentTime = new Date();
    currentTime.setTime(startTime.getTime());
    currentTime.setDate(this.selectedDate!.getDate());
    currentTime.setMonth(this.selectedDate!.getMonth());
    currentTime.setFullYear(this.selectedDate!.getFullYear());
  
    while(currentTime <= endTime) {
      this.timeSlots.push(new Date(currentTime));
      // console.log(currentTime.toISOString())

      currentTime.setMinutes(currentTime.getMinutes() + this.userSettings.intervalMinutes);
    }
  
    // console.log(this.timeSlots)
  }

  checkDisabled = (date: Date): boolean => {
    if (!this.tables) return true;
    const startTimeMargin = new Date();
    startTimeMargin.setHours(startTimeMargin.getHours() + this.userSettings.startTimeMargin);
    if(date < startTimeMargin) return true;

    let setMaxCapacity: number = 0;
    let flag = 0;
    let indexer= 0;

    for(const table of this.tables) {
      if(table.capacity >= this.amountOfPeople!) { 
        setMaxCapacity = table.capacity;
        for (const booking of table.bookings) {
          const adjustedTime = new Date(booking.startTime);
          adjustedTime.setMinutes(booking.startTime.getMinutes() - this.userSettings.bookedMinutes);
          if (date <= booking.endTime && date >= adjustedTime) {
            flag++;
          }
        }
      }
      else flag++;
      indexer++;
    }
    if(flag === indexer) {
      return true; 
    } 
    return false;
  }
}
