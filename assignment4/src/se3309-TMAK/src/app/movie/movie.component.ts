import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  mov: any;
  movActive: boolean = false;
  rev: any;
  revActive: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  movies()
  {
    if (!this.movActive)
    {
      // request to back end
      this.http.get(`/api/movies`).subscribe((d: any) => {
        this.mov = d;
      })
      this.movActive = true;
    }
    else if (this.movActive)
    {
      this.mov = undefined;
      this.movActive = false;
    }
  }

  reviews()
  {
    if (!this.revActive)
    {
      // request to back end
      this.http.get(`/api/reviews/count`).subscribe((d: any) => {
        this.rev = d;
      })
      this.revActive = true;
    }
    else if (this.revActive)
    {
      this.rev = undefined;
      this.revActive = false;
    }
  }
}
