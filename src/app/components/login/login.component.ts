import {  Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild('input') input!: ElementRef;
  loginForm!: FormGroup;
  errorReason = '';
  errorMessage = '';

  constructor(private authService: AuthService, private currentRoute: ActivatedRoute, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }

  async onLoginClick() {
    const { email, password } = this.loginForm.value;
    this.authService.signInUser(email, password).subscribe(
      (data) => (data),
      (error) => {
        this.errorMessage = error.errorMessage;
      }
    );
  }

  onRegisterClick(){
    this.router.navigate(["/auth/register/"]);
  }

  ngOnInit(): void {
    this.errorReason = this.currentRoute.snapshot.queryParams?.['error'];
  }

}
