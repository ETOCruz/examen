import { Attribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-amount',
  templateUrl: './user-amount.component.html',
  styleUrls: ['./user-amount.component.scss'],
})
export class UserAmountComponent implements OnInit {

  @Input() addMoney: boolean;
  @Input() balance: string;
  @Input() title: string;
  @Output() continueOperationEmitter: EventEmitter<number> = new EventEmitter<number>();

  disableButton: boolean = false;

  showNewBalance$ = new Subject<boolean>();
  showErrorInsufficientBalance$ = new Subject<boolean>();
  showErrorMaximumAmountAllowed$ = new Subject<boolean>();
  
  finalBalance = 0;

  private amount= 0;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  handleAmountChange(event: any) {
    this.showErrorMaximumAmountAllowed$.next(false);
    this.showErrorInsufficientBalance$.next(false);
    this.showNewBalance$.next(false);
    this.disableButton = false;
    const amount = +event.target.value;
    this.amount = amount;
    if (amount === 0){
      return;
    }
    if(!this.addMoney){
      const greater = this.amountIsGreaterThanBalance(amount, +this.balance);
      if(!greater){
        this.disableButton = true;
        this.newBalance(amount, +this.balance);
      }
      return;
    }
    if(amount > 15000){
      this.showErrorMaximumAmountAllowed$.next(true);
      return;
    }
    this.disableButton = true;  
    this.newBalance(amount, +this.balance);
  }

  private amountIsGreaterThanBalance(amount: number, balance: number) {
    if (amount > balance) {
      this.showErrorInsufficientBalance$.next(true);
      return true;
    }
    return false;
  }

  newBalance(amount: number, balance: number) {
    this.finalBalance = balance + amount;
    if (!this.addMoney) {
      this.finalBalance = balance - amount;
    }
    this.showNewBalance$.next(true);
  }

  continueOperation() {
    this.continueOperationEmitter.emit(this.amount);
    this.modalController.dismiss({amount: this.amount})
  }

  cancel(){
    this.modalController.dismiss();
  }

}
