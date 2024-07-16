import { Request } from 'express';
import { GCPBigquery } from "npm-gcp-bigquery";
import { GCPAccessToken } from "npm-gcp-token";
import { GCPUserInfo } from "npm-gcp-userinfo";
import fs from 'node:fs';

export default {
    handleRequest: async (req: Request) => {
        
        var bigquery_token = await new GCPAccessToken(
            fs.readFileSync('/secrets/google.key').toString()
          ).getAccessToken("https://www.googleapis.com/auth/bigquery");
        
        return {
            status: 200,
            body: bigquery_token.access_token
        }
    },
}