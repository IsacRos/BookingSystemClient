import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    addresssLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    addressLine3: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      addressLine3: [''],
      zipCode: [
        '', 
        Validators.required, 
        Validators.maxLength(5),
        Validators.minLength(5)
      ],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: [
        '', 
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8)
      ]
    })
  }
}
