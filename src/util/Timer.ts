
export class Timer {

    private readonly timeout: number

    private timestamp: number

    private now(): number {
        return (new Date()).getTime()
    }

    constructor(timeout: number) {
        this.timeout = timeout * 1000
        this.timestamp = this.now()
    }

    update() {
        this.timestamp = this.now()
    }

    expired(): boolean {
        return (this.now() - this.timestamp) > this.timeout
    }

}
