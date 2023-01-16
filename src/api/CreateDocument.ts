import {
    Manager,
} from '../data/Manager'
import {
    Document,
} from '../data/Document'
import {
    cleanManager,
} from '../util/Cleaner'
import {
    authenticateSession,
    authenticateUserAndToken,
} from '../util/Authenticator'
import {
    CreateDocumentRequest,
    CreateDocumentResponse,
} from 'sharepad2-model'

export async function createDocument(manager: Manager, request: CreateDocumentRequest): Promise<CreateDocumentResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    let document = new Document(request.documentName, request.documentData, user.userId)
    session.documents[document.documentId] = document
    return { documentId: document.documentId }
}
