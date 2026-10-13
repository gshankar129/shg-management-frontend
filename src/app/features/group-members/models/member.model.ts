// (TypeScript interface)
// Make sure your response interface matches your backend JSON response structure
// export interface MemberResponse {
//   success: boolean;
//   data: {
//     id: number;
//     name: string;      // 👈 Prisma/Backend returns 'name'
//     email: string;
//     role: string;
//     groupId: number;
//     shgName: string | null; // 👈 Matching profile/group structure
//   }[];
// }



export interface Member {
  id: number;
  memberName: string;
  email: string;
  role: string;
  groupId: number;
  groupName: string | null;
}

// export interface MemberResponse {
//   success: boolean;
//   data: Member[];
// }

// Since your backend returns a direct JSON array [...]
export type MemberResponse = Member[];