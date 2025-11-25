import type { Alert, AlertsQueryParams, PagedAlerts } from '../types/alert';

const LATENCY_MIN = 200;
const LATENCY_MAX = 600;

const severities: Alert['severity'][] = ['low', 'medium', 'high', 'critical'];
const statuses: Alert['status'][] = ['open', 'investigating', 'resolved'];
const sources = ['EDR', 'SIEM', 'Cloud', 'Email Gateway', 'Identity'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() - days);
  return d;
}

// Generate a deterministic in-memory list of alerts
const alertsData: Alert[] = Array.from({ length: 80 }).map((_, idx) => {
  const createdAt = addDays(new Date(), Math.floor(Math.random() * 14));
  return {
    id: String(idx + 1),
    title: `Alert #${idx + 1}: ${randomChoice([
      'Suspicious login',
      'Malware detected',
      'Privilege escalation',
      'Unusual data transfer',
      'Configuration change',
    ])}`,
    severity: randomChoice(severities),
    status: randomChoice(statuses),
    createdAt: createdAt.toISOString(),
    source: randomChoice(sources),
    description:
      'Automatically generated alert used for demonstrating filtering, sorting, and pagination.',
    labels: [],
  };
});

// In-memory store for labels per alert to simulate a backend
const labelsStore: Record<string, string[]> = {};

function delay(): Promise<void> {
  const ms = LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyFilters(list: Alert[], params: AlertsQueryParams): Alert[] {
  const { severities: sev, statuses: sts, search } = params.filters;
  return list.filter((a) => {
    const matchesSeverity = sev.length === 0 || sev.includes(a.severity);
    const matchesStatus = sts.length === 0 || sts.includes(a.status);
    const term = search.trim().toLowerCase();
    const matchesSearch =
      term.length === 0 ||
      a.title.toLowerCase().includes(term) ||
      a.description.toLowerCase().includes(term) ||
      a.source.toLowerCase().includes(term);
    return matchesSeverity && matchesStatus && matchesSearch;
  });
}

function applySort(list: Alert[], params: AlertsQueryParams): Alert[] {
  const { sortField, sortDirection } = params;
  const sorted = [...list].sort((a, b) => {
    if (sortField === 'createdAt') {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortDirection === 'asc' ? da - db : db - da;
    }
    const order = ['low', 'medium', 'high', 'critical'];
    const sa = order.indexOf(a.severity);
    const sb = order.indexOf(b.severity);
    return sortDirection === 'asc' ? sa - sb : sb - sa;
  });
  return sorted;
}

export async function fetchAlerts(params: AlertsQueryParams): Promise<PagedAlerts> {
  await delay();
  const filtered = applyFilters(alertsData, params);
  const sorted = applySort(filtered, params);
  const start = (params.page - 1) * params.pageSize;
  const items = sorted.slice(start, start + params.pageSize);
  return {
    items,
    total: filtered.length,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export async function fetchAlertById(id: string): Promise<Alert | null> {
  await delay();
  const alert = alertsData.find((a) => a.id === id) ?? null;
  if (!alert) return null;

  const storedLabels = labelsStore[id];
  return {
    ...alert,
    labels: storedLabels ?? alert.labels,
  };
}

export async function fetchAlertLabels(id: string): Promise<string[]> {
  await delay();
  if (!labelsStore[id]) {
    const base = alertsData.find((a) => a.id === id);
    labelsStore[id] = base?.labels ? [...base.labels] : [];
  }
  return [...labelsStore[id]];
}

export async function updateAlertLabels(id: string, labels: string[]): Promise<string[]> {
  await delay();
  labelsStore[id] = [...labels];
  return [...labelsStore[id]];
}
