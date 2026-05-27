export interface TimelineEvent {
  id: string;
  clientId: string;
  caseId: string;
  title: string;
  description: string;
  eventDate: string;
  eventType: string;
  originType: string;
  publicVisible: boolean;
  automatic: boolean;
  editedByBoss: boolean;
  icon?: string;
  color?: string;
  priority?: "urgent" | "important" | "informative" | "low" | "medium" | "high";
  createdAt?: string;
  updatedAt?: string;
}
