export interface EventPayload {
  eventType: string;
  data: any;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class EventGridAdapter {
  private static instance: EventGridAdapter;
  private subscribers: Map<string, Array<(payload: EventPayload) => void>>;

  private constructor() {
    this.subscribers = new Map();
  }

  static getInstance(): EventGridAdapter {
    if (!EventGridAdapter.instance) {
      EventGridAdapter.instance = new EventGridAdapter();
    }
    return EventGridAdapter.instance;
  }

  subscribe(eventType: string, callback: (payload: EventPayload) => void): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(callback);
  }

  async publish(eventType: string, data: any, metadata?: Record<string, any>): Promise<void> {
    const payload: EventPayload = {
      eventType,
      data,
      timestamp: new Date(),
      metadata,
    };

    const subscribers = this.subscribers.get(eventType);

    if (subscribers && subscribers.length > 0) {
      for (const subscriber of subscribers) {
        try {
          await subscriber(payload);
        } catch (error) {
          console.error(`Error in event subscriber for ${eventType}:`, error);
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📡 Event published: ${eventType}`, {
        subscriberCount: subscribers?.length || 0,
        timestamp: payload.timestamp,
      });
    }
  }

  unsubscribe(eventType: string, callback: (payload: EventPayload) => void): void {
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      const index = subscribers.indexOf(callback);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    }
  }

  clearSubscribers(eventType?: string): void {
    if (eventType) {
      this.subscribers.delete(eventType);
    } else {
      this.subscribers.clear();
    }
  }
}

export const eventGridAdapter = EventGridAdapter.getInstance();
