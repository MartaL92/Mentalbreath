import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject} from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthData, Signup } from "./auth";

@Injectable({
  providedIn: "root",
})

export class AuthService {
  jwtHelper = new JwtHelperService();

  URL = "http://localhost:4201";
  url = "http://localhost:4201/users";


  private authSubject = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(map(user => !!user))
  userId: number | null = null;
  userRole!: string;

  autologoutTimer: any

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser()
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.URL}/login`, data).pipe(
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('user', JSON.stringify(data))
        this.userId = data.user.id;
        localStorage.setItem('userID', JSON.stringify(data.user.id))
        this.userRole = data.user.role;
        const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        this.autoLogout(expirationDate)
      })
    )
  }

  restoreUser() {
    const userJson = localStorage.getItem('user')
    if (!userJson) {
      return
    }
    const user: AuthData = JSON.parse(userJson)
    if (this.jwtHelper.isTokenExpired(user.accessToken)) {
      return
    }
    this.authSubject.next(user)
    const expirationDate = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date
    this.autoLogout(expirationDate)
  }

  signup(data: Signup) {
    return this.http
      .post(`${this.URL}/register`, data)
  }

  logout() {
    this.authSubject.next(null)
    this.router.navigate([""])
    localStorage.removeItem('user')
    localStorage.removeItem('userID')
    if (this.autologoutTimer) {
      clearTimeout(this.autologoutTimer)
    }
  }

  autoLogout(expirationDate: Date) {
    const expMs = expirationDate.getTime() - new Date().getTime()
    this.autologoutTimer = setTimeout(() => {
      this.logout()
    }, expMs);
  }

}
