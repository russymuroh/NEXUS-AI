




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUlXVUNUUEwvWmdFVU91K3hOTmxkWVdadkVpZldPckg5OFhHbHIwQWFFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3BRTE1yUXNTbjlLeGIxMHk3c3FjbmdZcjYzcjBKQjZXdWVPUldsSm0xRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLRzl2Z1M4d3JKUUdQU1p3U1RrV2lwZXBiNWZZRVlLSUpMT1Zlczl2QW5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNT3BIeG8zOXdtRUhmK1h2V1Q1Z2U0SHVWUlhLVGRsd08vZVlrUGFrNW1VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdCdHEvUGkySXNkaFEvSkZ0UVhyN3F1TU9ZbTZxdHMxUXJzZmZSTmoxMHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJMRXpnVHh4VTB0SFowYTJVUEtxYmFWR1J0cUtzZlRGUXRESjA0c0FVRHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU01vQWRaeVErVXhVNkgwa0J6cWZ1UHc4Sko4dVNqZkxmRjBVUnRuY3RFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickVCRXl2bjV4dE8xbUt3SVVsZTNGRDdGek9Ud3R6a2FFc21Hd3pqZGNIND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlEycUFDTHZaOE01M2VTQ1RlK0YvRG5RYmM4RkdHeUl3SDhoTERNUTJVZVJHMytqQ3JzSkZDUHpRakxydXVzK2YwTkFHbFI1R0lQNFkvQjJISGJKNENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUyLCJhZHZTZWNyZXRLZXkiOiJPN0F4TTJ5SnkzYzJXWjFRY01BZnd4YXpCS29QblB5Rkdrek9nUkR2YjA0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI4Q1A2WkJYUCIsIm1lIjp7ImlkIjoiMjYzNzg0OTE3MjE5OjEwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTk3ODMxMjI3MDIzNzI6MTBAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPN2I1NndDRUpEbXQ4RUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIxWGRtUTVlNVRtV0o0aWRHbGhtMzJJb0NFMXdOZ2FuWithbnk5WHhtZ1g0PSIsImFjY291bnRTaWduYXR1cmUiOiJEWnRrNTJOa0I5b1o1R1JtVEMwT1BRYlNuOFFkazFKcnBvbEFGTkhmZFllTkVpYzRsT0pXUE9lbmdzWUhBV0hBbm1WYUxkYzBPdXlkR2Uzek1SNGhEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidjl4aUtIem5WSzdjNXBBTVp3TGFDNUV1MnFENU9TampKbDNCQnZ2SkdsTXowMWFxSlMwUVRLZ3RQMXpkQW5MbElBZHZoendrU3JkMEFGQ2ZoT3U4Q0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODQ5MTcyMTk6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZFYzWmtPWHVVNWxpZUluUnBZWnQ5aUtBaE5jRFlHcDJmbXA4dlY4Wm9GKyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnUUF4QUEifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3ODQxODMyLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhsdCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: russymurohprocess.env.OWNER_NAME || "254710772666",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
