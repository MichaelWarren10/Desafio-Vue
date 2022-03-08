import { convertNumbertoBrazilian } from "./convertNumber";

/**translateAmount tests */
describe("transactions-parse translateAmount", () => {
  it("should pass 2150.67 as an argument and return R$ 2.150,67", () => {
    const result = convertNumbertoBrazilian(2150.67);

    expect(result).toBe("R$\xa02.150,67");
  });

  it("should pass 235 as an argument and return R$ 235,00", () => {
    const result = convertNumbertoBrazilian(235);

    expect(result).toBe("R$\xa0235,00");
  });

  it("should pass 1 as an argument and return R$ 1,00", () => {
    const result = convertNumbertoBrazilian(1);

    expect(result).toBe("R$\xa01,00");
  });

  it("should pass 0.5 as an argument and return R$ 0,50", () => {
    const result = convertNumbertoBrazilian(0.5);

    expect(result).toBe("R$\xa00,50");
  });
});
