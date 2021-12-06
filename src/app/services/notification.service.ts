import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess = (message: string, title: string) =>{
      return this.toastr.success(message, title)
  }

  showHTMLMessage = (message: string, title: string, timespan?: number | undefined) => {
    return this.toastr.info(message, title, {
      enableHtml :  true,
      timeOut: timespan ?? 0
    })
  }

  showSuccessWithTimeout = (title: string, message: string, timespan: number | undefined) =>{
    return this.toastr.success(message, title ,{
      timeOut :  timespan ?? 0
    })
  }

  showInfoWithTimeout = (title: string, message: string, timespan: number | undefined) => {
    return this.toastr.info(message, title ,{
      timeOut :  timespan ?? 0
    })
  }

  showInfo = (title: string, message: string) =>  {
    return this.toastr.info(message, title, {timeOut: 0})
  }
}
