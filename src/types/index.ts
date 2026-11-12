export type ProjectCategory = 
  | 'All'
  | 'AI Commercials & Advertisements'
  | 'Product Films'
  | 'Cinematic Brand Films'
  | 'AI Filmmaking Experiments'
  | 'Short Films & Microdramas'
  | 'Social Media Creatives';

export type VideoFormat = '16:9' | '9:16';
export type FormatFilter = 'all' | '16:9' | '9:16';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  format?: VideoFormat; // '16:9' (Widescreen) or '9:16' (Vertical)
  shortDescription: string;
  creativeConcept: string;
  productionApproach: string;
  toolsUsed: string[];
  role: string;
  year: string;
  thumbnail: string;
  videoPreviewUrl: string;
  fullVideoUrl: string;
  featured: boolean;
  aspectRatio?: '16:9' | '9:16' | 'landscape' | 'portrait' | 'square';
  accentColor?: string;
  client?: string;
  industry?: string;
  isConcept?: boolean;
  conceptLabel?: string;
  fullStory?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export interface ServiceItem {
  number: string;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  keyDeliverables: string[];
  idealFor: string;
  turnaroundTime: string;
  accentColor: string;
  iconName: string;
}

export interface CreativeProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface TechToolCategory {
  title: string;
  tools: {
    name: string;
    description: string;
    badge?: string;
  }[];
}

export interface TechTool {
  category: 'Generative AI' | 'AI Video' | 'Voice & Audio' | 'Editing & Post';
  name: string;
  description: string;
  icon?: string;
}

export interface CampaignStep {
  step: string;
  name: string;
  tagline: string;
  description: string;
  outputs: string[];
  impact: string;
  duration: string;
}

export interface WorkflowStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  contribution: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  brief: string;
  source?: string;
  createdAt: string;
}
