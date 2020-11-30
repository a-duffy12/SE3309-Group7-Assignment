import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

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
  watchList: Array<movie>;
  popup: boolean = false;
  errorMessage: string = "Please make sure all fields are entered, and rating is between 1-10"

  selectedMovie: movie;
  @Input() rating: number;
  dateCreated: Date = new Date();
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getWatchList(){
    this.watchList = [];
    this.http.get<any>('route').subscribe( (data: any) => {
      let object = {
        title: data.movie,
        director: data.director,
        releaseDate: data.releaseDate,
      }
      this.watchList.push(object)
    });
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
      this.http.post<any>('route', rating).subscribe( (data: any) => {
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
