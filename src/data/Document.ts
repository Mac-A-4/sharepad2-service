import {
    generateDocumentId,
} from '../util/Generator'

export class Document {

    public readonly documentId: string

    public documentName: string

    public documentData: string

    public documentUserId: string

    constructor(documentName: string, documentData: string, documentUserId: string) {
        this.documentId = generateDocumentId()
        this.documentName = documentName
        this.documentData = documentData
        this.documentUserId = documentUserId
    }

}
