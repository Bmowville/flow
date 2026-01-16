import { formatRelativeTime } from "@/lib/utils";

export const workspaces = [
  { id: "ws-1", name: "SignalBoard HQ", role: "Owner" },
  { id: "ws-2", name: "Recruiting Ops", role: "Admin" },
  { id: "ws-3", name: "Growth Lab", role: "Member" },
];

export const widgets = [
  {
    id: "widget-1",
    title: "GitHub Pulse",
    status: "healthy",
    value: "47 commits",
    description: "8 repos updated in the last 24h",
    trend: "+18%",
  },
  {
    id: "widget-2",
    title: "Calendar Focus",
    status: "attention",
    value: "21h deep work",
    description: "3 blocks need rescheduling",
    trend: "-6%",
  },
  {
    id: "widget-3",
    title: "Recruiter Outreach",
    status: "healthy",
    value: "12 follow-ups",
    description: "2 high-priority messages due",
    trend: "+9%",
  },
  {
    id: "widget-4",
    title: "Launch Metrics",
    status: "healthy",
    value: "$18.4k ARR",
    description: "+4 paid teams this week",
    trend: "+12%",
  },
];

export const timeline = [
  {
    id: "tl-1",
    title: "GitHub sync complete",
    detail: "Merged 3 PRs across 2 repos",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 12)),
    label: "Engineering",
  },
  {
    id: "tl-2",
    title: "Recruiter pipeline refreshed",
    detail: "5 new inbound messages triaged",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 45)),
    label: "Recruiting",
  },
  {
    id: "tl-3",
    title: "Calendar optimized",
    detail: "Protected 2 focus blocks",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 110)),
    label: "Productivity",
  },
  {
    id: "tl-4",
    title: "Portfolio shared",
    detail: "Sent SignalBoard demo to 4 recruiters",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 220)),
    label: "Outreach",
  },
];

export const integrations = [
  {
    id: "int-1",
    name: "GitHub",
    status: "Connected",
    detail: "Last synced 4 minutes ago",
  },
  {
    id: "int-2",
    name: "LinkedIn",
    status: "Needs review",
    detail: "Re-authentication recommended",
  },
  {
    id: "int-3",
    name: "Google Calendar",
    status: "Connected",
    detail: "Calendar blocks updated",
  },
  {
    id: "int-4",
    name: "Notion",
    status: "Queued",
    detail: "Sync scheduled for tonight",
  },
];

export const tasks = [
  {
    id: "task-1",
    title: "Polish resume narrative",
    detail: "Align outcomes with recruiter feedback",
    due: "Today 5:00 PM",
  },
  {
    id: "task-2",
    title: "Record product walkthrough",
    detail: "Capture 90-second demo clip",
    due: "Tomorrow 11:00 AM",
  },
  {
    id: "task-3",
    title: "Schedule networking follow-ups",
    detail: "Send 5 personalized messages",
    due: "Fri 2:00 PM",
  },
];
