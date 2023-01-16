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
    authenticateUser,
} from '../util/Authenticator'
import {
    TransferDocumentRequest,
    TransferDocumentResponse,
} from 'sharepad2-model'

export async function transferDocument(manager: Manager, request: TransferDocumentRequest): Promise<TransferDocumentResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    let document = authenticateDocumentAndUserId(session, request.documentId, user.userId)
    authenticateUser(session, request.documentUserId)
    document.documentUserId = request.documentUserId
    return {}
}
