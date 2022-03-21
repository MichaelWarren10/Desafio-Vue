export interface ITransaction {
  id: string;
  title: string;
  description: string;
  status: IStatus;
  amount: number;
  date: string;
  from: string;
  to: string;
  _hash: string;
}

export type IStatus =	"created" | "processed" | "processing";