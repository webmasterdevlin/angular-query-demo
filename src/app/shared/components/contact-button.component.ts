import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Contact } from 'src/app/models';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a
      [ngClass]="[
        isActive ? 'bg-primary text-white' : 'hover:bg-gray',
        'flex w-full items-center justify-between gap-4 overflow-hidden whitespace-pre rounded-lg p-2 no-underline',
      ]"
      [routerLink]="['/contacts', contact.id]"
    >
      <ng-container *ngIf="contact.first || contact.last; else noName">
        {{ contact.first }} {{ contact.last }}
      </ng-container>
      <ng-template #noName><i>No Name</i></ng-template>
      <span
        *ngIf="contact.favorite"
        [ngClass]="['float-right', isActive ? 'text-white' : 'text-yellow-500']"
        >★</span
      >
    </a>
  `,
  styles: [],
})
export class ContactButtonComponent implements OnInit {
  @Input() contact!: Contact;
  isActive = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isActive = this.router.url.includes(`/contacts/${this.contact.id}`);
  }
}
