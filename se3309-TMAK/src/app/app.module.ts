import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';
import { User } from './value.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [User],
  bootstrap: [AppComponent]
})
export class AppModule { }
