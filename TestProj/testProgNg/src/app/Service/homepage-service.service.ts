
import { RegisterJwtToken, RegisterDetails, LoginDetails } from './../game.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private http : HttpClient) { }

  registerJwt(details: RegisterDetails): Observable<RegisterJwtToken> {
    return this.http.post<RegisterJwtToken>("/api/v1/auth/register", details);
  }

  sendEmail(register: RegisterDetails) {

    const jwtToken = localStorage.getItem('jwt');
    // Create headers with the JWT token
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };


    // Make the HTTP GET request with the headers
    return this.http.post('/api/send', register, httpOptions);
  }

  authenticate(loginDetails: LoginDetails): Observable<any> {
    return this.http.post<any>("/api/v1/auth/authenticate", loginDetails);
  }

}
