export async function fetchNextTape(currentTapeId) {
  const response = await fetch("/api/next-tape", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: currentTapeId }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return {
    id: payload?.data?.id ?? null,
    message: payload?.message || "",
  };
}

export async function fetchPreviousTape(currentTapeId) {
  const response = await fetch("/api/previous-tape", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: currentTapeId }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return {
    id: payload?.data?.id ?? null,
    message: payload?.message || "",
  };
}
