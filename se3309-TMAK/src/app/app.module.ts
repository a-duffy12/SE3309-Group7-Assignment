import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';
import { User } from './value.service';
<<<<<<< HEAD
import { RecommendComponent } from './recommend/recommend.component';
=======
import { FranchiseComponent } from './franchise/franchise.component';
>>>>>>> f3cdc84ee72a67c0da53e0796a942c02a4b1b715

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RatingComponent,
<<<<<<< HEAD
    RecommendComponent
=======
    FranchiseComponent
>>>>>>> f3cdc84ee72a67c0da53e0796a942c02a4b1b715
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
