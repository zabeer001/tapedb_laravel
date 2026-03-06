const EMPTY_TEXT = "—";

function toDisplayText(value) {
  return value?.toString().trim() || EMPTY_TEXT;
}

function hasValue(value) {
  return value !== null && value !== undefined && value.toString().trim() !== "";
}

function buildImagePath(path) {
  if (!hasValue(path)) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `/storage/${path}`;
}

export function mapTapeToRow(tape) {
  return {
    id: tape.id,
    poster: buildImagePath(tape.img1),
    title: toDisplayText(tape.title || tape.name),
    year: toDisplayText(tape.year),
    distributor: toDisplayText(tape.distributor),
    seal: toDisplayText(tape.seal),
    sticker: toDisplayText(tape.sticker),
    waterMarks: toDisplayText(tape.watermarks),
    guardColor: toDisplayText(tape.guard_color),
    upc: toDisplayText(tape.upc),
    etching: toDisplayText(tape.etching),
    qa: hasValue(tape.qa_checked),
    qaLabel: toDisplayText(tape.qa_checked),
    firstPrint: hasValue(tape.first_printer),
    firstPrintLabel: toDisplayText(tape.first_printer),
  };
}
