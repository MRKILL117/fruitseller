import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers: HttpHeaders;
  apiBaseUrl: string;

  constructor(
    private http: HttpClient,
    private role: RoleService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  private GetEndpointFullUrl(endpoint: string, useToken: boolean = true): string {
    let fullEndpoint;
    if(endpoint.charAt(0) == '/') fullEndpoint = `${this.apiBaseUrl}${endpoint}`;
    else fullEndpoint = `${this.apiBaseUrl}/${endpoint}`;
    if(useToken) fullEndpoint = fullEndpoint.concat(`?access_token=${this.role.GetUserToken()}`);
    return fullEndpoint;
  }

  public Post(endpoint: string, body: any, useToken: boolean = true) {
    return this.http.post(this.GetEndpointFullUrl(endpoint), body, {headers: this.headers});
  }
  
  public Get(endpoint: string, useToken: boolean = true) {
    return this.http.get(this.GetEndpointFullUrl(endpoint), {headers: this.headers});
  }

  public GetFile(endpoint: string) {
    return this.http.get(this.GetEndpointFullUrl(endpoint), {headers: this.headers, responseType: 'blob' as 'json'});
  }
  
  public Patch(endpoint: string, body: any, useToken: boolean = true) {
    return this.http.patch(this.GetEndpointFullUrl(endpoint), body, {headers: this.headers});
  }

  public Delete(endpoint: string, body: any, useToken: boolean = true) {
    return this.http.delete(this.GetEndpointFullUrl(endpoint), {headers: this.headers});
  }

  public DownloadFileWithoutApi(url: string, name: string) {
    this.http.get(url, {
      responseType: 'blob'
    }).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.setAttribute('href', objectUrl);
      a.setAttribute('download', name);
      a.click();
      a.remove();
    });
  }

  public GetErrorMessage(error: any) {
    let messages = [];
    if(!error) return null;
    if(!!error.error?.error?.message) return error.error.error.message;
    if(!!error.error?.error?.details.messages) {
      for (const property in error.error.error.details.messages) {
        if (Object.prototype.hasOwnProperty.call(error.error.error.details.messages, property)) {
          console.log("key", property);
          const errorMessage = error.error.error.details.messages[property];
          messages.push(`${property}: ${Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}`);
        }
      }
    }
    return messages.join('\n');
  }
  
}
