import { Component, Inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../models/Restaurant';

@Component({
  selector: 'app-edit-restaurant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.scss'
})
export class EditRestaurantComponent {
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private db: DbService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditRestaurantComponent>) 
    { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: null,
      addressLine1: null,
      addressLine2: null,
      addressLine3: null,
      zipCode: null,
      city: null,
      country: null,
      phoneNumber: null
    })
  }
  onEdit() {
    let request = this.form.value;
    request.id = this.data;

    this.db.UpdateRestaurant(request).subscribe(response => {
      console.log(response);
    })
    this.submitted = true;
  }

  onClose() {
    this.dialogRef.close();
  }
}
