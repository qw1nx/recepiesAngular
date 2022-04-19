import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";


export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{

  user = new BehaviorSubject<UserModel>(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDP0IeuruWQTnye-hBvcidxZdDf8OQsf0k',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
      tap((resData: AuthResponseData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP0IeuruWQTnye-hBvcidxZdDf8OQsf0k',
      {
        email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(this.handleError), tap((resData: AuthResponseData) => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },expirationDuration)
  }

  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData){
      return;
    }
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token){
      this.user.next(loadedUser);
      const expiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiration);
    }
  }

  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number){
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      const user = new UserModel(email, localId, token, expirationDate)
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user))
      }

  private handleError(errorRes: HttpErrorResponse){
    //console.log(errorRes);
    let errorMessage = 'An unknown error';
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case "EMAIL_EXISTS" :
        errorMessage = 'This email exists already';
       case "EMAIL_NOT_FOUND":
         errorMessage= 'There is no user record corresponding to this identifier. The user may have been deleted.'
       //case "INVALID_PASSWORD":
        //errorMessage = 'The password is invalid or the user does not have a password.';
      // case "USER_DISABLED":
      //   errorMessage = 'The user account has been disabled by an administrator.';
    }
    return throwError(errorMessage);
  }

}
