import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Input() placeholder: string = 'Ingrese una fecha';
  @Input() presetDate: string | null = null;

  @ViewChild('datePicker') datePicker: any;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      if(!!this.presetDate) this.datePicker.bsValue = new Date(this.presetDate);
    }, 10);
  }

  ClearInput() {
    this.datePicker.bsValue = null;
  }

}
