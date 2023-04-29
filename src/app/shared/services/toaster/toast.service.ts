import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackbar: MatSnackBar) { }

  toast(message: string, action: string='close', time=1) {
    this._snackbar.open(message, action, {
      duration: time*1000
    })
  }
}
