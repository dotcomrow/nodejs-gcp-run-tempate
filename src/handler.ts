import { Request } from 'express';
import { BigQuery } from '@google-cloud/bigquery';

export default {
    handleRequest: async (req: Request) => {        
        const bigquery = new BigQuery({
            projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
            keyFilename: '/secrets/google.key'
        });

        
        return {
            status: 200,
            body: {
                message: "Hello, World!"
            }
        }
    },
}