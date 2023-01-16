import {
    Manager,
} from '../data/Manager'
import {
    cleanManager,
} from '../util/Cleaner'
import {
    authenticateSession,
    authenticateUserAndToken,
} from '../util/Authenticator'
import {
    ReadSessionRequest,
    ReadSessionResponse,
} from 'sharepad2-model'

export async function readSession(manager: Manager, request: ReadSessionRequest): Promise<ReadSessionResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = authenticateUserAndToken(session, request.userId, request.userToken)
    user.timer.update()
    return {
        users: Object.entries(session.users).map(([_, e]) => {
            return {
                userId: e.userId,
                userName: e.userName,
            }
        }),
        documents: Object.entries(session.documents).map(([_, e]) => {
            return {
                documentId: e.documentId,
                documentName: e.documentName,
                documentUserId: e.documentUserId,
            }
        }),
    }
}
