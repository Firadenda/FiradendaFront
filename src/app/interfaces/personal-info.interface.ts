import { CreditCard } from './credit-card.interface';

export interface PersonalInfo {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  creditCard: CreditCard;
}
