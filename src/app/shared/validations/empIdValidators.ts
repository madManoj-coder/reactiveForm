import { AbstractControl, ValidationErrors } from "@angular/forms";




export class EmpIdValidators {
    static isEmpIdValid(control : AbstractControl) : null | ValidationErrors{
        let val = control.value as string;
        if(!val){
            return null;
        }

        let regexExp = /^[A-Z]\d{3}$/;
        let isValid = regexExp.test(val);

        if(isValid){
            return null;
        }else{
            return {
                invalidEmpId : 'Emp ID must be start with one alphabet and ends with 3 number'
            }
        }
    }
}