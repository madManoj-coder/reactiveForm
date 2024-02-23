import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Icountry } from './shared/model/countryInter';
import { CustomRegex } from './shared/const/validations';
import { COUNTRIES_META_DATA } from './shared/const/countryData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'directive';
  signUpForm !: FormGroup;
  countryInfo: Array<Icountry> = [];
  constructor() {

  }

  ngOnInit() {
    this.countryInfo = COUNTRIES_META_DATA;
    this.signUpFormData();
  }

  onSignUp() {
    console.log(this.signUpForm.value);
    console.log(this.signUpForm);
  }

  signUpFormData() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.username)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)]),
      empId: new FormControl(null, [Validators.required]),
      gender: new FormControl(null),
      currentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required])
      }),
      permanentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required])
      }),
      isAddSame : new FormControl(null),
      password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)])
    })
  }

}
