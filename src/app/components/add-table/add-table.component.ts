import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from '../../models/Table';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.scss'
})
export class AddTableComponent implements OnInit {
  form!: FormGroup;
  pending = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private db: DbService, 
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<AddTableComponent>) 
    { }

    
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: this.data,
        capacity: [0, [Validators.required, Validators.min(1), Validators.max(50)]]
      })
    }
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls
    }

  addTable() {
    this.pending = true;
    if (this.form.invalid) { 
      return;
    };
    const body = this.form.value;
    this.db.AddTable(body).subscribe({
      next: () => {
        this.submitted = true;
        location.reload();
      },
      error: err => console.log("Couldn't add table.", err)
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
