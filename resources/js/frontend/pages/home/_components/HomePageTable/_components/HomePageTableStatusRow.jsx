import React from "react";

export default function HomePageTableStatusRow({
  title,
  subtitle,
  actionLabel,
  onAction,
  showSpinner = false,
}) {
  return (
    <tr>
      <td colSpan={12}>
        <div className="p-8 flex flex-col items-center gap-2">
          {showSpinner ? <span className="loading loading-spinner loading-md"></span> : null}
          <div className="text-lg font-bold">{title}</div>
          {subtitle ? <div className="text-sm text-base-content/70">{subtitle}</div> : null}
          {actionLabel && onAction ? (
            <button className="btn btn-ghost btn-sm" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
