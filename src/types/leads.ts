
export interface Lead {
  id: string;
  name: string;
  company?: string;
  title?: string;
  email?: string;
  phone?: string;
  status: string;
  source?: string;
  score: number;
  estimated_cost?: number;
  currency: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadInteraction {
  id: string;
  lead_id: string;
  type: 'Call' | 'Meeting' | 'In Person';
  title: string;
  description?: string;
  date: string;
  next_meeting_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
