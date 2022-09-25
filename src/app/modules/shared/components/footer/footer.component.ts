import { Component, OnInit } from '@angular/core';


import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userId!: string;
  imgInstaPath= "src/app/utils/insta-logo.jpg";
  constructor(private authService: AuthService) {  }

  ngOnInit(): void {
    const userID = this.authService.session.getValue()?.id;

    if(userID){
        this.userId = userID;
    }
  }

}
