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
    RenameDocumentRequest,
    RenameDocumentResponse,
} from 'sharepad2-model'

export async function renameDocument(manager: Manager, request: RenameDocumentRequest): Promise<RenameDocumentResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    let document = authenticateDocumentAndUserId(session, request.documentId, user.userId)
    document.documentName = request.documentName
    return {}
}
