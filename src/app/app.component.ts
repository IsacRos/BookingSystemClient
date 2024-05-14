import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from "./pages/layout/layout.component";
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, LoginComponent, ReactiveFormsModule, HttpClientModule, LayoutComponent]
})
export class AppComponent {

  private subject = new BehaviorSubject<boolean>(false);

  isAuthenticated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  setAuthenticated(value: boolean) {
    this.subject.next(value);
  }
}
