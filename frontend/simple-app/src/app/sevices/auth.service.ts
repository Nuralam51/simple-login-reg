import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../common/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private rootPath = "http://localhost:9000/fapi/v1/";
    private Oauth2Path = "http://localhost:9000/oauth/token";

    private CLIENT_ID = 'trusted-client-id';
    private PASSWORD = 'secret';
    private GRANT_TYPE = 'password';

    user: User;
    headers: HttpHeaders;

    constructor(private http: HttpClient) { }

    obtainAccessToken(user: User): Observable<any> {
        let params = new HttpParams()
            .set('username', user.email)
            .set('password', user.password)
            .set('grant_type', this.GRANT_TYPE)
            .set('client_id', this.CLIENT_ID);
        const headers = {
            Authorization: 'Basic ' + btoa(`${this.CLIENT_ID}:${this.PASSWORD}`),
            'Content-type': 'application/x-www-form-urlencoded',
        };
        return this.http.post<any>(this.Oauth2Path, params.toString(), { headers: headers })
            .pipe(map(response => {
                if (response) {
                    localStorage.setItem("access_token", response.access_token);
                }
            })
        );
    }

    findUserByEmail(email: string): Observable<any> {
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        };
        return this.http.get("http://localhost:9000/api/v2/user-details/"+ email, {headers: headers});
    }

    register(user: User): Observable<any> {
        return this.http.post(this.rootPath + "register", user);
    }

    checkOtp(user: User): Observable<any> {
        return this.http.post(this.rootPath + "otp", user);
    }

    logout() {
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem('userInfo'),
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        };
        return localStorage.removeItem("userInfo");
    }
}
