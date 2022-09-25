import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";
import { ShiftService } from "src/app/core/shift.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { Shift } from "../../models/shift.model";

@Component({
  selector: "app-edit-shift",
  templateUrl: "./edit-shift.component.html",
  styleUrls: ["./edit-shift.component.css"],
})
export class EditShiftComponent implements OnInit {
  testdata!:any ;
  shiftId!: any;
  editShiftForm!: FormGroup;
  shiftToEdit!: Shift;
  shiftIdEdit!: string;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {
    this.shiftId = this.currentRoute.snapshot.params;
    this.shiftIdEdit = this.shiftId.shiftId;

    this.editShiftForm = new FormGroup({
      dateControl: new FormControl(),
      startTimeControl: new FormControl(),
      endTimeControl: new FormControl(),
      shiftNameControl: new FormControl(),
      hourlyWageControl: new FormControl(),
      workPlaceControl: new FormControl(),
      commentControl: new FormControl(),
    });

    const { shiftId } = this.currentRoute.snapshot.params;

    this.shiftService.getShift(shiftId).subscribe((data) => {
      this.testdata = data;
      this.shiftToEdit = this.testdata[0];
      this.editShiftForm = new FormGroup({
        dateControl: new FormControl(
          this.shiftToEdit.date,
          Validators.required
        ),
        startTimeControl: new FormControl(
          this.shiftToEdit.startTime,
          Validators.required
        ),
        endTimeControl: new FormControl(
          this.shiftToEdit.endTime,
          Validators.required
        ),
        shiftNameControl: new FormControl(
          this.shiftToEdit.shiftName,
          Validators.required
        ),
        hourlyWageControl: new FormControl(
          this.shiftToEdit.hourlyWage,
          Validators.required
        ),
        workPlaceControl: new FormControl(
          this.shiftToEdit.workPlace,
          Validators.required
        ),
        commentControl: new FormControl(this.shiftToEdit.comment),
      });
    });
  }
  workPlaces = ["Home", "DownTown Office", "Sales Point"];

  ngOnInit(): void { }

  onEditShift() {

    if(this.editShiftForm.value.commentControl === null || this.editShiftForm.value.commentControl === '' ){
      this.editShiftForm.value.commentControl = "-";
    }

    const {
      dateControl,
      startTimeControl,
      endTimeControl,
      shiftNameControl,
      hourlyWageControl,
      workPlaceControl,
      commentControl,
    } = this.editShiftForm.value;
    const editShift = {
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

    if (this.editShiftForm.valid) {
      this.shiftService
        .updateShift(this.shiftIdEdit, {
          ...editShift.value,
          userId: this.authService.loggedInUserId!,
        })
        .subscribe(() => this.router.navigate(["shifts/myShifts"]));
    }
  }
}
