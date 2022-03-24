import { ITransaction } from '@/modules/home/interfaces/transaction';
import { translateDate } from './translateDate';

/**translateDate tests */
describe('transactions-parse translateDate', () => {
  it('should pass 2020-05-12 as an argument and return date in 12/05/2020 format', () => {
    const result = translateDate({ date: '2020-05-12' } as ITransaction);

    expect(result).toBe('12/05/2020');
  });

  it('should pass 2005-08-03 as an argument and return date in 12/05/2020 format', () => {
    const result = translateDate({ date: '2005-08-03' } as ITransaction);

    expect(result).toBe('03/08/2005');
  });
});
