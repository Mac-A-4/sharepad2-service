import {
    Session,
} from './Session'

export class Manager {

    public readonly sessions: {[sessionId: string]: Session}

    constructor() {
        this.sessions = {}
    }

}
