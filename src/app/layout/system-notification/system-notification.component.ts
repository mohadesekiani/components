import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-system-notification',
  standalone: false,
  templateUrl: './system-notification.component.html',
  styleUrl: './system-notification.component.scss',
})
export class SystemNotificationComponent {
  menuOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleMenu(event: MouseEvent): void {
    console.log(event);

    console.log(this.menuOpen);

    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}
