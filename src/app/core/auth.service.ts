import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, switchMap, tap, throwError } from "rxjs";

import { environment } from "src/environments/environment";
import { HOME_PAGE, LOGIN_PAGE } from "../constants";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { UserService } from "../modules/user/user.service";
import { clearSessionFromLocalStorage, getSessionFromLocalStorage } from "../utils";

interface ISignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  kind: string;
}

interface ISignInResponse extends ISignUpResponse {
  registered: boolean;
}

enum AuthType {
  Login,
  Register
}


@Injectable({
  providedIn: "root",
})

export class AuthService {
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;
  public session = new BehaviorSubject<Session | null>(getSessionFromLocalStorage());

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  //REGISTER
  signUpUser(email: string, password: string, userDetails: Partial<User>) {
    return this.handleAuth(email, password, AuthType.Register).pipe(
      switchMap((authResponse) => {
        return this.userService.createNewUser({ ...userDetails, id: authResponse.localId })
      })
    )
  }

  //LOGIN
  signInUser(email: string, password: string) {
    return this.handleAuth(email, password, AuthType.Login);
  }

  //LOGOUT
  logout() {
    clearSessionFromLocalStorage();
    this.session.next(null);
    this.router.navigate([LOGIN_PAGE]);

  }


  handleAuth(email: string, password: string, authType: AuthType) {
    const authUrl = authType === AuthType.Login ? this.signInUrl : this.signUpUrl;

    return this.httpClient.post<ISignInResponse | ISignUpResponse>(authUrl,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleAuthErrors),
        tap((signUpResponse: ISignInResponse | ISignUpResponse) => {
          const { idToken, localId } = signUpResponse;
          const currentSession = new Session(localId, idToken);
          localStorage.setItem('currentSession', JSON.stringify(currentSession));
          this.session.next(currentSession);
          this.router.navigate([HOME_PAGE]);
        })
      )
  }

  private handleAuthErrors(authError: HttpErrorResponse) {
    const errorID = authError.error.error.message;
    let errorMessage;
    switch (errorID) {
      case 'EMAIL_EXISTS':
        errorMessage = "This Email is Already Taken!";
        break;
      case 'INVALID_EMAIL':
        errorMessage = "Invalid Email!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This Email is not registed!"
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Password is incorect!"
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        errorMessage = "To many attemts, your accout has been temporarly locked"
        break;
      default:
        errorMessage = "Password or Email incorect!";
    }

    return throwError({ authError, errorMessage });
  }

  get loggedInUserId() {
    return this.session.getValue()?.id;
  }

}
