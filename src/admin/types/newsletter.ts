export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribed_at: string;
  unsubscribed_at?: string;
  source: string;
  name?: string;
  preferences?: {
    frequency: 'weekly' | 'monthly';
    topics: string[];
  };
}

export interface SubscriberFilters {
  search: string;
  status: 'all' | 'active' | 'unsubscribed';
  source: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SubscriberListResponse {
  subscribers: NewsletterSubscriber[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubscriberAnalytics {
  total: number;
  active: number;
  unsubscribed: number;
  thisMonth: number;
  thisWeek: number;
  growthRate: number;
  topSources: Array<{
    source: string;
    count: number;
    percentage: number;
  }>;
  subscriptionTrend: Array<{
    date: string;
    subscriptions: number;
    unsubscriptions: number;
  }>;
}

export interface ExportOptions {
  format: 'csv' | 'json';
  fields: string[];
  filters: SubscriberFilters;
}