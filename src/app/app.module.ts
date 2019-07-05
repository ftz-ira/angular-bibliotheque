import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookService } from './service/book.service';
import { BookComponent } from './books/book/book.component';
import { BookFormComponent } from './books/book-form/book-form.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'books/book/view/:id', canActivate: [AuthGuardService],  component: BookComponent},
  {path: 'books/new', canActivate: [AuthGuardService],  component: BookFormComponent},
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: '**', redirectTo: 'books'},
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    BookListComponent,
    BookComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuardService, AuthService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
