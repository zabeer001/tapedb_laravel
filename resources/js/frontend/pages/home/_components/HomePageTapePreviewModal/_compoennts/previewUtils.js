export const IMAGE_FIELDS = ["img1", "img2", "img3", "img4", "img5", "img6"];

export function toDisplayText(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  const normalized = value.toString().trim();
  return normalized || "—";
}

export function toImageUrl(path) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `/storage/${path}`;
}

export function isTruthyFlag(value) {
  if (value === null || value === undefined) {
    return false;
  }

  const normalized = value.toString().trim().toLowerCase();
  return ["1", "true", "yes", "y"].includes(normalized);
}

export function getTapeTitle(previewTape, previewTapeId) {
  return (
    previewTape?.title?.trim() ||
    previewTape?.name?.trim() ||
    `Tape #${toDisplayText(previewTapeId)}`
  );
}

export function buildPreviewDetails(previewTape) {
  if (!previewTape) {
    return [];
  }

  return [
    { label: "Title", value: previewTape.title || previewTape.name },
    { label: "Year", value: previewTape.year },
    { label: "Distributor", value: previewTape.distributor },
    { label: "Case Type", value: previewTape.case_desc },
    { label: "Seal", value: previewTape.seal },
    { label: "Sticker", value: previewTape.sticker },
    { label: "Watermarks", value: previewTape.watermarks },
    { label: "Etching", value: previewTape.etching },
    { label: "Guard Color", value: previewTape.guard_color },
    { label: "UPC", value: previewTape.upc },
    { label: "Created At", value: previewTape.created_at },
    { label: "Notes", value: previewTape.notes },
  ];
}

export function buildImageItems(previewTape) {
  if (!previewTape) {
    return [];
  }

  return IMAGE_FIELDS.map((field) => ({
    field,
    src: toImageUrl(previewTape[field]),
  })).filter((item) => Boolean(item.src));
}
