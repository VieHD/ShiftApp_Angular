import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { debounceTime, filter, fromEvent } from "rxjs";
import { DEFAULT_DEBOUNCE } from "src/app/constants";
import * as moment from "moment";
import { AdaptedShiftResponse, ShiftService } from "src/app/core/shift.service";
import { Shift } from "../../models/shift.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";

@Component({
  selector: "app-shifts-home",
  templateUrl: "./shifts-home.component.html",
  styleUrls: ["./shifts-home.component.css"],
})
export class ShiftsHomeComponent implements OnInit, AfterViewInit {
  @ViewChild("input") nameSearch!: ElementRef<HTMLInputElement>;
  @ViewChild("inputWork") workSearch!: ElementRef<HTMLInputElement>;
  clear!: string;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private shiftService: ShiftService,
    private router: Router,
    private authService: AuthService
  ) {}
  shifts: AdaptedShiftResponse = [];
  localShifts!: Shift[];

  ngOnInit() {
    this.shiftService
      .getShiftsByUserId(this.authService.loggedInUserId!)
      .subscribe((data) => {
        this.shifts = data;
        this.localShifts = this.shifts;
      });
  }

  onCloseDatePicker() {
    this.localShifts = this.shifts;
    const startDate = moment(this.dateRange.value.start);
    const endDate = moment(this.dateRange.value.end);
    this.localShifts = this.shifts.filter((shift) => {
      const dateOnShift = new Date(shift.date);
      return moment(dateOnShift).isBetween(startDate, endDate);
    });
  }

  onClear() {
    this.dateRange.reset();
    this.shiftService
      .getShiftsByUserId(this.authService.loggedInUserId!)
      .subscribe((data) => {
        this.shifts = data;
        this.localShifts = this.shifts;
      });
  }

  ngAfterViewInit(): void {
    fromEvent(this.nameSearch.nativeElement, "keyup")
      .pipe(debounceTime(DEFAULT_DEBOUNCE), filter(Boolean))
      .subscribe((keyupEvent) => {
        const inputTarget = keyupEvent.target as HTMLInputElement;
        this.localShifts = this.shifts;
        this.localShifts = this.shifts.filter((shift) =>
          shift.shiftName.includes(inputTarget.value)
        );
      });

    fromEvent(this.workSearch.nativeElement, "keyup")
      .pipe(debounceTime(DEFAULT_DEBOUNCE), filter(Boolean))
      .subscribe((keyupEvent) => {
        const inputTarget = keyupEvent.target as HTMLInputElement;
        this.localShifts = this.shifts;
        this.localShifts = this.shifts.filter((shift) =>
          shift.workPlace.includes(inputTarget.value)
        );
      });
  }

  updateShift(shiftToEdit: Shift & { id: string }) {
    this.shiftService
      .updateShift(shiftToEdit.id, {
        ...shiftToEdit,
      })
      .subscribe(() => this.router.navigate(["/shifts/edit/", shiftToEdit.id]));
  }

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
}
