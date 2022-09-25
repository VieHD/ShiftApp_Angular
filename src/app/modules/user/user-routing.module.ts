import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

const routes: Routes = [
	{
		path: '', component: UserHomeComponent,
		children: [
			{
				path: 'edit-profile/:userId', component: EditProfileComponent
			}
		]

	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule { }
