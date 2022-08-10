declare namespace NodeJS {
    export interface ProcessEnv {
        ENCRYPT_KEY: string;
        DB_HOST : string;
        TABLE_BOARD : string;
        TABLE_COMMENTS : string;
        TABLE_REPLY : string;
    }
  }