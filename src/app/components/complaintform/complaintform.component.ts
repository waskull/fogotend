import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { ComplaintStatus, ComplaintType } from '../../constants/Enum';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'complaintform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './complaintform.component.html',
  styleUrl: './complaintform.component.scss'
})
export class ComplaintformComponent {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  @Input() show = false;
  @Input() edit = false;
  dataForm!: FormGroup;
  complaintForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  fb = inject(FormBuilder);
  complaintService = inject(ComplaintService);
  type = ComplaintType;
  complaintStatus = ComplaintStatus;
  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.complaintForm = this.complaintFormInit();
  }
  complaintFormInit(): FormGroup {
    const form = this.fb.group({
      note: ['', [Validators.minLength(3)]],
      complaintStatus: [this.complaintStatus.ACCEPTED, [Validators.required, Validators.minLength(7)]],
    });
    return form;
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      type: [ComplaintType.CLAIM, [Validators.required, Validators.minLength(2)]],
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData() {
    let Data: any = {
      type: this.dataForm.value.type,
      description: this.dataForm.value.description
    };if (this.data) {
      const id: number = this.data?.id;
      Data.note = this.dataForm.value.note;
      Data.complaintStatus = this.complaintForm.value.complaintStatus;
      
      this.complaintService.update({note: this.complaintForm.value.note, complaintStatus: this.complaintForm.value.complaintStatus}, id).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al confirmar el reclamo';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        this.error = '';
        Data.id = id;
        this.dataForm.reset();
        this.emitForm.emit(Data);
      });
    }
    else {
      delete Data?.id;
      this.complaintService.create(Data).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al crear el reclamo';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        this.error = '';
        this.dataForm.reset();
        this.emitForm.emit(Data);
      });
    }
  }
}
