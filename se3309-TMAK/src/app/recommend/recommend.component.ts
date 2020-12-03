import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../value.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  constructor(private http: HttpClient, public curUserName: User) { }

  allRecommended: any;

  ngOnInit(): void {
  }

getRecommended()
{
  this.http.get(`http://localhost:3000/api/recommended/${this.curUserName.getUser()}`).subscribe((data:any)=>{
    this.allRecommended = data;
  })
}
}
