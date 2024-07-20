import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { validateTypeDate } from '../../../validators/dateValidator';
import { OnlynumbersDirective } from '../../../onlynumbers.directive';
import { ErrorStatus } from '../../../constants/Enum';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, ReactiveFormsModule, DatePipe, OnlynumbersDirective]
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor() { }
  
  @ViewChild('passInput', {static: false}) passInput: ElementRef;
  rememberEmail:boolean = true;
  router = inject(Router);
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  authService = inject(AuthService);
  isLogin: boolean = true;
  message: string = ''
  messageReg: string = ''
  error: boolean = false;
  errorReg: boolean = false;
  isSubmiting = false;

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberEmail: [this.rememberEmail, Validators.required],
    });
  }
  initRegForm(): FormGroup {
    return this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      birthdate: ['2000-01-10', [Validators.required, validateTypeDate]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['Femenino', [Validators.required, Validators.minLength(7)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")]],
    });
  }
  login(): void {
    this.error = false;
    this.message = '';
    this.isSubmiting = true;
    this.authService.login({email: this.loginForm.value.email.toLowerCase(), password: this.loginForm.value.password.toLowerCase()}).pipe(
      catchError(err => {
        this.isSubmiting = false;
        this.error = true;
        
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.message = err?.error?.message || 'Error al logearse';
          if(this.message  === ErrorStatus.NO_NETWORK || this.message  === ErrorStatus.NO_FETCH) this.message = "Error al contactar al servidor, verifique su conexión."
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.authService.currentUser.set(res.data.user);
      localStorage.setItem('token', res.data.accessToken);
      if(this.rememberEmail) localStorage.setItem('emailID', res.data.user.email);
      else localStorage.setItem('emailID', null);
      // this.isSubmiting = false;
      this.router.navigate(['dashboard']);
    }
    );
  }

  register(): void {
    this.errorReg = false;
    this.messageReg = '';
    this.isSubmiting = true;
    //registro
    const payload = {
      email: this.registerForm.value.email.toLowerCase(), 
      password: this.registerForm.value.password.toLowerCase(),
      gender: this.registerForm.value.gender,
      dni: this.registerForm.value.dni,
      birthdate: this.registerForm.value.birthdate,
      phone: this.registerForm.value.phone,
      firstname: this.registerForm.value.firstname.charAt(0).toUpperCase() + this.registerForm.value.firstname.slice(1),
      lastname: this.registerForm.value.lastname.charAt(0).toUpperCase() + this.registerForm.value.lastname.slice(1),
    }
    this.authService.register(payload).pipe(
      catchError(err => {
        this.isSubmiting = false;
        this.errorReg = true;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.messageReg = err?.error?.message || 'Error al registrarse';
          if(this.message  === ErrorStatus.NO_NETWORK || this.message  === ErrorStatus.NO_FETCH) this.message = "Error al contactar al servidor, verifique su conexión."
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.isSubmiting = false;
      this.errorReg = false;
      this.messageReg = '';
      this.registerForm.reset();
      this.loginForm.patchValue({email:payload.email, password:payload.password});
      this.isLogin = true;
    }
    );

  }

  resetPassword() {
    this.router.navigate(['password']);
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
    this.registerForm = this.initRegForm();
    if(localStorage.getItem('emailID')){
      this.loginForm.patchValue({email:localStorage.getItem('emailID')});
    }
    
  }
  ngAfterViewInit(): void {
      if(localStorage.getItem('emailID')){
      this.passInput.nativeElement.focus();
      }
  }
}
