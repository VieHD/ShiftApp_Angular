import { Component} from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import { ShiftService } from "src/app/core/shift.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-shift",
  templateUrl: "./new-shift.component.html",
  styleUrls: ["./new-shift.component.css"],
})
export class NewShiftComponent {
  newShiftForm!: FormGroup;
  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private router: Router
  ) {
    this.newShiftForm = new FormGroup({
      dateControl: new FormControl(null, Validators.required),
      startTimeControl: new FormControl(null, Validators.required),
      endTimeControl: new FormControl(null, Validators.required),
      shiftNameControl: new FormControl(null, Validators.required),
      hourlyWageControl: new FormControl(null, Validators.required),
      workPlaceControl: new FormControl(null, Validators.required),
      commentControl: new FormControl(null, ),
    });
  }

  workPlaces = ["Home", "DownTown Office", "Sales Point"];

  onAddShift() {

    if(this.newShiftForm.value.commentControl === null || this.newShiftForm.value.commentControl === ' ' ){
      this.newShiftForm.value.commentControl = "-";
    }
    
    const {
      dateControl,
      startTimeControl,
      endTimeControl,
      shiftNameControl,
      hourlyWageControl,
      workPlaceControl,
      commentControl,
    } = this.newShiftForm.value;

    const newShift = {
      value: {
        date: dateControl,
        startTime: startTimeControl,
        endTime: endTimeControl,
        shiftName: shiftNameControl,
        hourlyWage: hourlyWageControl,
        workPlace: workPlaceControl,
        comment: commentControl,
        profitPerShift:
          (parseInt(endTimeControl) - parseInt(startTimeControl)) *
          hourlyWageControl,
      },
    };

    if (this.newShiftForm.valid) {
      this.shiftService
        .addNewShift({
          ...newShift.value,
          userId: this.authService.loggedInUserId!,
        })
        .subscribe(() => this.router.navigate(["shifts/myShifts"]));
    }
  }
}
