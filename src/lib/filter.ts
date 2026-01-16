export function matchesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

export function filterByQuery<T>(items: T[], query: string, fields: (keyof T)[]) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return items;
  return items.filter((item) =>
    fields.some((field) => {
      const value = String(item[field] ?? "").toLowerCase();
      return value.includes(trimmed);
    })
  );
}
