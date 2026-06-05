import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer.component/footer.component';
import { NavbarComponent } from '../navbar.component/navbar.component';

@Component({
  selector: 'rt-shell',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <rt-navbar />
    <main>
      <router-outlet />
    </main>
    <rt-footer />
  `,
  styles: [`
    main {
      min-height: 100vh;
      padding-top: var(--rt-nav-height);
    }
  `],
})
export class ShellComponent {}