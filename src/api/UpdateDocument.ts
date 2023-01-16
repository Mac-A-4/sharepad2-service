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
    UpdateDocumentRequest,
    UpdateDocumentResponse,
} from 'sharepad2-model'

export async function updateDocument(manager: Manager, request: UpdateDocumentRequest): Promise<UpdateDocumentResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    let document = authenticateDocumentAndUserId(session, request.documentId, user.userId)
    document.documentData = request.documentData
    return {}
}
