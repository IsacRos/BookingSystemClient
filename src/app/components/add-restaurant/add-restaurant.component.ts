import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Restaurant } from '../../models/Restaurant';
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})


export class AddRestaurantComponent implements OnInit {

  form!: FormGroup;
  pending = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private db: DbService, 
    private dialogRef: MatDialogRef<AddRestaurantComponent>) 
    { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      addressLine3: [''],
      zipCode: ['',Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  addRestaurant() {

    this.pending = true;
    if (this.form.invalid) { 
      return;
    };
    const restaurant = this.form.value;
    
    this.db.AddRestaurant(restaurant).subscribe({
      next: () => this.submitted = true,
      error: err => console.error("Couln't add restaurant", err)
    });    
  }
  
  onClose() {
    this.dialogRef.close();
    location.reload();
    // this.closePopup.emit();
    // this.submitted = false;
  }
}
