import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // The key for our token in local storage is 'travlr-token'
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  private decodePayload(token: string): any {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

  // True only if we have a token and it has not expired
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      return this.decodePayload(token).exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Call only after checking isLoggedIn()
  public getCurrentUser(): User {
    const { email, name } = this.decodePayload(this.getToken());
    return { email, name } as User;
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((resp: AuthResponse) => this.saveToken(resp.token))
    );
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd).pipe(
      tap((resp: AuthResponse) => this.saveToken(resp.token))
    );
  }
}