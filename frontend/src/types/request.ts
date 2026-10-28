export interface RequestHeader {
  id: string;
  partnerId: string;
  companyName?: string;
  projectCode: string;
  receivingStatus: string;
  totalFee: number;
  receivedDate: string;
  lastStatus: string;
  analysisWipDate?: string;
  analysisCompletedDate?: string;
  leadTime: number;
  isActive?: boolean;
}

export interface CreateRequestDto {
  partnerId: string;
  projectCode: string;
  totalFee: number;
  lastStatus: string;
  receivingStatus: string;
  leadTime: number;
  receivedDate: string;
  analysisWipDate?: string;
  analysisCompletedDate?: string;
  createdBy: string;
}

export interface TrackingDetail {
  id: string;
  trackerId: string;
  requestId: string;
  partnerId: string;
  value: string;
  createdOn: string;
  createdBy: string;
  trackerCode?: string;
}