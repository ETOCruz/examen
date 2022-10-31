import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private usersDataBehaviorSubject = new BehaviorSubject<any[]>(null);
  usersData$ = this.usersDataBehaviorSubject.asObservable();

  private userAuthorizedBehaviorSubject = new BehaviorSubject<any>(null);
  userAuthorized$ = this.userAuthorizedBehaviorSubject.asObservable();

  private balanceUserAuthorizedBehaviorSubject = new BehaviorSubject<any>(null);
  balanceUser$ = this.balanceUserAuthorizedBehaviorSubject.asObservable();

  constructor() { }

  saveUsersData(data: any) {
    this.usersDataBehaviorSubject.next(data);
  }

  getUsersData() {
    return this.usersDataBehaviorSubject.getValue();
  }

  validadUserAccount(userName: string, nip: number) {
    const usersData = this.getUsersData();
    const findUser = usersData.find(user => user.username === userName && user.nip === nip);
    return findUser;
  }

  suspendedUser(userName: string, nip: number){
    const usersData = this.getUsersData();
    usersData.forEach(user => {
      if (user.username === userName) {
        user.suspended = true;
      }
    })
    this.saveUsersData(usersData);
  }

  getAuthorizedUser(){
    this.userAuthorizedBehaviorSubject.getValue();
  }

  saveAuthorizedUser(user: any) {
    this.userAuthorizedBehaviorSubject.next(user);
  }

  saveBalanceUserAuthorized(balance: any) {
    this.balanceUserAuthorizedBehaviorSubject.next(balance);
  }

  getBalanceUserAuthorized() {
    return this.balanceUserAuthorizedBehaviorSubject.getValue();
  }

}
