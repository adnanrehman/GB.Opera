import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public importPrices(payload: FormData): Observable<string> {
    var httpOptions = {
      headers: new HttpHeaders().append('Content-Disposition', 'multipart/form-data'),
    };
    return this.http.post<string>(`${environment.apis.default.url}/Import/ImportPrices`, payload, httpOptions);
  }

  public importOfficialIndices(payload: FormData): Observable<string> {
    var httpOptions = {
      headers: new HttpHeaders().append('Content-Disposition', 'multipart/form-data'),
    };
    return this.http.post<string>(`${environment.apis.default.url}/Import/ImportOfficialIndices`, payload, httpOptions);
  }

  public importGlobalIndices(payload: FormData): Observable<string> {
    var httpOptions = {
      headers: new HttpHeaders().append('Content-Disposition', 'multipart/form-data'),
    };
    return this.http.post<string>(`${environment.apis.default.url}/Import/ImportGlobalIndices`, payload, httpOptions);
  }

  //  public uploadFile(file: any):Observable<Response> {
  //    let formData: FormData = new FormData();
  //    formData.append('file', file, file.name);
  //    return this.http.post<Response>(`${environment.apis.default.url}/Import/UploadFile`, formData);
  //  }




}
