import { Request } from 'express';

export default {
    hello: async (req: Request) => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Hello World!'
            }),
        };
    },
}