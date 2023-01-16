import {
    Manager,
} from '../data/Manager'
import {
    Session,
} from '../data/Session'
import {
    Document,
} from '../data/Document'
import {
    User,
} from '../data/User'

export function authenticateSession(manager: Manager, sessionId: string): Session {
    let session = manager.sessions[sessionId]
    if (session === undefined) {
        throw 'Invalid session id'
    }
    return session
}

export function authenticateUser(session: Session, userId: string): User {
    let user = session.users[userId]
    if (user === undefined) {
        throw 'Invalid user id'
    }
    return user
}

export function authenticateUserAndToken(session: Session, userId: string, userToken: string): User {
    let user = authenticateUser(session, userId)
    if (user.userToken !== userToken) {
        throw 'Invalid user token'
    }
    return user
}

export function authenticateDocument(session: Session, documentId: string): Document {
    let document = session.documents[documentId]
    if (document === undefined) {
        throw 'Invalid document id'
    }
    return document
}

export function authenticateDocumentAndUserId(session: Session, documentId: string, documentUserId: string): Document {
    let document = authenticateDocument(session, documentId)
    if (document.documentUserId !== documentUserId) {
        throw 'Invalid document user id'
    }
    return document
}
