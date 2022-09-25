import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsHomeComponent } from './components/shifts-home/shifts-home.component';
import { NewShiftComponent } from './components/new-shift/new-shift.component';
import { ShiftRoutingModule } from './shift-routing.module';
import { EditShiftComponent } from './components/edit-shift/edit-shift.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { LandingPageComponent } from './components/landing-page/landing-page.component';




@NgModule({
  declarations: [
    ShiftsHomeComponent,
    NewShiftComponent,
    MainComponent,
    EditShiftComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
    
  ]
})
export class ShiftModule { }
