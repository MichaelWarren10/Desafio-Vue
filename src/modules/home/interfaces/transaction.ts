export interface ITransaction {
  id: string;
  title: string;
  description: string;
  status: IStatus;
  amount: number;
  date: string;
  from: string;
	to: string;
}

export type IStatus =	"created" | "processed" | "processing";