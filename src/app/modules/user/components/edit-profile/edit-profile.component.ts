import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../user/user.service";
import { FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  testdata!: any;
  profileToEdit!: Partial<User>;
  profileToEditId!: string;

  titleList = ["Mr.", "Mrs.", "Miss"];

  constructor(
    private currentRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.editProfileForm = new FormGroup({
      emailControl: new FormControl({ value: "This email", disabled: true }),
      firstNameControl: new FormControl(),
      lastNameControl: new FormControl(),
      userNameControl: new FormControl(),
      titleListControl: new FormControl(),
      ageControl: new FormControl(),
      adressControl: new FormControl(),
    });
    const { userId } = this.currentRoute.snapshot.params;
    this.userService.getUser(userId).subscribe((data) => {
      this.testdata = data;
      this.profileToEdit = this.testdata[0];
      this.profileToEditId = this.profileToEdit.id!;
      this.editProfileForm = new FormGroup({
        emailControl: new FormControl({
          value: this.profileToEdit.email,
          disabled: true,
        }),
        firstNameControl: new FormControl(
          this.profileToEdit.firstName,
          [Validators.required, Validators.minLength(2)]
        ),
        lastNameControl: new FormControl(
          this.profileToEdit.lastName,
          [Validators.required, Validators.minLength(2)]
        ),
        userNameControl: new FormControl(
          this.profileToEdit.userName,
          [Validators.required, Validators.minLength(6)]
        ),
        titleListControl: new FormControl(
          this.profileToEdit.title,
          Validators.required
        ),
        ageControl: new FormControl(
          this.profileToEdit.age,
          [Validators.required, Validators.min(6), Validators.max(130)]
        ),
        adressControl: new FormControl(this.profileToEdit.adress),
      });
    });
  }

  getErrorMessageAge(){
    if (this.editProfileForm.get('ageControl')?.hasError('required')) {
      return "Age Required";
    }
    return "Age needs to be between 6 and 130";
  }

  getErrorMessageLastName(){
    if (this.editProfileForm.get('lastNameControl')?.hasError('required')) {
      return "LastName Required";
    }
    return "LastName has to be more than 2 characters";
  }

  getErrorMessageFirstName(){
    if (this.editProfileForm.get('firstNameControl')?.hasError('required')) {
      return "FirstName Required";
    }
    return "FirstName has to be more than 2 characters";
  }

  getErrorMessageUserName(){
    if (this.editProfileForm.get('userNameControl')?.hasError('required')) {
      return "UserName Required";
    }
    return "UserName has to be more than 6 characters";
  }


  ngOnInit(): void {}

  onEditProfile() {
    const {
      emailControl,
      firstNameControl,
      lastNameControl,
      userNameControl,
      titleListControl,
      ageControl,
      adressControl,
    } = this.editProfileForm.value;

    const editProfile:Partial<User> = {
        email: emailControl,
        firstName: firstNameControl,
        lastName: lastNameControl,
        userName: userNameControl,
        title: titleListControl,
        age: ageControl,
        adress: adressControl,
      }

    if (this.editProfileForm.valid) {
      this.userService
        .editUser(this.profileToEditId, {
          ...editProfile,
        })
        .subscribe(() => this.router.navigate(["shifts/myShifts"]));
    }
  }
}