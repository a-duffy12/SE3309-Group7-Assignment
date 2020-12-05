import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { User } from '../value.service';
import { interval, Subscription } from 'rxjs';

interface movie{
  title: string,
  director: string,
  releaseDate: string
}
interface rating{
  title: string,
  director: string,
  releaseDate: string,
  numericalRating: number,
  dateCreated: string
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [DatePipe]
})

export class RatingComponent implements OnInit {
  watchList: Array<any>;
  popup: boolean = false;
  errorMessage: string = "Please make sure all fields are entered, and rating is between 1-10"

  selectedMovie: movie;
  @Input() rating: number;
  dateCreated: Date = new Date();

  // fields to track whether a user is logged in or not
  subscription: Subscription;
  activeUser: String = "";

  constructor(private http: HttpClient, private datePipe: DatePipe, private user: User) {
    // every second, update the active user variable
    this.subscription = interval(1000).subscribe(() => {
      this.activeUser = this.user.getUser();
    });
  }

  ngOnInit(): void {
  }

  getWatchList(){
    if (this.user.getUser() != "")
    {
      this.watchList = [];
      this.http.get<any>(`/api/wle/${this.user.getUser()}`).subscribe( (data: any) => {
        this.watchList = data;
      });
    }
  }

  submitRating(){
    if(this.findErrors()){
      this.http.post<any>(`/api/reviews/${this.user.getUser()}`,{title: this.selectedMovie.title,
        director: this.selectedMovie.director,
        releaseDate: this.datePipe.transform(this.selectedMovie.releaseDate, 'yyyy-MM-dd'),
        numericalRating: this.rating,
        dateCreated: this.datePipe.transform(this.dateCreated, 'yyyy-MM-dd')}, ).subscribe( (data: any) => {
        console.log('successfully added rating')
      })
    }
    else{
      console.log("Invalid input!");
    }
  }

  findErrors(){
    if(!this.selectedMovie) return false;
    if(this.rating){
      if(!(this.rating > 0 && this.rating < 10)) return false
    }
    else{
      return false
    }
    return true;
  }
}
