import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthUser } from 'src/app/common/AuthUser';
import { AuthService } from 'src/app/sevices/auth.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginFormGroup: FormGroup;
    user: User;
    currentUser: AuthUser;
    successMessages: string;
    errorMessages: string;

    constructor(private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginFormGroup = this.formBuilder.group({
            login: this.formBuilder.group({
                email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
                password: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace, Validators.minLength(6)])
            })
        })
    }

    get email() { return this.loginFormGroup.get("login.email") };
    get password() { return this.loginFormGroup.get("login.password") };

    login() {
        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched();
            return;
        }
        this.user = this.loginFormGroup.controls['login'].value;
        this.authService.obtainAccessToken(this.user).subscribe(data => {
            this.router.navigate(['dashboard']);
            this.authService.findUserByEmail(this.user.email).subscribe(data => {
                this.currentUser = data;
                localStorage.setItem("userInfo", JSON.stringify(this.currentUser));
                window.location.reload();
            })
        }, err => {
            this.errorMessages = "Mismatch Email & password!!!"
        });
    }
}
