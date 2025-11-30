import React from "react";

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  return (
    <table className="w-full text-white border-separate border-spacing-y-2">
      <thead>
        <tr className="text-slate-300 text-left">
          <th>Title</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id} className="bg-white/10 rounded-xl">
            <td className="px-2 py-1">{t.title}</td>
            <td className="px-2 py-1">{t.category}</td>
            <td className="px-2 py-1">${t.amount}</td>
            <td className="px-2 py-1">{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
