import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: string | null = null;
  isLoading: boolean = false;
  previousUrl: string | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      this.currentUser = user ? user.nome : null; // Alterado para 'nome'
    });

    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        if (this.previousUrl === this.router.url) {
          this.isLoading = false;
        }
        this.previousUrl = this.router.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    if (this.router.url !== route) {
      this.isLoading = true;
    }
    setTimeout(() => {
      this.router.navigate([route]);
    }, 0);
  }
}
