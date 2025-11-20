
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  homeImage?: string;
  link?: string;
  year: string;
  tech: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface NavigationItem {
  label: string;
  path: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
