import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Icountry } from './shared/model/countryInter';
import { CustomRegex } from './shared/const/validations';
import { COUNTRIES_META_DATA } from './shared/const/countryData';
import { NoSpaceValidators } from './shared/validations/noSpace';
import { EmpIdValidators } from './shared/validations/empIdValidators';
import { AsyncEmailValidator } from './shared/validations/asyncEmailValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveForm';
  signUpForm !: FormGroup;
  countryInfo !: Array<Icountry>
  constructor() {

  }

  ngOnInit() {
    this.countryInfo = COUNTRIES_META_DATA;
    this.createSignUpForm();
    this.enableConfirmPassword();
    this.validateCurrAdd();
    this.patchPerAdd();
    this.passAndConfirmPassSame();
  }


  createSignUpForm() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.username),
          Validators.minLength(5),
          Validators.maxLength(8),
          NoSpaceValidators.noSpaceControl
        ]
      ),
      email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], [AsyncEmailValidator.isEmailAvailable]),
      empId: new FormControl(null, [Validators.required, EmpIdValidators.isEmpIdValid]),
      gender: new FormControl(null),
      skills: new FormArray([new FormControl(null, [Validators.required])]),
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
      isAddSame: new FormControl({ value: null, disabled: true }),
      password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern(CustomRegex.password)])
    })
  }

  enableConfirmPassword() {
    // observable :- continuous stream of data.
    this.f['password'].valueChanges // valueChanges is a observables
      .subscribe((res) => {
        console.log(res);
        console.log(this.f['password'].valid);
        if (this.f['password'].valid) {
          this.f['confirmPassword'].enable()
        } else {
          this.f['confirmPassword'].disable()
        }
      })
  }

  validateCurrAdd() {
    this.f['currentAddress'].valueChanges
      .subscribe((res) => {
        console.log(res);
        // console.log(this.f['currentAddress'].valid);
        if (this.f['currentAddress'].valid) {
          this.f['isAddSame'].enable()
        } else {
          this.f['isAddSame'].disable()
          this.f['isAddSame'].patchValue(false)
        }
      })
  }

  patchPerAdd() {
    this.f['isAddSame'].valueChanges
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.f['permanentAddress'].patchValue(this.f['currentAddress'].value)
          this.f['permanentAddress'].disable();
        } else {
          this.f['permanentAddress'].enable();
          this.f['permanentAddress'].reset();
        }
      })
  }

  passAndConfirmPassSame() {
    this.f['confirmPassword'].valueChanges
      .subscribe((res) => {
        console.log(res);
        if (res !== this.f['password'].value) {
          this.f['confirmPassword'].setErrors({ 'passAndConfErr': 'Password and Confirm Password must be same' })
        }
      })
  }

  onSignUp() {
    // if (this.skillsFormArr.valid) {
    console.log(this.signUpForm.value);
    console.log(this.signUpForm);
    // this.signUpForm.reset()
    // }
  }

  get f() {
    return this.signUpForm.controls
  }

  get userName() {
    return this.signUpForm.get("userName") as FormControl;
  }

  get skillsFormArr() {
    return this.signUpForm.get("skills") as FormArray;
  }

  onAddSkill() {
    if (this.skillsFormArr.length < 5) {
      let skillControl = new FormControl(null, [Validators.required]);
      this.skillsFormArr.push(skillControl)
    }
  }

  onRemoveSkill(i: number) {
    // console.log(i);
    this.skillsFormArr.removeAt(i)
  }



}


