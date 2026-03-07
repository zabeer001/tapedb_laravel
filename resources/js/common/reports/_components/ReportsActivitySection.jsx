import React from 'react';
import { Activity, Mail } from 'lucide-react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { formatNumber } from './reportFormatters';
import ReportTooltip from './ReportTooltip';

function ReportsActivitySection({ chartData, pieData, topContributors }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Editor Activity Graph</h2>
            <p className="text-sm text-base-content/60">
              Compare QA checked, pending QA, and total contribution per editor.
            </p>
          </div>
          <div className="badge badge-outline">Interactive</div>
        </div>

        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<ReportTooltip />} />
              <Legend />
              <Bar dataKey="qa_checked" name="QA Checked" radius={[10, 10, 0, 0]} />
              <Bar dataKey="not_qa" name="Pending QA" radius={[10, 10, 0, 0]} />
              <Bar dataKey="total" name="Total" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
          <div className="mb-4">
            <h2 className="text-xl font-black">QA Distribution</h2>
            <p className="text-sm text-base-content/60">
              Fast visual split between reviewed and pending entries.
            </p>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Tooltip content={<ReportTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-success/10 p-3 text-success">
              <Activity size={18} />
            </div>
            <div>
              <h2 className="text-xl font-black">Top Contributors</h2>
              <p className="text-sm text-base-content/60">Highest total work volume</p>
            </div>
          </div>

          <div className="space-y-3">
            {topContributors.length === 0 ? (
              <div className="rounded-2xl bg-base-200 p-4 text-sm text-base-content/65">
                No contributor data found.
              </div>
            ) : (
              topContributors.map((row, index) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-200 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{row.name}</p>
                      <p className="flex items-center gap-1 text-xs text-base-content/55">
                        <Mail size={12} />
                        {row.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black">{formatNumber(row.total)}</p>
                    <p className="text-xs text-base-content/55">{row.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportsActivitySection;
