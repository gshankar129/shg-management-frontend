import { Component, inject, resource } from '@angular/core';
import { GroupMember } from '../../services/group-member';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private groupMemberService = inject(GroupMember);

  // Angular 21 resource API for reactive data fetching
  membersResource = resource<Member[], unknown>({
    loader: () => firstValueFrom(this.groupMemberService.getMyGroupMembers())
  });



  // private membersService = inject(GroupMember);

  // allMembers = this.membersService.getMembers();
  // selectedGroupId = signal<string>('1');

  // // Filter members belonging to the same group
  // filteredMembers = computed(() =>
  //   this.allMembers().filter(member=> member.groupId === this.selectedGroupId())
  // );

  // onGroupChange(groupId: string) {
  //   this.selectedGroupId.set(groupId);
  // }
}
