import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { UserAccountDetailComponent } from './user-account-detail/user-account-detail.component';
import { UserAmountComponent } from './user-amount/user-amount.component';
import { UserConceptComponent } from './user-concept/user-concept.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent,
    CreditCardComponent,
    UserAccountDetailComponent,
    UserAmountComponent,
    UserConceptComponent,
    UserLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    LoaderComponent,
    CreditCardComponent,
    UserAccountDetailComponent,
    UserAmountComponent,
    UserConceptComponent,
    UserLoginComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ComponentesModule { }
