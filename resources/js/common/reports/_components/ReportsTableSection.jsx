import React from 'react';
import { formatNumber } from './reportFormatters';

function ReportsTableSection({ rows, qaRate }) {
  return (
    <section className="rounded-[2rem] border border-base-300 bg-base-100 shadow-xl">
      <div className="border-b border-base-300 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black">Editor Report Table</h2>
            <p className="text-sm text-base-content/60">Full detailed report for all editors and admins.</p>
          </div>

          <div className="stats stats-horizontal border border-base-300 bg-base-200 shadow-sm">
            <div className="stat px-5 py-3">
              <div className="stat-title">Contributors</div>
              <div className="stat-value text-xl">{formatNumber(rows.length)}</div>
            </div>
            <div className="stat px-5 py-3">
              <div className="stat-title">QA Rate</div>
              <div className="stat-value text-xl">{qaRate}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="table table-zebra">
          <thead>
            <tr className="text-xs uppercase tracking-[0.16em] text-base-content/55">
              <th>Editor</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">QA Checked</th>
              <th className="text-right">Pending QA</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-base-content/70">
                  No report rows found.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-2xl bg-primary/10 text-primary">
                          {row.avatar_url ? (
                            <img
                              src={row.avatar_url}
                              alt={`${row.name || 'User'} avatar`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="font-bold">{(row.name || 'U').charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{row.name}</div>
                        <div className="text-xs text-base-content/50">Team member</div>
                      </div>
                    </div>
                  </td>
                  <td>{row.email}</td>
                  <td>
                    <span className="badge badge-outline capitalize">{row.role}</span>
                  </td>
                  <td className="text-right font-semibold">{formatNumber(row.qa_checked)}</td>
                  <td className="text-right font-semibold">{formatNumber(row.not_qa)}</td>
                  <td className="text-right text-base font-black">{formatNumber(row.total)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 lg:hidden">
        {rows.length === 0 ? (
          <div className="rounded-3xl bg-base-200 p-8 text-center text-base-content/70">No report rows found.</div>
        ) : (
          rows.map((row) => (
            <article key={row.id} className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-2xl bg-primary/10 text-primary">
                      {row.avatar_url ? (
                        <img
                          src={row.avatar_url}
                          alt={`${row.name || 'User'} avatar`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-bold">{(row.name || 'U').charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{row.name}</h3>
                    <p className="text-xs text-base-content/60">{row.email}</p>
                  </div>
                </div>

                <div className="badge badge-outline capitalize">{row.role}</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-base-200 p-3 text-center">
                  <p className="text-xs uppercase tracking-wider text-base-content/50">QA</p>
                  <p className="mt-1 text-lg font-black">{formatNumber(row.qa_checked)}</p>
                </div>
                <div className="rounded-2xl bg-base-200 p-3 text-center">
                  <p className="text-xs uppercase tracking-wider text-base-content/50">Pending</p>
                  <p className="mt-1 text-lg font-black">{formatNumber(row.not_qa)}</p>
                </div>
                <div className="rounded-2xl bg-base-200 p-3 text-center">
                  <p className="text-xs uppercase tracking-wider text-base-content/50">Total</p>
                  <p className="mt-1 text-lg font-black">{formatNumber(row.total)}</p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default ReportsTableSection;
