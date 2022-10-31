import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-user-account-detail',
  templateUrl: './user-account-detail.component.html',
  styleUrls: ['./user-account-detail.component.scss'],
})
export class UserAccountDetailComponent implements OnInit {

  @Input() showUserName: boolean;
  @Input() balance: string;
  @Input() name: string;
  @Input() account: string

  @Output() accountSelectedEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  selectedAccount() {
    this.accountSelectedEmitter.emit();
  }

}
