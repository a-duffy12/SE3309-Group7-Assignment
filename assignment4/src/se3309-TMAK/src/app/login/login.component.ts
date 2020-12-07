import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../value.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() userLog: String = "";
  @Input() passLog: String = "";

  @Input() user: String = "";
  @Input() pass: String = "";
  @Input() email: String = "";
  @Input() first: String = "";
  @Input() last: String = "";
  @Input() dob: String = "";

  logged: any;
  notLogged: any = true;
  curUser: any;
  newPass: any;
  oldPass: any;

  constructor(private http: HttpClient, public curUserName: User) { }

  ngOnInit(): void {
  }

  login(){
    this.logged = false;
    this.http.put<any>(`/api/users/${this.userLog}`,{password: this.passLog}).subscribe((d: any) =>{ // Get request using users input
      this.curUser = d;
      this.curUserName.setUser(this.userLog);
      this.logged = true;
      this.notLogged = false;
      })
  }

  createUser(){
    this.logged = false;
    this.http.post<any>(`/api/users/${this.user}`,
    {password: this.pass, firstName: this.first, lastName: this.last, emailAddress: this.email, dateOfBirth: this.dob}).subscribe((d: any) =>{ // Get request using users input
      this.curUser = d;
      this.notLogged = true;
      })
  }

  logout(){
    this.notLogged = true;
    this.logged = false;
    this.curUserName.setUser("");
  }

  changeP(){
    this.http.put<any>(`/api/users/pass/${this.curUserName.getUser()}`,{old_password: this.oldPass, password: this.newPass}).subscribe((d: any) =>{

      })
  }

}
