import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login.service';
import { Zone } from '../models/zone';
import { ModesService } from '../modes.service';
import { RouterLink } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-nuevo-modo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './nuevo-modo.component.html',
  styleUrl: './nuevo-modo.component.css',
})
export class NuevoModoComponent {
  form: FormGroup;
  zonesList: Zone[] = [];
  user:User;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private modesService: ModesService
  ) {
    this.user=this.loginService.user;
    modesService.getZones().subscribe((zones) => (this.zonesList = zones));
    let userId = loginService.user.id || '';

    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userId: [userId, Validators.required],
      creationDate: [new Date(), Validators.required],
      zones: this.fb.array(['']),
    });
  }
  validar(): ValidatorFn | string {
    console.log(this.zonesList);
    return (control: any) => {
      if (this.zonesList.some((zone) => zone.name === control.value)) {
        console.log('existe');
        return { zoneExists: true };
      }
      return null;
    };
  }

  get zones() {
    return this.form.get('zones') as FormArray;
  }

  addZone() {
    let control:FormControl=this.fb.control('');
    control.valueChanges.subscribe((value) => {
      
      this.form.get('zones')?.updateValueAndValidity();
    });
    this.zones.push(control);
  }

  removeZone(index: number) {
    this.zones.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.modesService.createMode(this.form.value).subscribe((data) => {
        console.log(data);
        this.form.reset();
        alert("se creo correctamente");
      });
    }
  }
}
