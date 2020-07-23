import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyDRGBQ28wacQj1YacWb0MdPdDESSmFf0Os';
  
  userToken:string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login(user: UserModel){
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  registerUser(user: UserModel){
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  private saveToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token',idToken);

    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expira',today.getTime().toString());

  }

  private getToken(){
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
  }

  isAuthenticated():boolean{
    if(this.userToken.length<2)
      return false;
    
      const expira = Number(localStorage.getItem('expira'));
      const expireDate = new Date();
      expireDate.setTime(expira);

      if(expireDate>new Date())
        return true;
      
        return false;
      

  }
}
