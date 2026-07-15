import { Service, CaseStudy } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'Custom, responsive, and high-performance websites built for your brand.',
    iconName: 'Globe',
    details: [
      'Responsive design optimized for all screen heights and widths',
      'High-speed static and dynamic server rendering (Next.js / Vite)',
      'SEO audit and setup for maximum organic visibility',
      'Integrated CMS (Sanity / Contentful) for effortless content updates',
      'Elegant, handcrafted micro-animations for high-end user engagement'
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    estimatedTimeline: '3-5 weeks'
  },
  {
    id: 'app-dev',
    title: 'Application Development',
    description: 'Scalable mobile and web applications designed for seamless user experiences.',
    iconName: 'Cpu',
    details: [
      'Full-stack architecture designed for extreme scalability',
      'Secure authentication structures (OAuth, Firebase, Auth0)',
      'State management (Zustand, Redux) for flawless offline operation',
      'Custom API integrations and RESTful or GraphQL endpoints',
      'Stripe checkout integration and subscription flow modeling'
    ],
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Zustand', 'React Native'],
    estimatedTimeline: '6-10 weeks'
  },
  {
    id: 'automation-dev',
    title: 'Automation Development',
    description: 'Intelligent workflows and custom scripts to streamline your business operations.',
    iconName: 'Settings',
    details: [
      'Webhook integrations connecting all your software tools (Zapier / Make / n8n)',
      'Custom Puppeteer/Playwright scripts for repetitive browser actions',
      'AI-enhanced classification models for email, PDF, or document processing',
      'Automated slack/discord notification streams triggered by key events',
      'Database migration routines and secure backup procedures'
    ],
    techStack: ['Python', 'Node.js', 'Zapier', 'n8n', 'Gemini API', 'AWS Lambda'],
    estimatedTimeline: '2-4 weeks'
  }
];

export const EXPERTISE_SOLUTIONS = [
  {
    id: 'tech-strategy',
    title: 'Technical Strategy',
    description: 'We architect scalable foundations for your web and mobile platforms, ensuring long-term performance and security.',
    iconName: 'Layout',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa9ex83-2DPeGTDfI2II-12pTwnPMgJ7QSjbAOIysW_Jwx9cbBYGd6Yhl8snVw8784adMVOYN7esDTm0eId1ZlOGX8D63-BGdYXJXktpoMn8SwmKTPQ5OZgjYApdKxdBzMP6BV47X2yvWAR617MXoWWz5uUBa9V25K-nVI_YCkeY6N9zy3MvGsJIzEdyMIsb04j11O_bVazhFUjCXFZWcf67erWB-WpqXoa2m-wRdVdiTDusY88-SOg1hfc3xIDMqglEwq-XickEP6',
    bullets: [
      'System design and robust infrastructure blueprint development',
      'Technology stack audits for performance and cost reduction',
      'Security posture review and data compliance architecture'
    ]
  },
  {
    id: 'intelligent-app',
    title: 'Intelligent App Development',
    description: 'Embedding advanced AI and machine learning models directly into your applications to automate complex user interactions.',
    iconName: 'Brain',
    bullets: [
      'Gemini API integration for real-time document summarization and analysis',
      'Autonomous client chat assistants capable of parsing complex queries',
      'Classification algorithms that automatically organize raw incoming data streams'
    ]
  },
  {
    id: 'biz-automation',
    title: 'Business Process Automation',
    description: 'Streamlining your internal operations through custom-built automation scripts and integrated software workflows.',
    iconName: 'Network',
    bullets: [
      'Multi-app workflow bridging CRM, email, accounting, and task managers',
      'Automatic generation of invoices, client reports, and visual PDFs',
      'Trigger-based notifications keeping entire teams aligned instantly'
    ]
  },
  {
    id: 'performance-maintenance',
    title: 'Performance & Maintenance',
    description: 'Continuous optimization and support to ensure your digital platforms remain fast, secure, and fully operational.',
    iconName: 'Activity',
    bullets: [
      '24/7 uptime checks and real-time status notifications',
      'Automated performance profiling and database indexing reviews',
      'Regular security patch management and third-party library updates'
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'retail-sync',
    title: 'E-commerce Automation Masterclass',
    client: 'Apex Retailers Corp',
    metric: '95%',
    metricLabel: 'Manual Labor Reduced',
    description: 'Automated order processing, real-time inventory updates across 3 stores, and generative customer notifications.',
    fullStory: 'Apex Retailers was struggling with high labor overhead as team members spent 4 hours a day copying inventory data across multiple platform silos. We designed an automated webhook pipeline running serverless on Cloud Functions. Now, inventory updates synchronously, orders self-fulfill, and AI-drafted tracking notices ship instantly to buyers.',
    tags: ['Inventory Automation', 'AI Notifications', 'Webhook Sync']
  },
  {
    id: 'saas-pipeline',
    title: 'SaaS Client Onboarding Redesign',
    client: 'ScribeFlow Tech',
    metric: '12m',
    metricLabel: 'Average Onboarding Time Saved',
    description: 'Transformed custom setups into a zero-touch pipeline with automatic billing setup, sandbox creation, and team invites.',
    fullStory: 'ScribeFlow was suffering churn during their complex workspace provisioning step. We consolidated sandbox database replication, Stripe payment routing, and slack team workspace creation into a single high-performance automation workflow. Setup failures fell to 0%, boosting conversion rates by 22%.',
    tags: ['API Orchestration', 'Stripe Billing', 'User Provisioning']
  },
  {
    id: 'legal-scanner',
    title: 'Intelligent Document Classifier',
    client: 'Veritas Legal Chambers',
    metric: '40hr',
    metricLabel: 'Saved Per Lawyer Monthly',
    description: 'Integrated advanced OCR and Gemini parsing to extract key terms, deadlines, and dates from raw case PDFs.',
    fullStory: 'Veritas Legal handled thousands of dense court dockets weekly. We built a custom application utilizing the Gemini Flash model to securely read PDFs, extract crucial filing constraints, and instantly populates team calendars with due dates. Uptime and deadline-compliance are now perfect.',
    tags: ['Gemini API', 'Document OCR', 'Smart Calendars']
  }
];
