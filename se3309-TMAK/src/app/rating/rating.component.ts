import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { User } from '../value.service';

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
  constructor(private http: HttpClient, private datePipe: DatePipe, private user: User) { }

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
    let rating: rating = {
      title: this.selectedMovie.title,
      director: this.selectedMovie.director,
      releaseDate: this.selectedMovie.releaseDate,
      numericalRating: this.rating,
      dateCreated: this.datePipe.transform(this.dateCreated, 'yyyy-MM-dd')
    }

    if(this.findErrors()){
      this.http.post<any>(`/api/reviews/${this.user.getUser()}`, rating).subscribe( (data: any) => {
        console.log('successfully added rating')
      })
    }
    else{

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
