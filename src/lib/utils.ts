import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date) {
  const diff = date.getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  if (Math.abs(minutes) < 60) {
    return `${Math.abs(minutes)}m ${minutes <= 0 ? "ago" : "from now"}`;
  }
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) {
    return `${Math.abs(hours)}h ${hours <= 0 ? "ago" : "from now"}`;
  }
  const days = Math.round(hours / 24);
  return `${Math.abs(days)}d ${days <= 0 ? "ago" : "from now"}`;
}
