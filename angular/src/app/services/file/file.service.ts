import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

   public uploadFile(file: any):Observable<Response> {
     let formData: FormData = new FormData();
     formData.append('file', file, file.name);
     return this.http.post<Response>(`${environment.apis.default.url}/File/UploadFile`, formData);
   }

   public getReviewReport(financialsID: any):Observable<any> {
    let formData: FormData = new FormData();
    formData.append('financialsID', financialsID);
    return this.http.post<any>(`${environment.apis.default.url}/File/GetReviewReport`, formData);
  }

  public DocumentsDownload(fileUrl: string) {
    return this.http.get(`${environment.apis.default.url}` + "/File/DocumentsDownload?fileUrl=" + fileUrl, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
    });
}


}
