import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../models/Restaurant';
import { DbService } from '../../services/db.service';
import { Table } from '../../models/Table';
import { TableBooking } from '../../models/TableBooking';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { MatInputModule } from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { TimePickerComponent } from "../../components/time-picker/time-picker.component";
import { PopupService } from '../../services/popup.service';
import { BookTableComponent } from '../../components/book-table/book-table.component';
import { UserSettings } from '../../utils/user-settings';
import { convertTimeString, getRandomImage } from '../../utils/helper-functions';


@Component({
    selector: 'app-book-restaurant-page',
    standalone: true,
    templateUrl: './book-restaurant-page.component.html',
    styleUrl: './book-restaurant-page.component.scss',
    imports: [DatepickerComponent, MatFormFieldModule, MatInputModule, MatSelectModule, TimePickerComponent]
})
export class BookRestaurantPageComponent implements OnInit {
  id: string = '';
  restaurant!: Restaurant;
  tables?: Table[];
  selectedAmount: number | null = null; 
  amountOfPeople = this.userSettings.getMaxPeople();
  images: string[] = [];
  
  dateVariable: Date | null = null;
  timeVariable: Date | null = null;

  convertTimeString = convertTimeString;
  @ViewChild('mySelectAmount') mySelectAmount!: MatSelect;
 
  constructor(
    private router: ActivatedRoute, 
    private db: DbService, 
    private popupService: PopupService, 
    private userSettings: UserSettings,
    private cdRef: ChangeDetectorRef
  ) {};

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    })

    this.db.GetRestaurantById(this.id).subscribe(response => {
      this.restaurant = response;
    })

    this.db.GetTables(this.id).subscribe(response => {
      this.tables = response;
    })
    this.images.push(getRandomImage());
    this.images.push(getRandomImage());
    this.images.push(getRandomImage());
  }

  receiveDate(event: Date) {
    this.dateVariable = event;
  }
  receiveTime(event: Date) {
    this.timeVariable = event;
  }
  onSelectChange(){
    this.cdRef.detectChanges();
    if(this.mySelectAmount) this.mySelectAmount.close();
  }
  
  /* checkAvailability(booking: TableBooking, date: Date): boolean {
    if (date > booking.startTime && date < booking.endTime) return false;
    return true;
  }
 */
  bookTable() {
    const data: Object = {
      RestaurantId: this.id,
      AmountOfPeople: this.selectedAmount,
      BookingDate: this.timeVariable,
    }
    this.popupService.openPopup(BookTableComponent, data)
  }

}
