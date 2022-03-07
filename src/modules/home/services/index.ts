import { Api } from '@/services/api';
import { ITransaction } from '../interfaces/transaction';

export class HomeService extends Api {
  public baseUrl = "https://warren-transactions-api.herokuapp.com/api";

  constructor() {
    super();
  }

  public getTransactions(): Promise<ITransaction[]> {
    return this.get(`${this.baseUrl}/transactions`);
  }
}