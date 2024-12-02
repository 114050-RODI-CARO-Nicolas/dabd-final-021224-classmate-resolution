import { Component } from '@angular/core';
import { ModesService } from '../modes.service';
import { Mode } from '../models/Mode';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
import { Status } from '../models/Status';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent {
  armar: boolean = false;
  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      let request: Status = {
        activated: this.armar,
        userId: this.loginService.user.id || '',
        lastUpdateDate: new Date().toISOString(),
        modeId: this.form.get('mode')?.value,
        id: '',
      };
      console.log(request);
      this.modesService.changeStatus(request).subscribe((data) => {
        console.log(data);
        this.armar=!this.armar;
      });
    }
  }
  form: FormGroup;
  modes: Mode[] = [];

  constructor(
    private modesService: ModesService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.modesService.getModes().subscribe((modes) => (this.modes = modes));
    this.form = this.fb.group({
      mode: ['', Validators.required],
      status: [this.armar, Validators.required],
    });
  }
}
