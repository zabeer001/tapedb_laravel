import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { TECHNOLOGY_BADGES } from './reportConstants';
import { formatNumber } from './reportFormatters';
import ReportTooltip from './ReportTooltip';

function ReportsHeroSection({ userRole, totalEntries, qaRate, chartData }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="badge badge-success gap-2 border-none px-4 py-4 text-success-content">
            <Sparkles size={14} />
            Now
          </div>
          <div className="badge badge-outline gap-2 px-4 py-4">
            <ShieldCheck size={14} />
            Platform System
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Reports Dashboard</h1>

        <p className="mt-2 text-sm leading-7 text-base-content/65 sm:text-base">
          Backend services, API layer, QA progress, title volume, and editor activity presented in a
          richer dashboard with interactive charts.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="badge badge-primary badge-outline px-4 py-4 uppercase">Signed in as {userRole}</div>
          <div className="badge badge-ghost px-4 py-4">{formatNumber(totalEntries)} total entries</div>
          <div className="badge badge-ghost px-4 py-4">{qaRate}% QA coverage</div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-base-300 bg-base-200/60 p-4 shadow-xl sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Performance Trend (X/Y)</p>
              <p className="text-xs text-base-content/55">Editor contribution overview by user and count</p>
            </div>
            <div className="badge badge-outline">Main Graph</div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<ReportTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total" stroke="currentColor" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="qa_checked" name="QA Checked" stroke="#22c55e" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="not_qa" name="Pending QA" stroke="#f59e0b" strokeWidth={2.2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      
      </div>
    </section>
  );
}

export default ReportsHeroSection;
