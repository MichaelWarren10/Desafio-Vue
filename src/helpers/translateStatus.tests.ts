import { IStatus } from "@/modules/home/interfaces/transaction";
import { ITransaction } from "@/modules/home/interfaces/transaction";
import { translateStatus, getStatus } from "./translateStatus";

/**translateStatus tests */
describe("transactions-parse translateStatus", () => {
  it("should return success as true and text as Concluído", () => {
    const result = translateStatus({
      status: "created",
    } as ITransaction);
    const tag = {
      tag: {
        alert: false,
        info: false,
        success: true,
        text: "Concluído",
      },
    };
    expect(result).toEqual(tag);
  });

  it("should return alert as true and text as Processando", () => {
    const result = translateStatus({
      status: "processing",
    } as ITransaction);
    const tag = {
      tag: {
        alert: true,
        info: false,
        success: false,
        text: "Processando",
      },
    };
    expect(result).toEqual(tag);
  });

  it("should return alert as true and text as Agendado", () => {
    const result = translateStatus({
      status: "processed",
    } as ITransaction);
    const tag = {
      tag: {
        alert: false,
        info: true,
        success: false,
        text: "Agendado",
      },
    };
    expect(result).toEqual(tag);
  });
});

/**getStatus tests */
describe("transactions-parse getStatus", () => {
  it("should pass created as an argument and return Concluído", () => {
		const result = getStatus("created");

		expect(result).toBe('Concluído');
	});

	it("should pass processed as an argument and return Agendado", () => {
    const result = getStatus("processed");

    expect(result).toBe("Agendado");
  });

	it("should pass processing as an argument and return Processando", () => {
    const result = getStatus("processing");

    expect(result).toBe("Processando");
  });

	it("should pass null as an argument and return void string", () => {
    const result = getStatus("null" as IStatus);

    expect(result).toBe("");
  });

	it("should pass aaaaa as an argument and return void string", () => {
    const result = getStatus("aaaaa" as IStatus);

    expect(result).toBe("");
  });
});
