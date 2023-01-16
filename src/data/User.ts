import {
    generateUserId,
    generateUserToken,
} from '../util/Generator'
import {
    Timer,
} from '../util/Timer'

export class User {

    public static readonly TIMEOUT = 10

    public readonly timer: Timer

    public readonly userId: string

    public readonly userToken: string

    public readonly userName: string

    constructor(userName: string) {
        this.timer = new Timer(User.TIMEOUT)
        this.userId = generateUserId()
        this.userToken = generateUserToken()
        this.userName = userName
    }

}
