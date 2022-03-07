export interface ITransaction {
  id: string;
  title: string;
  description: string;
  status: "created" | "processed" | "processing";
  amount: number;
  date: string;
  from: string;
}