import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private baseUrl = '/assets/data/';

  constructor(private http: HttpClient) { }

  loadFakeData() {
    return this.http.get<any>(`${this.baseUrl}users.json`).pipe(map((result: any[]) => {
      result.forEach(user => {
        user.suspended = false;
      })
      return result;
    }));
  }

  getBalance(id: number) {
    return this.http.get<any>(`${this.baseUrl}balances.json`)
      .pipe(map((result: any[]) => {
        const findUser = result.find(balance => balance.id === id);
        return findUser;
      }));
  }

}
