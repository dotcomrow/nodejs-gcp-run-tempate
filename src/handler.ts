import { BigQuery } from '@google-cloud/bigquery';
import { Parser } from 'aliexpress-parser';
import { GCPLogger } from "npm-gcp-logging";
import { GCPAccessToken } from "npm-gcp-token";
import { v4 as uuidv4 } from "uuid";

export default {
    handleRequest: async (data: any, user: any) => {
        const bigquery = new BigQuery({
            projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
            keyFilename: '/secrets/google.key'
        });

        if (!process.env.GCP_LOGGING_CREDENTIALS || !process.env.GCP_LOGGING_PROJECT_ID || !process.env.K_SERVICE) {
            throw new Error("environment variables is not defined");
        }
        
        var logging_token = await new GCPAccessToken(
            process.env.GCP_LOGGING_CREDENTIALS
        ).getAccessToken("https://www.googleapis.com/auth/logging.write");
          

        var search = encodeURIComponent(data.search.replace(/ /g, "-"));
        var parser = new Parser();

        await GCPLogger.logEntry(
            process.env.GCP_LOGGING_PROJECT_ID,
            logging_token.access_token,
            process.env.K_SERVICE,
            [
            {
                severity: "INFO",
                // textPayload: message,
                jsonPayload: {
                    configuration: data,
                    search: search,
                },
            },
            ]
        );
        
        parser.search(search).then(async (item: any) => {
            try {
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
            } catch (e) {
                if (!process.env.GCP_LOGGING_CREDENTIALS || !process.env.GCP_LOGGING_PROJECT_ID || !process.env.K_SERVICE) {
                    throw new Error("environment variables is not defined");
                }
                await GCPLogger.logEntry(
                    process.env.GCP_LOGGING_PROJECT_ID,
                    logging_token.access_token,
                    process.env.K_SERVICE,
                    [
                    {
                        severity: "ERROR",
                        // textPayload: message,
                        jsonPayload: {
                            e
                        },
                    },
                    ]
                );
            }
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