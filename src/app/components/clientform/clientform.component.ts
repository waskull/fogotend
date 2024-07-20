import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces';
import { catchError, throwError } from 'rxjs';
import { default as dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { validateTypeDate } from '../../validators/dateValidator';
import { OnlynumbersDirective } from '../../onlynumbers.directive';
import { Rol } from '../../constants/Enum';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../interfaces/Client';

@Component({
  selector: 'clientform',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OnlynumbersDirective],
  templateUrl: './clientform.component.html',
  styleUrl: './clientform.component.scss'
})
export class ClientformComponent {
  userService = inject(ClientService);
  RolENUM = Rol;
  fb = inject(FormBuilder);
  @Output() emitForm = new EventEmitter<any>();
  @Output() editUser = new EventEmitter<any>();
  @Input() userData!: any;
  sending: boolean = false;
  userForm!: FormGroup;
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
      });
    }
    return d;
  }
  sendData() {
    this.sending = true;
    let client: IClient = {
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      dni: this.userForm.value.dni,
      birthdate: this.userForm.value.birthdate,
      gender: this.userForm.value.gender,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
    };

    if (this.userData) {
      const id: number = this.userData?.id;
      this.userService.update(client, this.userData?.id).pipe(
        catchError(err => {
          this.sending = false;
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Editar el Usuario';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        console.log(res.data);
        this.error = '';
        client.id = id;
        client.email = this.userForm.value.email;
        this.editUser.emit(client);
        this.sending = false;
      });
    }
    else {
      delete client?.id;
      this.userService.createClient(client).pipe(
        catchError(err => {
          this.sending = false;
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Crear el Usuario';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        const { password, ...newUser } = res.data;
        console.log(res); console.log(newUser);
        this.error = '';
        this.userForm.reset();
        this.userForm.patchValue({gender: 'Femenino'});
        this.emitForm.emit(newUser);
        this.sending = false;
      });
    }
  }
}

