import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isUser = false
  background = this.isUser === false ? 'white' : 'linear-gradient(90deg, #BC8AFD 0%, #5A24F6 48.44%, #6EE2F5 100%)';
  faArrowLeft = faArrowLeft
  constructor() { }

  changeUser() {
    this.isUser = !this.isUser
  }


  ngOnInit(): void {
  }

}
