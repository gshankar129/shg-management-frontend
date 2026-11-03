import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../core/auth/services/auth';
import { Meeting, MeetingService } from '../../services/meeting';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './meeting-list.html',
  styleUrl: './meeting-list.css',
})
export class MeetingList implements OnInit {
  private meetingService = inject(MeetingService);
  private auth = inject(AuthService);

  isAdmin = this.auth.getRole() === 'ADMIN';

  meetings = signal<Meeting[]>([]);
  isLoading = signal<boolean>(true);
  isSaving = signal<boolean>(false);
  deletingId = signal<number | null>(null);
  message = signal<string>('');
  error = signal<string>('');

  title = '';
  meetingDate = '';   // value from the datetime-local input

  // Next meeting first
  upcoming = computed(() =>
    this.meetings()
      .filter((m) => new Date(m.meetingDate).getTime() >= Date.now())
      .sort((a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime())
  );

  // Most recent first
  past = computed(() =>
    this.meetings()
      .filter((m) => new Date(m.meetingDate).getTime() < Date.now())
      .sort((a, b) => new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime())
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.meetingService.list().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.meetings.set(res.data);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || 'Failed to load meetings.');
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (this.isSaving() || !this.title.trim() || !this.meetingDate) return;

    this.message.set('');
    this.error.set('');
    this.isSaving.set(true);

    // datetime-local gives local time without a zone; convert to a full ISO date
    const isoDate = new Date(this.meetingDate).toISOString();

    this.meetingService.create(this.title.trim(), isoDate).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.message.set(res.message || 'Meeting scheduled.');
        this.meetings.update((list) => [res.data, ...list]);
        form.resetForm();
        this.title = '';
        this.meetingDate = '';
        setTimeout(() => this.message.set(''), 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.isSaving.set(false);
        this.error.set(err.error?.message || 'Failed to schedule the meeting.');
      },
    });
  }

  onDelete(meeting: Meeting): void {
    if (this.deletingId() !== null) return;
    if (!confirm(`Delete "${meeting.title}"?`)) return;

    this.deletingId.set(meeting.id);
    this.error.set('');

    this.meetingService.remove(meeting.id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.meetings.update((list) => list.filter((m) => m.id !== meeting.id));
      },
      error: (err: HttpErrorResponse) => {
        this.deletingId.set(null);
        this.error.set(err.error?.message || 'Failed to delete the meeting.');
      },
    });
  }
}