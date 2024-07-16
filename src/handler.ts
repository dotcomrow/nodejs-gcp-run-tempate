import { Request } from 'express';

export default {
    handleRequest: async (req: Request) => {
        return {
            status: 200,
            body: {
                message: "Hello World"
            }
        }
    },
}