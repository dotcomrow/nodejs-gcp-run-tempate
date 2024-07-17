import { BigQuery } from '@google-cloud/bigquery';
import { Parser } from 'aliexpress-parser';;

export default {
    handleRequest: async (data: any, user: any) => {
        const bigquery = new BigQuery({
            projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
            keyFilename: '/secrets/google.key'
        });

        throw new Error("Not implemented");
            var parser = new Parser();
            parser.search('iphone').then((item) => {

                console.log(item);
            });

        return {
            status: 200,
            body: {
                data,
                user
            }
        }
    },
}