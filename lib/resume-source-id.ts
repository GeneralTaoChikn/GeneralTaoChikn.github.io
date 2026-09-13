// Shared anchors keep search results and rendered résumé items in sync.
export function resumeSourceId(kind: string, label: string) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `resume-${kind}-${slug}`;
}
