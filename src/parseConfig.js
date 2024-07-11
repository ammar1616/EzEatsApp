// src/parseConfig.js
import Parse from 'parse';

const PARSE_APPLICATION_ID = 'Ez3jYlP0wHBqedG8vBuzx6pTObUQGR2HZWJHkl4t';
const PARSE_JAVASCRIPT_KEY = 'LCp4kvD7IH2D3o3CdNGXMydw5kHSQuT46MMjPnGJ';
const PARSE_SERVER_URL = 'https://parseapi.back4app.com';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

export const testParseConnection = async () => {
    try {
        const result = await Parse.Cloud.run('hello');
        console.log('Parse connection successful:', result);
    } catch (error) {
        console.error('Parse connection failed:', error.message);
    }
};

export default Parse;
