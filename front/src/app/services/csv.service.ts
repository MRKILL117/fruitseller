import { Injectable } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  public options: any = {
    fieldSeparator: ',',
    showLabels: true,
    keys: [],
    headers: []
  };

  constructor(
    private papa: Papa
  ) { }

  public ReadCSV(file_data: string | any): Promise<ParseResult> {
    const options = {
      header: true,
      skipEmptyLines: true,
      encoding: "ISO-8859-3",
      complete: (results: { data: any; }, file: any) => {
        return results.data;
      }
    };
    return Promise.resolve(this.papa.parse(file_data, options));
  }

  public GenerateCSV(name: any, data: any, keys = [], headers = []) {
    this.options.keys = keys;
    this.options.headers = headers;

    return new Angular5Csv(data, name, this.options);
  }

  public FormatData(array: Array<any>, dataConversions: any): Array<any> {
    return array.map(instance => {
      let dataFormatted: any = {};
      dataConversions.forEach((conversion: any) => {
        dataFormatted[conversion.newKey] = this.ConvertData(instance[conversion.oldKey], conversion.type);
      });
      return dataFormatted;
    });
  }

  private ConvertData(data: string, type: string): any {
    switch (type) {
      case 'number': return Number.isNaN(Number(data)) ? data : Number(data);
      case 'array': return data.split(/,|-/).map(d => d.trim()).filter(d => !!d);
      default: return data;
    }
  }

}
