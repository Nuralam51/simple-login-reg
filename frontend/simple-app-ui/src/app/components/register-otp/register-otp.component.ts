import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/sevices/auth.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
    selector: 'app-register-otp',
    templateUrl: './register-otp.component.html',
    styleUrls: ['./register-otp.component.css']
})
export class RegisterOtpComponent implements OnInit {

    user: User = new User();
    successMessages: string;
    errorMessages: string;

    registerOTPFormGroup: FormGroup;

    constructor(private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.registerOTPFormGroup = this.formBuilder.group({
            userOTP: this.formBuilder.group({
                otp: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace, Validators.minLength(6)]),
            })
        })
    }

    get otp() { return this.registerOTPFormGroup.get("userOTP.otp") };

    checkOtp() {
        if (this.registerOTPFormGroup.invalid) {
            this.registerOTPFormGroup.markAllAsTouched();
            return;
        }
        this.user = this.registerOTPFormGroup.controls['userOTP'].value;

        this.authService.checkOtp(this.user).subscribe(data => {
            this.successMessages = "Registration success";
            this.router.navigate(['login']);
        }, err => {
            this.errorMessages = "Registration cant success. Try again..."
        });
    }

}
