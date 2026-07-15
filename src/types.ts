export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  techStack: string[];
  estimatedTimeline: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  fullStory: string;
  tags: string[];
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
