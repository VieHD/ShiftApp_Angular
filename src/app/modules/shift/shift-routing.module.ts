import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditShiftComponent } from './components/edit-shift/edit-shift.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { NewShiftComponent } from './components/new-shift/new-shift.component';
import { ShiftsHomeComponent } from './components/shifts-home/shifts-home.component';

const routes: Routes = [
	{
		path: '', component: MainComponent,
		children: [
			{ path: 'myShifts', component: ShiftsHomeComponent },
			{ path: 'new', component: NewShiftComponent },
			{ path: 'edit/:shiftId', component: EditShiftComponent},
			{ path: '', component:LandingPageComponent}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShiftRoutingModule { }
