export type WorkspaceSummary = {
  id: string;
  name: string;
  role: string;
};

export type Widget = {
  id: string;
  title: string;
  type: string;
  status: string;
  value: string;
  description: string;
  trend: string;
  position: number;
};

export type Task = {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
  dueAt: string | null;
  createdAt: string;
};

export type Activity = {
  id: string;
  title: string;
  detail: string;
  type: string;
  createdAt: string;
};

export type Integration = {
  id: string;
  name: string;
  status: string;
  lastSyncedAt: string | null;
};

export type PipelineRole = {
  id: string;
  title: string;
  company: string;
  stage: string;
  priority: string;
  createdAt: string;
};

export type FocusBlock = {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  notes: string;
};

export type Automation = {
  id: string;
  title: string;
  description: string;
  status: string;
};
