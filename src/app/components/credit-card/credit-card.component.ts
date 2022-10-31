import { Attribute, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreditCardComponent implements OnInit {


  constructor(
    @Attribute('lastNumberCard') public lastNumberCard: string = '1234',
    @Attribute('userName') public userName: string = 'EUSEBIO TOMAS CRUZ',
  ) { }

  ngOnInit() { }

}
