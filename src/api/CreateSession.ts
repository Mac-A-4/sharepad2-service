import {
    Manager,
} from '../data/Manager'
import {
    Session,
} from '../data/Session'
import {
    cleanManager,
} from '../util/Cleaner'
import {
    CreateSessionRequest,
    CreateSessionResponse,
} from 'sharepad2-model'

export async function createSession(manager: Manager, request: CreateSessionRequest): Promise<CreateSessionResponse> {
    cleanManager(manager)
    let session = new Session()
    session.timer.update()
    manager.sessions[session.sessionId] = session
    return { sessionId: session.sessionId }
}
