export interface ISessionFromLocalStorage {

    "id": string;
    "token": string;

}

export class Session {

    constructor(public id: string, public token: string) { }
}
