import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { BankAccountService, LoaderService, HomeService, AlertControllerService } from 'src/app/services/indexServices';
import { UserAmountComponent } from 'src/app/components/user-amount/user-amount.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  showButtonIniciar = true;
  showButtonLogginOut = false;

  showUserLoginComponent = false;
  userAccountDetailComponent = false;
  userLoginComponentUserNameArgument = '';

  failedLoginCount = 0;

  balance$: Observable<any>;
  userAuthorized$: Observable<any>;

  private homePageSubscriptions: Subscription[] = []

  constructor(
    private homeService: HomeService,
    private modalCtrl: ModalController,
    private loaderService: LoaderService,
    private alertControllerService: AlertControllerService,
    private bankAccountService: BankAccountService) {
    this.balance$ = this.homeService.balanceUser$;
    this.userAuthorized$ = this.homeService.userAuthorized$
  }

  ngOnInit(): void {
    this.loadFakeDataFromService();
  }

  ngOnDestroy(): void {
    this.homePageSubscriptions.forEach(sub => sub.unsubscribe())
  }

  private async loadFakeDataFromService() {
    await this.loaderService.show();
    this.homePageSubscriptions.push(
      this.bankAccountService
        .loadFakeData()
        .subscribe(result => {
          this.homeService.saveUsersData(result);
          this.loaderService.hide();
        })
    );
  }

  async init() {
    this.showButtonIniciar = false;
    this.showUserLoginComponent = false;
    await this.loaderService.show();
    const usersAvailable = this.homeService.getUsersData();
    const userToWork = Math.floor(Math.random() * usersAvailable.length + 2);
    if (!usersAvailable[userToWork]) {
      this.presentAlertError('Error De autenticación', 'Algo salio mal, por favor reintenta mas tarde.');
      this.showButtonIniciar = true;
      return;
    }
    const user = usersAvailable[userToWork];
    if (user.suspended) {
      this.presentAlertError('La cuenta ha sido bloqueada', 'Busca tu sucursal más cercana y contactanos para revisar su cuenta');
      this.showButtonIniciar = true;
      return;
    }
    this.userLoginComponentUserNameArgument = user.username;
    await this.loaderService.hide();
    this.showUserLoginComponent = true;
  }

  async loginOut() {
    await this.loaderService.show();
    setTimeout(() => {
      this.showButtonIniciar = true;
      this.showButtonLogginOut = false;
      this.failedLoginCount = 0;
      this.showUserLoginComponent = false;
      this.userAccountDetailComponent = false;
      this.loaderService.hide();
    }, 1900);
  }

  private async presentAlertError(title: string, message: string) {
    await this.loaderService.hide();
    this.alertControllerService.presentAlert(title, message)
  }

  async login(event: any) {
    await this.loaderService.show();
    const userAllowed = this.homeService.validadUserAccount(event.userName, event.nip);
    if (!userAllowed) {
      this.failedLoginCount += 1;
      if (this.failedLoginCount === 3) {
        this.homeService.suspendedUser(event.userName, event.nip);
        this.loginOut();
        await this.loaderService.hide();
        this.presentAlertError('La cuenta ha sido bloqueada', 'Demasiados intentos fallidos.');
        return
      }
      await this.loaderService.hide();
      this.presentAlertError('Imposible iniciar sesión', 'Los datos son incorrectos.');
      return;
    }
    this.homeService.saveAuthorizedUser(userAllowed);
    this.getUserBalance(userAllowed.id);
    this.showUserLoginComponent = false;
    this.showButtonLogginOut = true;
    this.loaderService.hide();
  }

  getUserBalance(userId: number) {
    this.bankAccountService.getBalance(userId).subscribe(result => {
      this.homeService.saveBalanceUserAuthorized(result);
      this.userAccountDetailComponent = true;
    });
  }

  async showUserAmountComponent(add: boolean) {
    let titleToShow = 'Depositar';
    if (!add){
      titleToShow = 'Retirar';
    }
    const balanceUser = this.homeService.getBalanceUserAuthorized();
    const modal = await this.modalCtrl.create({
      component: UserAmountComponent,
      cssClass:'app-user-amount',
      componentProps: { 
        balance: balanceUser.balance,
        title: titleToShow,
        addMoney: add
      },
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.amount){
      await this.loaderService.show();
      setTimeout(() => {
        this.updateUserBalance(add, data.amount); 
        this.loaderService.hide();
      }, 8000);
    }
  }

  updateUserBalance(add: boolean, amount: number ) {
    const balanceUser = this.homeService.getBalanceUserAuthorized();
    if (add) {
      balanceUser.balance = `${+balanceUser.balance + amount}`;
      this.homeService.saveBalanceUserAuthorized(balanceUser);
      return;
    }
    balanceUser.balance = `${+balanceUser.balance - amount}`;
    this.homeService.saveBalanceUserAuthorized(balanceUser);
  }

}
