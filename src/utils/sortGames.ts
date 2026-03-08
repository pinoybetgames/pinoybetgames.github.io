// Utility to sort collection entries (games) by weightage then title
export function sortGamesByWeightThenTitle(games: any[]) {
  return [...games].sort((a, b) => {
    const wa = Number(a?.data?.weightage ?? 1);
    const wb = Number(b?.data?.weightage ?? 1);
    if (wb !== wa) return wb - wa; // higher weight first
    const ta = String(a?.data?.title ?? '');
    const tb = String(b?.data?.title ?? '');
    return ta.localeCompare(tb);
  });
}
