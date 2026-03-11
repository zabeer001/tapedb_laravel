const EMPTY_TEXT = "—";

function toDisplayText(value) {
  return value?.toString().trim() || EMPTY_TEXT;
}

function hasValue(value) {
  return value !== null && value !== undefined && value.toString().trim() !== "";
}

function toBooleanFlag(value) {
  if (!hasValue(value)) {
    return false;
  }

  const normalized = value.toString().trim().toLowerCase();
  return ["1", "true", "yes", "y"].includes(normalized);
}

function buildImagePath(path) {
  if (!hasValue(path)) {
    return null;
  }

  return path;
}

export function mapTapeToRow(tape) {
  return {
    id: tape.id,
    poster: buildImagePath(tape.img1_url || tape.img1),
    title: toDisplayText(tape.title || tape.name),
    year: toDisplayText(tape.year),
    distributor: toDisplayText(tape.distributor),
    seal: toDisplayText(tape.seal),
    sticker: toDisplayText(tape.sticker),
    waterMarks: toDisplayText(tape.watermarks),
    guardColor: toDisplayText(tape.guard_color),
    upc: toDisplayText(tape.upc),
    etching: toDisplayText(tape.etching),
    qa: toBooleanFlag(tape.qa_checked),
    qaLabel: toDisplayText(tape.qa_checked),
    firstPrint: toBooleanFlag(tape.first_printer),
    firstPrintLabel: toDisplayText(tape.first_printer),
    screener: toBooleanFlag(tape.screener),
    screenerLabel: toDisplayText(tape.screener),
  };
}
