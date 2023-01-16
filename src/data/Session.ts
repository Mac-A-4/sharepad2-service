import {
    generateSessionId,
} from '../util/Generator'
import {
    Timer,
} from '../util/Timer'
import {
    Document,
} from './Document'
import {
    User,
} from './User'

export class Session {

    public static readonly TIMEOUT = 60

    public readonly timer: Timer

    public readonly sessionId: string

    public readonly users: {[userId: string]: User}

    public readonly documents: {[documentId: string]: Document}

    constructor() {
        this.timer = new Timer(Session.TIMEOUT)
        this.sessionId = generateSessionId()
        this.users = {}
        this.documents = {}
    }

}
