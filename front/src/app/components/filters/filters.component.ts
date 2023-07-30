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
  @Input() filters: Array<filter> = [
    {
      type: 'text',
      placeholder: 'Buscar',
      value: '',
      name: 'searchText',
      config: null
    }
  ];

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  timer: any = null;

  constructor(
    public form: FormService
  ) { }

  ngOnInit(): void {
  }

  SetDate(filter: filter, date: string) {
    let dateMoment = moment(date).tz(environment.timezone);
    filter.value = dateMoment.toISOString();
    this.Search();
  }

  OnOptionSelected(option: any) {
    this.Search();
  }

  Search(keyupEvent: boolean = false) {
    let filters: any = {};
    this.filters.forEach((filter: filter) => {
      let vlaueFormated: any = filter.value;
      switch (filter.type) {
        case 'text': case 'datepicker': default: vlaueFormated = !!vlaueFormated ? vlaueFormated : '*'; break;
        case 'select': vlaueFormated = !!vlaueFormated ? vlaueFormated : (filter.config?.multiple ? [] : null); break;
      }
      filters[filter.name] = vlaueFormated;
    });

    if(this.timerTrigger && keyupEvent) {
      if(!!this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.onSearch.emit(filters);
      }, 300);
    }
    else this.onSearch.emit(filters);
  }

  GetFilterValue(filter: filter) {
    switch (filter.type) {
      case 'text': return !!filter.value ? filter.value : '*';
      case 'datepicker': return !!filter.value ? filter.value : '*';
      case 'select': return !!filter.value ? filter.value : '*';
      default: return '*';
    }
  }

}
