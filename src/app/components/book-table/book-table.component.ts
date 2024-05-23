import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { UserSettings } from '../../utils/user-settings';
import { User } from '../../models/user';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})

export class BookTableComponent {
  form!: FormGroup;
  pending = false;
  submitted = false;
  errorMessage = "";
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, 
    private db: DbService, 
    private dialogRef: MatDialogRef<BookTableComponent>,
    private userSettings: UserSettings
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      customerFirstName: ['', Validators.required],
      customerLastName: ['', Validators.required],
      customerPhone: ['', [Validators.required]],
      customerEmail: ['', [Validators.required, Validators.email]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  bookTable() {
    this.pending = true;

    if (this.form.invalid) { 
      return;
    };

    const form = this.form.value;
    const booking: Object = {
      restaurantId: this.data.RestaurantId,
      customerFirstName: form.customerFirstName,
      customerLastName: form.customerLastName,
      customerPhone: form.customerPhone,
      customerEmail: form.customerEmail,
      amountOfPeople: this.data.AmountOfPeople,
      bookedMinutes: this.userSettings.bookedMinutes,
      bookingDate: this.data.BookingDate.toISOString()
    } 

    this.db.BookTable(booking).subscribe({
      next: () => this.submitted = true,
      error: err => this.errorMessage = err.error
    }); 
  }

  onClose() {
    this.dialogRef.close();
    location.reload();
  }
}
