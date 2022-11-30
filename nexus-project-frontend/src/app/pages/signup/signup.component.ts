import { Component, OnInit, OnChanges } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isUser = false
  background = this.isUser === false ? 'white' : 'linear-gradient(90deg, #BC8AFD 0%, #5A24F6 48.44%, #6EE2F5 100%)';
  faArrowLeft = faArrowLeft


  

  companyForm = new FormGroup({
    name:  new FormControl('', [Validators.required, Validators.email]),
    RTN:  new FormControl('', [Validators.required]),
    phone:  new FormControl('', [Validators.required]),
    country:  new FormControl('', [Validators.required]),
    city:  new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(15)]),
  });

  userForm = new FormGroup({
    name:  new FormControl('', [Validators.required]),
    lastname:  new FormControl('', [Validators.required]),
    country:  new FormControl('', [Validators.required]),
    city:  new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(15)]),
  });

  constructor(private authService: AuthService,
              private router: Router) { }

  changeUser() {
    this.isUser = !this.isUser
  }

  

  register(entityForm: FormGroup) {

    if(this.isUser) {
      
      this.authService.register(
        {
          "name": entityForm.value.name,
          "phone": entityForm.value.RTN,
          "RTN": entityForm.value.phone,
          "country": entityForm.value.country,
          "city": entityForm.value.city,
          "email": entityForm.value.email,
          "password": entityForm.value.password
        },
        'register-company'
      )
      .subscribe( () => this.router.navigate(['/']))
    } else if(!this.isUser){
      this.authService.register(
        {
          "name": entityForm.value.name,
          "lastname": entityForm.value.lastname,
          "country": entityForm.value.country,
          "city": entityForm.value.city,
          "email": entityForm.value.email,
          "password": entityForm.value.password
        },
        'register-user'
      )
      .subscribe( () => this.router.navigate(['/']))
    }
       
  }

  ngOnInit(): void {
  }

}
