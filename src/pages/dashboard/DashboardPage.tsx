import StatsCard from "@/components/common/Card/StatsCard";
import { TrendsChart } from "@/components/common/charts/TrendsChart";

import { Card, CardContent } from "@/components/ui/card";
import { dashboardService } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const { data: summary } = useQuery({
    queryKey: ["monthlySummary", month, year],
    queryFn: () => dashboardService.getMonthlySummary(month, year),
  });

  const { data: spending } = useQuery({
    queryKey: ["spendingByCategory", month, year],
    queryFn: () => dashboardService.getSpendingByCategory(month, year),
  });

  const { data: trends } = useQuery({
    queryKey: ["trends", 12],
    queryFn: () => dashboardService.getTrends(12),
  });

  return (
    <div className="p-6 min-h-screen bg-[#0A2540]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Income"
          value={`$${summary?.totalIncome || 0}`}
          icon="💰"
        />
        <StatsCard
          title="Total Expenses"
          value={`$${summary?.totalExpense || 0}`}
          icon="💸"
        />
        <StatsCard
          title="Savings"
          value={`$${summary?.savings || 0}`}
          icon="🤑"
        />
      </div>

      <div className="mb-8">
        <div className="w-full">
          <h2 className="text-white font-semibold mb-4">
            Spending by Category
          </h2>
          <Card className="bg-white/10 backdrop-blur-xl rounded-2xl">
            <CardContent>
              {spending?.map((s) => (
                <div
                  key={s.categoryName}
                  className="flex justify-between text-white py-1"
                >
                  <span>{s.categoryName}</span>
                  <span>${s.amount}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full">
          <h2 className="text-white font-semibold mb-4">Monthly Trends</h2>
          <TrendsChart data={trends} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
