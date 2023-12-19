import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionModel } from '../../models/session.model';
import { UserModel } from '../../models/user.model';

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession: SessionModel = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: SessionModel): void {
    this.currentSession = session;
    this.localStorageService.setItem('userCompost', JSON.stringify(session));
  }

  loadSessionData(): SessionModel{
    const sessionStr = this.localStorageService.getItem('userCompost');
    return (sessionStr) ? <SessionModel> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): SessionModel {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('userCompost');
    this.currentSession = null;
  }

  getCurrentUser(): UserModel {
    const session: SessionModel = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
