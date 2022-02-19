import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../sevices/auth.service';
import { CustomValidators } from '../../validators/custom-validators';
import { User } from 'src/app/common/user';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user: User = new User();
    successMessages: string;
    errorMessages: string;

    userRegisterFormGroup: FormGroup;

    constructor(private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.userRegisterFormGroup = this.formBuilder.group({
            userRegister: this.formBuilder.group({
                name: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace, Validators.minLength(6)]),
                email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
                password: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace, Validators.minLength(6)])
            })
        })
    }

    get name() { return this.userRegisterFormGroup.get("userRegister.name") };
    get email() { return this.userRegisterFormGroup.get("userRegister.email") };
    get password() { return this.userRegisterFormGroup.get("userRegister.password") };

    register() {
        if (this.userRegisterFormGroup.invalid) {
            this.userRegisterFormGroup.markAllAsTouched();
            this.errorMessages = "Please fill all fields";
            return;
        }
        this.user = this.userRegisterFormGroup.controls['userRegister'].value;

        this.authService.register(this.user).subscribe(data => {
            this.router.navigate(['register/otp']);
        }, err => {
            this.errorMessages = "Email already exists. Use another email."
        });
        console.log(this.user);

    }

}
