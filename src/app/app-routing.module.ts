import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./modules/auth/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch:'full'},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },
  { path: 'shifts', loadChildren: () => import('./modules/shift/shift.module').then((m) => m.ShiftModule), canActivateChild: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule), canActivateChild: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
