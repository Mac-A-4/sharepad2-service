import {
    Manager,
} from '../data/Manager'
import {
    cleanManager,
} from '../util/Cleaner'
import {
    authenticateSession,
    authenticateUserAndToken,
    authenticateDocument,
} from '../util/Authenticator'
import {
    ReadDocumentRequest,
    ReadDocumentResponse,
} from 'sharepad2-model'

export async function readDocument(manager: Manager, request: ReadDocumentRequest): Promise<ReadDocumentResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    let document = authenticateDocument(session, request.documentId)
    return { documentData: document.documentData }
}
