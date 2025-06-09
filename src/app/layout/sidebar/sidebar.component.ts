import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface MenuItem {
  title: string;
  path?: string;
  icon?: string;
  type?: 'sub' | 'link';
  active?: boolean;
  children?: MenuItem[];
  Menusub?: boolean;
  open?: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false,
  animations: [
    trigger('submenuToggle', [
      state('collapsed', style({ height: '0', opacity: 0, display: 'none' })),
      state('expanded', style({ height: '*', opacity: 1, display: 'block' })),
      transition('collapsed <=> expanded', [animate('350ms ease-in-out')]),
    ]),
    trigger('sidebarToggle', [
      state('expanded', style({ width: '240px' })),
      state('collapsed', style({ width: '65px' })),
      transition('expanded <=> collapsed', animate('350ms ease-in-out')),
    ]),
    trigger('fadeText', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('450ms 450ms ease')),
    ]),
  ],
})
export class SidebarComponent {
  activePath = '/dashboard';
  isCollapsed: boolean = false;
  @Output() sidebarStateChanged = new EventEmitter<boolean>(); // true = بسته

  menu: MenuItem[] = [
    {
      title: 'میز کار',
      path: '/dashboard',
      icon: 'bi-window-dock',
      type: 'sub',
      active: true,
      children: [],
      Menusub: false,
    },
    {
      title: 'مدیریت راهبری',
      path: '',
      icon: 'bi-people',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'کاربران',
          path: '/user/users',
          icon: 'bi-people',
          type: 'link',
          active: false,
        },
      ],
      Menusub: true,
    },
    {
      title: 'صفحه ارور',
      path: '/spec/error404',
      icon: 'bi bi-display',
      type: 'sub',
      active: true,
      children: [],
      Menusub: false,
    },
  ];

  constructor(private cdref: ChangeDetectorRef, private router: Router) {}
  ngOnInit() {
    this.activePath = this.router.url;
    this.updateActiveMenuByRoute();
    this.menu.forEach((item) => {
      if (item.Menusub) {
        item.open = false;
      }
    });
  }
  private collapseAllSubmenus(): void {
    this.menu.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.open = false;
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.collapseAllSubmenus();
    }
    this.sidebarStateChanged.emit(this.isCollapsed); // ارسال به پدر

    this.cdref.detectChanges();
  }

  isActive(path: string): boolean {
    return this.activePath === path;
  }

  hasActiveChild(children?: MenuItem[]) {
    if (!children) return false;
    return children.some((c) => this.isActive(c.path || ''));
  }

  toggle(item: MenuItem) {
    item.open = !item.open;
  }

  setActive(path: string, item: any, event: Event): void {
    this.activePath = path;
    this.router.navigate([path]);
  }
  private updateActiveMenuByRoute() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        this.activePath = currentUrl;

        this.menu.forEach((item) => {
          item.active = item.path === currentUrl;
          if (item.children && item.children.length) {
            item.open = item.children.some((c) => c.path === currentUrl);
            item.children.forEach((c) => (c.active = c.path === currentUrl));
          }
        });

        setTimeout(() => {
          this.cdref.detectChanges();
        });
      });
  }

  toggleSubMenu(item: MenuItem) {
    if (this.isCollapsed) {
      return; // وقتی منو جمع شده، هیچ کاری نکن
    }

    item.active = !item.active;
    item.open = !item.open;
  }
}
