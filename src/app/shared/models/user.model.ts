// src/app/shared/models/member.model.ts
export interface Member {
  id: number;
  memberName: string;
  email: string;
  role: string;
  groupId: string;
  groupName?: string;
}