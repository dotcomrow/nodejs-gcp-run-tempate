import { BigQuery } from '@google-cloud/bigquery';

export default {
    handleRequest: async (data: any, user: any) => {        
        const bigquery = new BigQuery({
            projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
            keyFilename: '/secrets/google.key'
        });

        console.log("data", data);
        console.log("user", user);
        return {
            status: 200,
            body: {
                data,
                user
            }
        }
    },
}