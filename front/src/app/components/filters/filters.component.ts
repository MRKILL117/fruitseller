import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';
import { filter } from 'src/app/common/data-types.interface';
import { FormService } from 'src/app/services/form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Input() timerTrigger: boolean = false;
  @Input() dateIncludesTime: boolean = false;
  @Input() filters: any = {
    text: true,
    startDate: true,
    endDate: true,
    options: null
  };

  @Output() onSearch: EventEmitter<filter> = new EventEmitter<filter>();

  timer: any = null;
  filtersForm: FormGroup = new FormGroup({
    text: new FormControl('', []),
    startDate: new FormControl(null, []),
    endDate: new FormControl(null, []),
    options: new FormControl(null, []),
  });

  constructor(
    public form: FormService
  ) { }

  ngOnInit(): void {
  }

  SetDate(filterName: string, date: string) {
    let dateMoment = moment(date).tz(environment.timezone);
    if(filterName.toLowerCase().includes('start')) dateMoment.startOf('day');
    if(filterName.toLowerCase().includes('end')) dateMoment.endOf('day');
    this.filtersForm.get(filterName)?.setValue(dateMoment.toISOString());
    this.Search();
  }

  Search(keyupEvent: boolean = false) {
    let filters: filter = this.filtersForm.value;
    filters.text = !!filters.text ? filters.text : '*';
    filters.startDate = !!filters.startDate ? filters.startDate : '*';
    filters.endDate = !!filters.endDate ? filters.endDate : '*';
    filters.options = !!filters.options ? filters.options : [];

    if(this.timerTrigger && keyupEvent) {
      if(!!this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.onSearch.emit(filters);
      }, 300);
    }
    else this.onSearch.emit(filters);
  }

}
