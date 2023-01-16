import {
    Manager,
} from '../data/Manager'
import {
    cleanManager,
} from '../util/Cleaner'
import {
    authenticateSession,
    authenticateUserAndToken,
    authenticateDocumentAndUserId,
} from '../util/Authenticator'
import {
    DeleteDocumentRequest,
    DeleteDocumentResponse,
} from 'sharepad2-model'

export async function deleteDocument(manager: Manager, request: DeleteDocumentRequest): Promise<DeleteDocumentResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    let document = authenticateDocumentAndUserId(session, request.documentId, user.userId)
    delete session.documents[document.documentId]
    return {}
}
