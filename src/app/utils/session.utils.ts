import { ISessionFromLocalStorage, Session } from "../models/session.model";

export const getSessionFromLocalStorage = () => {
    const rawSessionFromLocalStorage = localStorage.getItem('currentSession');
    if (rawSessionFromLocalStorage !== null) {
        const sessionFromLocalStorage: ISessionFromLocalStorage = JSON.parse(rawSessionFromLocalStorage);
        return new Session(
            sessionFromLocalStorage.id,
            sessionFromLocalStorage.token
        );
    }
    return null;
}


export const clearSessionFromLocalStorage = () => {
    localStorage.removeItem('currentSession');
}