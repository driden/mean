import 'rxjs/Rx'
import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthenticationService {
    public user = window['user']

    private _signInUrl = 'api/auth/signin'
    private _signUpUrl = 'api/auth/signup'
    constructor(private http: Http){

    }

    isLoggedIn():boolean {
        return !!this.user
    }

   private doPost(entity: any, endpoint: string): Observable<any>{
        let body = JSON.stringify(entity)
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers: headers})

        return this.http
            .post(endpoint,body,options)
            .map(res => this.user = res.json())
            .catch(this.handleError)
    }

    signin(credentials: any) : Observable<any> {
        return this.doPost(credentials,this._signInUrl)
    }

    signup(user: any) : Observable<any> {
        return this.doPost(user,this._signUpUrl)
    }

    private handleError(error: Response){
        console.error(error)
        return Observable.throw(error.json().message || 'Server error')
    }
}