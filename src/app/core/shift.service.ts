import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shift } from '../modules/shift/models/shift.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export type ShiftResponse = {
  [identifier: string]: Shift & { id: string }
};

export type AdaptedShiftResponse = (Shift & { id: string })[];

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  BASE_URL = 'https://shift-app-6e06d-default-rtdb.europe-west1.firebasedatabase.app/shifts'

  constructor(private httpClient: HttpClient,private router: Router, private authService: AuthService) { }

  getAllShifts() {
    return this.httpClient.get<AdaptedShiftResponse>(this.BASE_URL)
  }

  getShiftsByUserId(id:string){
    return this.httpClient.get<AdaptedShiftResponse>(this.BASE_URL, {
      params: {
        orderBy: `"userId"`,
        equalTo: `"${id}"`
      }
    });
  }

  addNewShift(newShift: Shift) {
    return this.httpClient.post(this.BASE_URL, newShift);
  }

  updateShift(id: string, changedShift: Shift) {
    return this.httpClient.patch(this.BASE_URL + "/" + id, changedShift);
  }


  getShift(id: string) {
    return this.httpClient.get<AdaptedShiftResponse>(this.BASE_URL, {
      params: {
        orderBy: `"id"`,
        equalTo: `"${id}"`
      }
    });
  }

  

}