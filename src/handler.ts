import { BigQuery } from '@google-cloud/bigquery';
import { Parser } from 'aliexpress-parser';
import { v4 as uuidv4 } from "uuid";

export default {
    handleRequest: async (data: any, user: any) => {
        const bigquery = new BigQuery({
            projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
            keyFilename: '/secrets/google.key'
        });

        var search = encodeURIComponent(data.search.replace(/ /g, "-"));
        var parser = new Parser();

        parser.search(search).then(async (item: any) => {
            await bigquery.createQueryJob({
                query: `insert into database_dataset.aliexpress_search_results values (
                    '` +
                    data.account_id +
                    `','` +
                    data.search_request_id +
                    `','` +
                    uuidv4() +
                    `',
                    PARSE_JSON('` +
                    JSON.stringify(item) +
                    `'),
                    CURRENT_TIMESTAMP())`
            });
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