import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "../../../user/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  userId!: string;
  helloUser!: string;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userID = this.authService.session.getValue()?.id;

    if (userID) {
      this.userId = userID;
      this.userService.getUser(this.userId).subscribe((data) => {
        this.helloUser = Object.values(data)[0].userName;
      });
    }
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
