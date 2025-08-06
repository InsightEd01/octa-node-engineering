import { 
  NewsletterSubscriber, 
  SubscriberFilters, 
  SubscriberListResponse, 
  SubscriberAnalytics,
  ExportOptions 
} from '../types/newsletter';

// Mock service - In a real app, this would connect to Supabase or another backend
class NewsletterService {
  private subscribers: NewsletterSubscriber[] = [];

  constructor() {
    // Generate mock subscriber data
    this.generateMockData();
  }

  private generateMockData() {
    const sources = ['website', 'blog', 'social-media', 'referral', 'event'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'example.org'];
    
    for (let i = 1; i <= 47; i++) {
      const subscribedDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
      const isUnsubscribed = Math.random() < 0.1; // 10% unsubscribed
      
      this.subscribers.push({
        id: `subscriber-${i}`,
        email: `user${i}@${domains[Math.floor(Math.random() * domains.length)]}`,
        status: isUnsubscribed ? 'unsubscribed' : 'active',
        subscribed_at: subscribedDate.toISOString(),
        unsubscribed_at: isUnsubscribed ? 
          new Date(subscribedDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : 
          undefined,
        source: sources[Math.floor(Math.random() * sources.length)],
        name: Math.random() > 0.3 ? `User ${i}` : undefined,
        preferences: {
          frequency: Math.random() > 0.5 ? 'weekly' : 'monthly',
          topics: ['updates', 'products', 'blog'].filter(() => Math.random() > 0.3)
        }
      });
    }

    // Sort by subscription date (newest first)
    this.subscribers.sort((a, b) => 
      new Date(b.subscribed_at).getTime() - new Date(a.subscribed_at).getTime()
    );
  }

  async getSubscribers(
    page: number = 1,
    limit: number = 10,
    filters: SubscriberFilters = { search: '', status: 'all', source: '' }
  ): Promise<SubscriberListResponse> {
    let filteredSubscribers = [...this.subscribers];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredSubscribers = filteredSubscribers.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchLower) ||
        subscriber.name?.toLowerCase().includes(searchLower) ||
        subscriber.source.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filteredSubscribers = filteredSubscribers.filter(subscriber =>
        subscriber.status === filters.status
      );
    }

    // Apply source filter
    if (filters.source) {
      filteredSubscribers = filteredSubscribers.filter(subscriber =>
        subscriber.source === filters.source
      );
    }

