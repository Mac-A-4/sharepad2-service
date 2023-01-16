import {
    Session,
} from '../data/Session'
import {
    Manager,
} from '../data/Manager'

export function cleanSession(session: Session) {
    for (let userId in session.users) {
        if (session.users[userId].timer.expired()) {
            for (let documentId in session.documents) {
                if (session.documents[documentId].documentUserId === userId) {
                    delete session.documents[documentId]
                }
            }
            delete session.users[userId]
        }
    }
}

export function cleanManager(manager: Manager) {
    for (let sessionId in manager.sessions) {
        if (manager.sessions[sessionId].timer.expired()) {
            delete manager.sessions[sessionId]
        } else {
            cleanSession(manager.sessions[sessionId])
        }
    }
}
