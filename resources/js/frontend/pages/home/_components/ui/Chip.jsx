import React from "react";

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

export default function Chip({ children, tone = "neutral" }) {
  const map = {
    neutral: "badge-ghost",
    success: "badge-success",
    warning: "badge-warning",
    info: "badge-info",
  };

  return <span className={classNames("badge badge-sm", map[tone])}>{children}</span>;
}
