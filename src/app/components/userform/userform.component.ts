import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces';
import { catchError, throwError } from 'rxjs';
import { default as dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { validateTypeDate } from '../../validators/dateValidator';
import { OnlynumbersDirective } from '../../onlynumbers.directive';
import { Rol } from '../../constants/Enum';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'userform',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OnlynumbersDirective],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss'
})
export class UserformComponent implements OnInit {
  userService = inject(UserService);
  Roles = [Rol.ADMIN, Rol.CASHIER, Rol.DELIVERY_MAN];
  authService = inject(AuthService);
  RolENUM = Rol;
  fb = inject(FormBuilder);
  @Output() emitForm = new EventEmitter<any>();
  @Output() editUser = new EventEmitter<any>();
  @Input() userData!: any;
  userForm!: FormGroup;
  sending: boolean = false;
  editing: boolean = false;
  error: string = '';
  ngOnInit(): void {
    this.userForm = this.initForm();
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      birthdate: ['', [Validators.required, validateTypeDate]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      gender:['Femenino', [Validators.required, Validators.minLength(7)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")]],
      roles: [this.RolENUM.CASHIER, [Validators.required]],
    });
    if (this.userData) {
      this.editing = true;
      d.patchValue({
        firstname: this.userData?.firstname,
        lastname: this.userData?.lastname,
        email: this.userData?.email,
        gender: this.userData?.gender,
        dni: this.userData?.dni,
        birthdate: this.userData?.birthdate,
        phone: this.userData?.phone,
        roles: this.userData?.roles[0]
      });
    }
    return d;
  }
  sendData() {
    this.error = '';
    let user: User = {
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      dni: this.userForm.value.dni,
      birthdate: this.userForm.value.birthdate,
      gender: this.userForm.value.gender,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      roles: [
        this.userForm.value.roles
      ]
    };

    this.sending = true;
    if (this.userData) {
      if(this.getRol() === this.RolENUM.MANAGER && this.userData?.roles[0] === this.RolENUM.MANAGER){this.sending = false;this.error = "No puedes degradar a un gerente siendo gerente, solo el administrador puede.";return;}
      const id: number = this.userData?.id;
      this.userService.update(user, this.userData?.id).pipe(
        catchError(err => {
          this.sending = false;
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al editar el empleado';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        this.error = '';
        user.id = id;
        this.sending = false;
        user.email = this.userForm.value.email;
        this.editUser.emit(user);
      });
    }
    else {
      delete user?.id;
      this.userService.create(user).pipe(
        catchError(err => {
          this.sending = false;
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al registrar el empleado';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        const { password, ...newUser } = res.data;
        console.log(res); console.log(newUser);
        this.error = '';
        this.sending = false;
        this.userForm.reset();
        this.userForm.patchValue({gender: 'Femenino', roles:this.RolENUM.CASHIER});
        this.emitForm.emit(newUser);
      });
    }
  }
  getRol() {
    return this.authService.currentUser()?.roles[0];
  }
}