    // Apply date range filter
    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filteredSubscribers = filteredSubscribers.filter(subscriber => {
        const subDate = new Date(subscriber.subscribed_at);
        return subDate >= startDate && subDate <= endDate;
      });
    }

    // Calculate pagination
    const total = filteredSubscribers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      subscribers: paginatedSubscribers,
      total,
      page,
      limit,
      totalPages
    };
  }

  async getSubscriberById(id: string): Promise<NewsletterSubscriber | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.subscribers.find(subscriber => subscriber.id === id) || null;
  }

  async updateSubscriberStatus(id: string, status: 'active' | 'unsubscribed'): Promise<NewsletterSubscriber> {
    const subscriberIndex = this.subscribers.findIndex(s => s.id === id);
    if (subscriberIndex === -1) {
      throw new Error('Subscriber not found');
    }

    const subscriber = this.subscribers[subscriberIndex];
    subscriber.status = status;
    
    if (status === 'unsubscribed' && !subscriber.unsubscribed_at) {
      subscriber.unsubscribed_at = new Date().toISOString();
    } else if (status === 'active') {
      subscriber.unsubscribed_at = undefined;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return subscriber;
  }

  async bulkUpdateStatus(ids: string[], status: 'active' | 'unsubscribed'): Promise<void> {
    ids.forEach(id => {
      const subscriberIndex = this.subscribers.findIndex(s => s.id === id);
      if (subscriberIndex !== -1) {
        this.subscribers[subscriberIndex].status = status;
        if (status === 'unsubscribed' && !this.subscribers[subscriberIndex].unsubscribed_at) {
          this.subscribers[subscriberIndex].unsubscribed_at = new Date().toISOString();
        } else if (status === 'active') {
          this.subscribers[subscriberIndex].unsubscribed_at = undefined;
        }
      }
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async deleteSubscriber(id: string): Promise<void> {
    const subscriberIndex = this.subscribers.findIndex(s => s.id === id);
    if (subscriberIndex === -1) {
      throw new Error('Subscriber not found');
    }

    this.subscribers.splice(subscriberIndex, 1);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  async bulkDeleteSubscribers(ids: string[]): Promise<void> {
    this.subscribers = this.subscribers.filter(subscriber => !ids.includes(subscriber.id));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async getAnalytics(): Promise<SubscriberAnalytics> {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const total = this.subscribers.length;
    const active = this.subscribers.filter(s => s.status === 'active').length;
    const unsubscribed = this.subscribers.filter(s => s.status === 'unsubscribed').length;
    
    const thisMonthSubs = this.subscribers.filter(s => 
      new Date(s.subscribed_at) >= thisMonth
    ).length;
    
    const thisWeekSubs = this.subscribers.filter(s => 
      new Date(s.subscribed_at) >= thisWeek
    ).length;

    const lastMonthSubs = this.subscribers.filter(s => {
      const subDate = new Date(s.subscribed_at);
      return subDate >= lastMonth && subDate < thisMonth;
    }).length;

    const growthRate = lastMonthSubs > 0 ? 
      ((thisMonthSubs - lastMonthSubs) / lastMonthSubs) * 100 : 
      thisMonthSubs > 0 ? 100 : 0;

    // Calculate top sources
    const sourceCounts: { [key: string]: number } = {};
    this.subscribers.forEach(s => {
      sourceCounts[s.source] = (sourceCounts[s.source] || 0) + 1;
    });

    const topSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({
        source,
        count,
        percentage: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Generate subscription trend for last 30 days
    const subscriptionTrend = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      const subscriptions = this.subscribers.filter(s => 
        s.subscribed_at.split('T')[0] === dateStr
      ).length;
      
      const unsubscriptions = this.subscribers.filter(s => 
        s.unsubscribed_at && s.unsubscribed_at.split('T')[0] === dateStr
      ).length;

      subscriptionTrend.push({
        date: dateStr,
        subscriptions,
        unsubscriptions
      });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      total,
      active,
      unsubscribed,
      thisMonth: thisMonthSubs,
      thisWeek: thisWeekSubs,
      growthRate,
      topSources,
      subscriptionTrend
    };
  }

  async exportSubscribers(options: ExportOptions): Promise<string> {
    const { subscribers } = await this.getSubscribers(1, 1000, options.filters);
    
    if (options.format === 'csv') {
      return this.exportToCSV(subscribers, options.fields);
    } else {
      return this.exportToJSON(subscribers, options.fields);
    }
  }

  private exportToCSV(subscribers: NewsletterSubscriber[], fields: string[]): string {
    const headers = fields.join(',');
    const rows = subscribers.map(subscriber => {
      return fields.map(field => {
        let value = '';
        switch (field) {
          case 'email':
            value = subscriber.email;
            break;
          case 'name':
            value = subscriber.name || '';
            break;
          case 'status':
            value = subscriber.status;
            break;
          case 'source':
            value = subscriber.source;
            break;
          case 'subscribed_at':
            value = new Date(subscriber.subscribed_at).toLocaleDateString();
            break;
          case 'unsubscribed_at':
            value = subscriber.unsubscribed_at ? 
              new Date(subscriber.unsubscribed_at).toLocaleDateString() : '';
            break;
          default:
            value = '';
        }
        return `"${value.replace(/"/g, '""')}"`;
      }).join(',');
    });

    return [headers, ...rows].join('\n');
  }

  private exportToJSON(subscribers: NewsletterSubscriber[], fields: string[]): string {
    const filteredData = subscribers.map(subscriber => {
      const filtered: any = {};
      fields.forEach(field => {
        if (field in subscriber) {
          filtered[field] = subscriber[field as keyof NewsletterSubscriber];
        }
      });
      return filtered;
    });

    return JSON.stringify(filteredData, null, 2);
  }

  getSources(): string[] {
    const sources = [...new Set(this.subscribers.map(s => s.source))];
    return sources.sort();
  }
}

export const newsletterService = new NewsletterService();