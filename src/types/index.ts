export type UseCaseStatus =
  | 'Ideation'
  | 'Pre-Evaluation'
  | 'Evaluation'
  | 'PoC'
  | 'MVP'
  | 'Live'
  | 'Archived';

export type Department =
  | 'Marketing'
  | 'R&D'
  | 'Procurement'
  | 'IT'
  | 'HR'
  | 'Operations';

export interface InternalLinks {
  sharepoint?: string;
  confluence?: string;
  demo?: string;
  bits?: string;
}

export interface UseCase {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  department: Department;
  status: UseCaseStatus;
  owner_name: string;
  owner_email: string;
  image_url?: string;
  business_impact?: string;
  technology_stack: string[];
  internal_links: InternalLinks;
  tags: string[];
  related_use_case_ids: string[];
  created_at: string;
  updated_at: string;
  application_url?: string;
}

export interface CreateUseCaseDTO {
  title: string;
  short_description: string;
  full_description: string;
  department: Department;
  status: UseCaseStatus;
  owner_name: string;
  owner_email: string;
  image_url?: string;
  business_impact?: string;
  technology_stack: string[];
  internal_links: InternalLinks;
  tags: string[];
  related_use_case_ids?: string[];
  application_url?: string;
}

export interface UpdateUseCaseDTO {
  title?: string;
  short_description?: string;
  full_description?: string;
  department?: Department;
  status?: UseCaseStatus;
  owner_name?: string;
  owner_email?: string;
  image_url?: string;
  business_impact?: string;
  technology_stack?: string[];
  internal_links?: InternalLinks;
  tags?: string[];
  related_use_case_ids?: string[];
  application_url?: string;
}
