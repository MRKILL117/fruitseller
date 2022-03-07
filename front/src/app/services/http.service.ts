import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers: HttpHeaders;
  apiBaseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  private GetEndpointFulUrl(endpoint: string): string {
    if(endpoint.charAt(0) == '/') return `${this.apiBaseUrl}${endpoint}`
    else return `${this.apiBaseUrl}/${endpoint}`
  }

  public Post(endpoint: string, body: any) {
    return this.http.post(this.GetEndpointFulUrl(endpoint), body, {headers: this.headers});
  }
  
  public Get(endpoint: string) {
    return this.http.get(this.GetEndpointFulUrl(endpoint), {headers: this.headers});
  }
  
  public Patch(endpoint: string, body: any) {
    return this.http.patch(this.GetEndpointFulUrl(endpoint), body, {headers: this.headers});
  }

  public Delete(endpoint: string, body: any) {
    return this.http.delete(this.GetEndpointFulUrl(endpoint), {headers: this.headers});
  }
  
}
