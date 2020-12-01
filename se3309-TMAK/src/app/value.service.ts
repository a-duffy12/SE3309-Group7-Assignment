import { Injectable } from '@angular/core';

@Injectable()
export class User {

  curUser: String;

  constructor(){
    this.curUser = "";
  }

  getUser(){
    return this.curUser;
  }

  setUser(userName: String){
    this.curUser = userName;
  }
}
