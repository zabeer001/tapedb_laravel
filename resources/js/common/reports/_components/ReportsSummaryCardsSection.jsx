import React from 'react';
import { SUMMARY_CARDS } from './reportConstants';
import { formatNumber } from './reportFormatters';

function ReportsSummaryCardsSection({ summary }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5">
      {SUMMARY_CARDS.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.key}
            className="group rounded-[1.75rem] border border-base-300 bg-base-100 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon size={20} strokeWidth={2.2} />
              </div>
            
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/55">{card.label}</p>
            <h3 className="mt-2 break-words text-3xl font-black tracking-tight sm:text-4xl">
              {formatNumber(summary[card.key])}
            </h3>
            <p className="mt-2 text-sm leading-6 text-base-content/65">{card.description}</p>
          </article>
        );
      })}
    </section>
  );
}

export default ReportsSummaryCardsSection;
