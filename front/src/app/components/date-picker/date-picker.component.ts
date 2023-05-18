import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Input() placeholder: string = 'Seleccione una fecha';
  @Input() presetDate: string | null = null;

  @Output() onDateChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('datePicker') datePicker: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      if(!!this.presetDate) this.datePicker.bsValue = new Date(this.presetDate);
    }, 10);
  }

  ClearInput() {
    this.datePicker.bsValue = null;
  }

  OnDatePicked(date: any) {
    this.onDateChange.emit(moment(date).tz(environment.timezone).toISOString());
  }

}
