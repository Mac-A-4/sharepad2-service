import {
    Manager,
} from '../data/Manager'
import {
    User,
} from '../data/User'
import {
    cleanManager,
} from '../util/Cleaner'
import {
    authenticateSession,
} from '../util/Authenticator'
import {
    ConnectSessionRequest,
    ConnectSessionResponse,
} from 'sharepad2-model'

export async function connectSession(manager: Manager, request: ConnectSessionRequest): Promise<ConnectSessionResponse> {
    cleanManager(manager)
    let session = authenticateSession(manager, request.sessionId)
    session.timer.update()
    let user = new User(request.userName)
    user.timer.update()
    session.users[user.userId] = user
    return { userId: user.userId, userToken: user.userToken }
}
