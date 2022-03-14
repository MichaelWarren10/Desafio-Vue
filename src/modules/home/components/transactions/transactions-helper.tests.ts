import { IDropdown } from './../../interfaces/dropdown-options';
import * as helper from './transactions-helper';
import { mockTransaction } from './../../mocks/mock-transactions';

describe('transactions-helper', () => {
	describe('searchFilter function', () => {
		it('should return 2 with from elemen equals to Trade', () => {
			const result = helper.searchFilter("trade", mockTransaction);

			expect(result).toHaveLength(2)
		});

		it("should return 3 with from elemen equals to Aposentadoria", () => {
      const result = helper.searchFilter("apo", mockTransaction);

      expect(result).toHaveLength(3);
    });

		it("should return 4 with from elemen equals to Férias", () => {
      const result = helper.searchFilter("fé", mockTransaction);

      expect(result).toHaveLength(4);
    });

		it("should return 2 with from elemen equals to Conta Warren", () => {
      const result = helper.searchFilter("con", mockTransaction);

      expect(result).toHaveLength(2);
    });
	});

	describe("checkboxFilter function", () => {
		it('should return 4 elements with created', () => {
			const selectedOptions = [
				{
					text: 'Concluído',
					argument: 'created',
					checked: true
				}
			]
			const result = helper.checkboxFilter(selectedOptions, mockTransaction);
			expect(result).toHaveLength(4);
		});

		it("should return 4 elements with processing", () => {
      const selectedOptions = [
        {
          text: "Processando",
          argument: "processing",
          checked: true,
        },
      ];
      const result = helper.checkboxFilter(selectedOptions, mockTransaction);
      expect(result).toHaveLength(4);
    });

		it("should return 3 elements with processed", () => {
      const selectedOptions = [
        {
          text: "Agendado",
          argument: "processed",
          checked: true,
        },
      ];
      const result = helper.checkboxFilter(selectedOptions, mockTransaction);
      expect(result).toHaveLength(3);
    });

		it("should return all transactions passed as an argument since that has any option selected", () => {
			const selectedOptions = [] as IDropdown[];
      const result = helper.checkboxFilter(selectedOptions, mockTransaction); 

      expect(result).toHaveLength(11);
		});
	});

	describe("combinedFilter function", () => {
		it('should return 1 element equals to aposentadoria + created', () => {
			const selectedOptions = [{
				text: 'Concluído',
				argument: 'created',
				checked: true
			}]
			const result = helper.combinedFilter(selectedOptions, mockTransaction, 'Apo');
			expect(result).toHaveLength(1);
		});

		it("should return 1 element equals to aposentadoria + processed", () => {
      const selectedOptions = [
        {
          text: "Agendado",
          argument: "processed",
          checked: true,
        },
      ];
      const result = helper.combinedFilter(
        selectedOptions,
        mockTransaction,
        "Apo"
      );
      expect(result).toHaveLength(1);
    });

		it("should return 1 element equals to aposentadoria + processing", () => {
      const selectedOptions = [
        {
          text: "Processado",
          argument: "processing",
          checked: true,
        },
      ];
      const result = helper.combinedFilter(
        selectedOptions,
        mockTransaction,
        "Apo"
      );
      expect(result).toHaveLength(1);
    });
	});
});