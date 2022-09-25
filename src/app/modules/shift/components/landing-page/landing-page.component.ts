import { Component, OnInit } from "@angular/core";
import { ShiftService } from "src/app/core/shift.service";
import { Shift } from "../../models/shift.model";
import { AuthService } from "src/app/core/auth.service";
import * as moment from "moment";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {
  shifts!: Shift[];
  thisWeekShifts : Shift[] =[];
  nextWeekShifts : Shift[] =[];

  isShiftThisWeek = (currentShiftDate: string) => {
    const weekStart = moment().clone().startOf("isoWeek");
    const weekEnd = moment().clone().endOf("isoWeek");
    const currentShiftMomentTime = moment(currentShiftDate);

    return currentShiftMomentTime.isBetween(weekStart, weekEnd);
  };

  isShiftUpcoming = (currentShiftDate: string) => {
    const currentShiftMomentTime = moment(currentShiftDate);

    return currentShiftMomentTime.isAfter(moment());
  };

  filterThisWeekShifts = (shifts: Shift[]): Shift[] | [] => {
    return shifts.filter((shift) => this.isShiftThisWeek(shift.date));
  };

  filterUpcomingShifts = (shifts: Shift[]): Shift[] | [] => {
    return shifts.filter((shift) => this.isShiftUpcoming(shift.date));
  };

  

  columns = [
    {
      columnDef: "shiftName",
      header: "Shift Name",
      cell: (element: Shift) => `${element.shiftName}`,
    },
    {
      columnDef: "shiftDate",
      header: "Shift Date",
      cell: (element: Shift) => `${element.date}`,
    },
    {
      columnDef: "startTime",
      header: "Shift Start Time",
      cell: (element: Shift) => `${element.startTime}`,
    },
    {
      columnDef: "endTime",
      header: "Shift End Time",
      cell: (element: Shift) => `${element.endTime}`,
    },
    {
      columnDef: "houerlyWage",
      header: "Hourly Wage",
      cell: (element: Shift) => `${element.hourlyWage + " $"}`,
    },
    {
      columnDef: "profitPerShift",
      header: "Profit/Shift",
      cell: (element: Shift) => `${element.profitPerShift + " $"}`,
    },
    {
      columnDef: "workPlace",
      header: "WorkPlace",
      cell: (element: Shift) => `${element.workPlace}`,
    },
    {
      columnDef: "comments",
      header: "Comments",
      cell: (element: Shift) => `${element.comment}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private shiftService: ShiftService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.shiftService
      .getShiftsByUserId(this.authService.loggedInUserId!)
      .subscribe((data) => {
        this.shifts = data;
        this.thisWeekShifts = this.filterThisWeekShifts(this.shifts)
        this.nextWeekShifts = this.filterUpcomingShifts(this.shifts)
      });
  }
}
