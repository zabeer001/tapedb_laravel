import React, { useEffect, useMemo, useState } from 'react';
import { XCircle } from 'lucide-react';
import { fetchReportStats } from './api/reportApi';
import ReportsHeroSection from './_components/ReportsHeroSection';
import ReportsLoadingSection from './_components/ReportsLoadingSection';
import ReportsActivitySection from './_components/ReportsActivitySection';
import ReportsSummaryCardsSection from './_components/ReportsSummaryCardsSection';
import ReportsTableSection from './_components/ReportsTableSection';

function ReportsPage() {
  const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({});
  const [rows, setRows] = useState([]);
  const [graphRows, setGraphRows] = useState([]);
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      setError('');

      try {
        const payload = await fetchReportStats();
        setSummary(payload?.data?.summary || {});
        setRows(Array.isArray(payload?.data?.editor_stats) ? payload.data.editor_stats : []);
        setGraphRows(
          Array.isArray(payload?.data?.graph_contributors)
            ? payload.data.graph_contributors
            : []
        );
        setTopContributors(
          Array.isArray(payload?.data?.top_contributors) ? payload.data.top_contributors : []
        );
      } catch (err) {
        setError(err.message || 'Failed to load reports.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const qaRate = useMemo(() => {
    const total = Number(summary.total_entries || 0);
    const checked = Number(summary.qa_checked || 0);

    if (!total) {
      return 0;
    }

    return Math.round((checked / total) * 100);
  }, [summary]);

  const chartData = useMemo(() => {
    return graphRows.map((row) => ({
      name: row.name?.split(' ')[0] || 'User',
      fullName: row.name,
      qa_checked: Number(row.qa_checked || 0),
      not_qa: Number(row.not_qa || 0),
      total: Number(row.total || 0),
    }));
  }, [graphRows]);

  const pieData = useMemo(() => {
    return [
      { name: 'QA Checked', value: Number(summary.qa_checked || 0) },
      { name: 'Pending QA', value: Number(summary.not_qa_checked || 0) },
    ];
  }, [summary]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[110rem] space-y-4 px-3 py-4 sm:space-y-6 sm:px-5 sm:py-6 lg:px-6">
        <ReportsHeroSection
          userRole={userRole}
          totalEntries={summary.total_entries}
          qaRate={qaRate}
          chartData={chartData}
        />

        {error ? (
          <div className="alert alert-error rounded-2xl shadow-md">
            <XCircle size={18} />
            <span>{error}</span>
          </div>
        ) : null}

        {isLoading ? <ReportsLoadingSection /> : null}

        {!isLoading && !error ? (
          <>
            <ReportsActivitySection
              chartData={chartData}
              pieData={pieData}
              topContributors={topContributors}
            />
            <ReportsSummaryCardsSection summary={summary} />
            <ReportsTableSection rows={rows} qaRate={qaRate} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReportsPage;
