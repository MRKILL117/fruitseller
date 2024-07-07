import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input() placeholder: string | null | undefined;
  @Input() useIsoString: boolean = true;
  @Input() presetDate: string | undefined | null = null;

  @Output() onDateChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('datePicker') datePicker: any;

  constructor() { }

  ngOnInit(): void {
    if(!this.placeholder) this.placeholder = 'Seleccione una fecha';
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
