import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.css']
})
export class FranchiseComponent implements OnInit {

  @Input() frnAll: String = "";
  @Input() frnBest: String = "";

  entries: any;
  best: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  franchiseMovies()
  {
    if (this.frnAll != "")
    {
      // request to back end
      this.http.get(`http://localhost:3000/api/movies/franchise/all/${this.frnAll}`).subscribe((d: any) => {
        this.entries = d;
        console.log(this.entries);
      })
    }
    else
    {
      console.log("Invalid input!");
    }
  }

  bestMovie()
  {
    if (this.frnBest != "")
    {
      // request to back end
      this.http.get(`http://localhost:3000/api/movies/franchise/best/${this.frnBest}`).subscribe((d: any) => {
        this.best = d;
      })
    }
    else
    {
      console.log("Invalid input!");
    }
  }

}
