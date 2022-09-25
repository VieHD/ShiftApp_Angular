import { ShiftResponse } from "../core/shift.service";

export * from "./session.utils";

export const adaptResponse = (data: ShiftResponse) =>
    Object.keys(data).map((id) => {
        const currentElement = data[id];
        return {
            ...currentElement,
            id
        }
    })