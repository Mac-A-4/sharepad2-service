import * as express from 'express'
import {
    ConnectSessionRequestSchema,
    ConnectSessionResponseSchema,
    ConnectSessionRoute,
    CreateSessionRequestSchema,
    CreateSessionResponseSchema,
    CreateSessionRoute,
    CreateDocumentRequestSchema,
    CreateDocumentResponseSchema,
    CreateDocumentRoute,
    DeleteDocumentRequestSchema,
    DeleteDocumentResponseSchema,
    DeleteDocumentRoute,
    RenameDocumentRequestSchema,
    RenameDocumentResponseSchema,
    RenameDocumentRoute,
    TransferDocumentRequestSchema,
    TransferDocumentResponseSchema,
    TransferDocumentRoute,
    UpdateDocumentRequestSchema,
    UpdateDocumentResponseSchema,
    UpdateDocumentRoute,
    ReadDocumentRequestSchema,
    ReadDocumentResponseSchema,
    ReadDocumentRoute,
    ReadSessionRequestSchema,
    ReadSessionResponseSchema,
    ReadSessionRoute,
} from 'sharepad2-model'
import {
    createSession,
} from './api/CreateSession'
import {
    createDocument,
} from './api/CreateDocument'
import {
    connectSession,
} from './api/ConnectSession'
import {
    deleteDocument,
} from './api/DeleteDocument'
import {
    readDocument,
} from './api/ReadDocument'
import {
    readSession,
} from './api/ReadSession'
import {
    renameDocument,
} from './api/RenameDocument'
import {
    transferDocument,
} from './api/TransferDocument'
import {
    updateDocument,
} from './api/UpdateDocument'
import {
    Manager,
} from './data/Manager'

const app = express()

const manager = new Manager()

app.use(express.json())

function route(fn: (body: any) => Promise<any>): (request: any, response: any) => Promise<void> {
    return async function(request: any, response: any) {
        try {
            const responseBody = fn(request.body)
            response.status(200)
            response.json(responseBody)
            return
        } catch (error) {
            response.status(400)
            response.contentType('text/plain')
            response.send(error)
            return
        }
    }
}

app.post(CreateSessionRoute, route(async function(body: any): Promise<any> {
    const requestBody = CreateSessionRequestSchema.parse(body)
    const responseBody = CreateSessionResponseSchema.parse(
        await createSession(manager, requestBody)
    )
    return responseBody
}))

app.post(ConnectSessionRoute, route(async function(body: any): Promise<any> {
    const requestBody = ConnectSessionRequestSchema.parse(body)
    const responseBody = ConnectSessionResponseSchema.parse(
        await connectSession(manager, requestBody)
    )
    return responseBody
}))

app.post(CreateDocumentRoute, route(async function(body: any): Promise<any> {
    const requestBody = CreateDocumentRequestSchema.parse(body)
    const responseBody = CreateDocumentResponseSchema.parse(
        await createDocument(manager, requestBody)
    )
    return responseBody
}))

app.post(DeleteDocumentRoute, route(async function(body: any): Promise<any> {
    const requestBody = DeleteDocumentRequestSchema.parse(body)
    const responseBody = DeleteDocumentResponseSchema.parse(
        await deleteDocument(manager, requestBody)
    )
    return responseBody
}))

app.post(ReadDocumentRoute, route(async function(body: any): Promise<any> {
    const requestBody = ReadDocumentRequestSchema.parse(body)
    const responseBody = ReadDocumentResponseSchema.parse(
        await readDocument(manager, requestBody)
    )
    return responseBody
}))

app.post(ReadSessionRoute, route(async function(body: any): Promise<any> {
    const requestBody = ReadSessionRequestSchema.parse(body)
    const responseBody = ReadSessionResponseSchema.parse(
        await readSession(manager, requestBody)
    )
    return responseBody
}))

app.post(RenameDocumentRoute, route(async function(body: any): Promise<any> {
    const requestBody = RenameDocumentRequestSchema.parse(body)
    const responseBody = RenameDocumentResponseSchema.parse(
        await renameDocument(manager, requestBody)
    )
    return responseBody
}))

app.post(TransferDocumentRoute, route(async function(body: any): Promise<any> {
    const requestBody = TransferDocumentRequestSchema.parse(body)
    const responseBody = TransferDocumentResponseSchema.parse(
        await transferDocument(manager, requestBody)
    )
    return responseBody
}))

app.post(UpdateDocumentRoute, route(async function(body: any): Promise<any> {
    const requestBody = UpdateDocumentRequestSchema.parse(body)
    const responseBody = UpdateDocumentResponseSchema.parse(
        await updateDocument(manager, requestBody)
    )
    return responseBody
}))

app.listen(process.argv[2] || process.env['SHAREPAD2_SERVICE_PORT'] || '3000')
