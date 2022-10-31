import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {

  @Input() userName: boolean;
  @Output() nipEmitter: EventEmitter<any> = new EventEmitter<any>();
  disableButton: boolean = true;

  private nip: number;

  constructor(
  ) { }

  handleNipChange(event: any) {
    this.disableButton = true;
    if (event.target.value.length === 4) {
      this.disableButton = false;
      this.nip = +event.target.value;
      return;
    }
  }

  login() {
    const userInfo = {
      userName : this.userName,
      nip: this.nip
    }
    this.nipEmitter.emit(userInfo);
  }

}
