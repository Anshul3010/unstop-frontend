import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogComponent>) {}


  name: any

  ngOnInit(): void {
    this.name = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)] )
  }

  formSubmit() {
    this.dialogRef.close(this.name.value)
  }
}
