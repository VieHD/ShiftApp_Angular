interface IShift {
	id?: string;
	userId: string,
	date: string;
	startTime: string;
	endTime: string;
	shiftName: string;
	hourlyWage: number;
	workPlace: string;
	profitPerShift: number;
	comment: string;
}

export class Shift implements IShift {
	userId= '';
	date = '';
	startTime = '';
	endTime = '';
	shiftName = '';
	hourlyWage = 0;
	workPlace = '';
	profitPerShift = 0;
	comment = '';
}

