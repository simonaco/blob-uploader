import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  functionEndpoint = `https://sicotin-hue.azurewebsites.net/api/GetToken`;
  constructor(private http: Http) {}
  putBlob(apiEndPoint, file) {
    const headers = new Headers();
    headers.append('x-ms-blob-type', 'BlockBlob');
    headers.append('x-ms-blob-content-type', file.type);
    const options = new RequestOptions({ headers: headers });
    this.http
      .put(apiEndPoint, file, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(data => console.log('success'), error => console.log(error));
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      this.http
        .get(this.functionEndpoint + `?name=${file.name}`)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => this.putBlob(data, file),
          error => console.log(error)
        );
    }
  }
}
