import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { HeaderComponent } from './header/header.component';
import { SystemNotificationComponent } from './system-notification/system-notification.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    UserMenuComponent,
    SystemNotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    UserMenuComponent,
    SystemNotificationComponent,
  ],
})
export class LayoutModule {}
