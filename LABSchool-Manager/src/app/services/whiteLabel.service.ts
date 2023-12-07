import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhiteLabelService {
    private baseUrl = 'https://labschoolmanagerback.azurewebsites.net/api/whiteLabel'; 

  constructor(private httpClient: HttpClient) { }

  getAllWhiteLabels(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  getWhiteLabelById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  createWhiteLabel(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  updateWhiteLabel(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, data);
  }

  deleteWhiteLabel(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
