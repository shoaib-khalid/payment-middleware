import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {

    /**
     * Constructor
     */
    constructor()
    {
    }

    static domainValidator(control) {
        
        if (!control.value || control.value === null){
          return { required: true };
        }

        // Allow only alphanumeric and -
        if (
          control.value.match(
            /^[0-9A-Za-z][0-9A-Za-z-]+[0-9A-Za-z]$/
          )
        ) {
          return null;
        } else {
          return { invalidDomain: true };
        }
    }
  
    static emailValidator(control) {

        if (control.value === null) 
			return null;
      
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }

    static phoneNumberValidator(control) {

        if (control.value === null) 
            return null;

        if (control.value.match(/^\+?[0-9]+$/)) {
            return null;
        } else {
            return { invalidPhonenumber: true };
        }
    }

    static postcodeValidator(control) {

        if (!control.value || control.value === null) {
          return { required: true };
        }

        // https://regexr.com/3c53v
        if (control.value.match(/^[0-9]+$/)) {
          	return null;
        } else {
          	return { invalidPostcode: true };
        }
    }
  
    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { invalidPassword: true };
        }
    }

    static requiredValidator(control){
		if (control.value) {
			return true;
		} else {
			return false;
		}
    }
}