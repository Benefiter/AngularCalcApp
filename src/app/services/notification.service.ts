import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess = (message: string, title: string) =>{
      this.toastr.success(message, title)
  }

  showHTMLMessage = (message: string, title: string) => {
    this.toastr.success(message, title, {
      enableHtml :  true
    })
  }

  showSuccessWithTimeout = (title: string, message: string, timespan: number | undefined) =>{
    this.toastr.success(message, title ,{
      timeOut :  timespan ?? 0
    })
  }

  showInfoWithTimeout = (title: string, message: string, timespan: number | undefined) => {
    this.toastr.info(message, title ,{
      timeOut :  timespan ?? 0
    })
  }

  showInfo = (title: string, message: string) =>  {
    return this.toastr.info(message, title, {timeOut: 0})
  }

  remove = (id: number) => this.toastr.remove(id);
}
