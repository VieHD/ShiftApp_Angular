import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/modules/user/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,}$'
        )
      ]),
      userName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  getErrorMessageEmail() {
    if (this.registerForm.get("email")?.hasError("required")) {
      return "Please enter an email";
    }
    if (this.registerForm.get("email")?.hasError("pattern")) {
      return "Please enter a valid email";
    }
    return '';
  }

  getErrorMessagePassword() {
    if (this.registerForm.get("password")?.hasError("required")) {
      return "Password Required";
    }
    if (this.registerForm.get("password")?.hasError("pattern")) {
      return "Minumum 6 Characters and At least one : Uppercase, Lowercase, Number and Special Character";
    }
    return '';
  }
  getErrorMessageUserName() {
    if (this.registerForm.get("userName")?.hasError("required")) {
      return "UserName Required";
    }
    return 'At least 6 characters long';
  }

  async onRegisterClick() {
    const { email, password, userName } = this.registerForm.value;

    this.authService
      .signUpUser(email, password, {
        userName: userName,
        email: email,
        firstName: "",
        lastName: "",
        title: "",
        adress: "",
        age: 0,
      })
      .subscribe(
        (data) => (data),
        (error) => {
          this.errorMessage = error.errorMessage;
        }
      );
  }
}
