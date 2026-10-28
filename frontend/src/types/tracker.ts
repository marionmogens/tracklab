export interface Tracker {
  id: string;
  code: string;
  parentCode?: string | null;
  description: string;
  actionType: string;
  moduleFlow: string;
  isUsingNotification: boolean;
  isPublic: boolean;
  icon?: string | null;
  order: number;
  mandays: number;
  isParallel: boolean;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
}

export interface CreateTrackerDto {
  code: string;
  parentCode?: string;
  description: string;
  actionType: string;
  moduleFlow: string;
  isUsingNotification: boolean;
  isPublic: boolean;
  icon?: string;
  order: number;
  mandays: number;
  isParallel: boolean;
  createdBy: string;
}

export interface UpdateTrackerDto extends Partial<CreateTrackerDto> {
  id: string;
  updatedBy: string;
  isActive?: boolean;
}