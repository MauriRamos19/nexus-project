import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, Validators, FormControl } from  '@angular/forms'

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {
  faArrowLeft = faArrowLeft
  

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService) { }

  entityForm = new FormGroup({
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(15)]),
  });

  ngOnInit(): void {
    
  }


  login(userForm: FormGroup) {
    this.authService.login({'email': userForm.value.email, 'password': userForm.value.password})
      .subscribe( data => {
        this.router.navigate(['/'])
        window.localStorage.setItem('token', data.access_token)
        this.cookieService.set('X-Auth-Token', data.access_token);
      })    
  }


}
