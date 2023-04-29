import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ToastService } from 'src/app/shared/services/toaster/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dialogRef: any
  seatCount: any 
  username: String = '';
  seatInformation: any;
  seatLoading: boolean = true;
  recentlyBooked: any = []
  constructor(private dialog: MatDialog, private httpService: HttpService, private toaster: ToastService) {
  }


  ngOnInit() {
    this.openDialog()
    this.seatCount = new FormControl(null, [Validators.required, Validators.pattern(/^[1|2|3|4|5|6|7]$/)]);
    this.getAvailableSeats()
  }


  /**
   * @description  Reset/Clear All Booking 
   */
  resetSeats() {
    this.seatLoading = true;
    this.httpService.resetSeats().subscribe((res: any) => {
      this.seatLoading = false;
      this.seatInformation = res.data[0].seats
      this.recentlyBooked = []
      this.toaster.toast('All Booking Cleared','close')
    }, (err: any) => {
      this.toaster.toast(err.message,'close')
    })
  }

  /**
   * @description check weather seat is reserved or not 
   */
  checkReserved(i: any,j: any) {
    if(this.seatInformation[i*1][j*1]==1) {
      return true
    }
    return false;
  }


  /**
   * @description To get the Initial Bookings
   */
  getAvailableSeats() {
    this.seatLoading = true;
    this.httpService.getSeatsDetails().subscribe((res: any) => {
      this.seatLoading = false;
      this.seatInformation = res.data[0].seats;
      this.recentlyBooked = []
    }, (err) => {
      this.toaster.toast(err.message,'close')
    })
  }


  /**
   * @description To Book the required Number of seats
   */
  formSubmit() {
    this.seatLoading = true
    this.httpService.bookSeats(this.seatCount.value).pipe(map((el: any) => {
      let seats: any = []
      el.data[0].booked.map((booked: any) => {
        let seat = `${booked[0]+1}-${booked[1]+1}`;
        seats.push(seat);
        return seat
      })
      el.data[0].booked = seats;
      return el
    })).subscribe((res: any) => {
      this.seatLoading = false;
      this.seatInformation = res.data[0].seats
      this.recentlyBooked = res.data[0].booked
      this.seatCount.reset()
      this.toaster.toast('Seats booked','close')

    }, (err: any) => {
      this.seatLoading=false
      this.toaster.toast(err.message,'close')
    })
  }


  /**
   * @description To decide weather to diaplay the seat or not
   */
  show(i: any, j: any) {
    if(this.seatInformation[i][j]=='2') {
      return true
    }
    return false;
  }

  /**
   * @description Open Dialog to get User name
   */
  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '250px',
      disableClose: true 
    })

    this.dialogRef.afterClosed().subscribe((result: string) => {
        this.username = result;
    })
  }  
}
