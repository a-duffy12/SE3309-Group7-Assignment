import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';
import { User } from './value.service';
import { RecommendComponent } from './recommend/recommend.component';
import { OverallRatingComponent } from './overall-rating/overall-rating.component';
import { FranchiseComponent } from './franchise/franchise.component';
import { MovieComponent } from './movie/movie.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RatingComponent,
    RecommendComponent,
    OverallRatingComponent,
    FranchiseComponent,
    MovieComponent
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
