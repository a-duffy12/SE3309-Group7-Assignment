import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overall-rating',
  templateUrl: './overall-rating.component.html',
  styleUrls: ['./overall-rating.component.css']
})
export class OverallRatingComponent implements OnInit {

  movieTitle: any;
  director: any;

  ratings: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  comRatings(){
    this.http.get<any>(`http://localhost:3000/api/rating/${this.movieTitle}/${this.director}`).subscribe((r: any) =>{ // Get request using users input
      this.ratings = r;
      })
  }
}
