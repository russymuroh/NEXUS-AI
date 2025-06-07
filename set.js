




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUVmODBUbUNZZWtVYVU5N056RFh2NStxVHlERUpqVjVQUWQ3dXl2NmZsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXRiWFR3RFUxai9ybTlQMkNDN0VoYkZNdVlBbmwxM00rbkhMWHpKMjhpWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2T3lMTDB2aUtmazJzVFpZdjBMV0h2bmlCaUE2U0NPdExwRmNjdFM3M1c0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvdDBiZEZ2blFhNEJDN1pCdXA3WEoyL1pKMDZUMWVhWVFESjRyRkpwblRrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFKMlFHWWlZdkM5NUhsbFZySERVTjZTMFNrMEJaTHl1aWZ0NmFkWVRhR0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJuSVZmekhvbjJwL0M4T0wyUWIyUGN2cThoUDNOL1hFSnVia21nRFVabGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0o0Uk5NbThtR08wR1dPWkVTeVpkS1pzZ0tVT0lkMXNqcUt3Z0hTNGYzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUm5mSXhIdWZQWWZVUXFDYUE1b0xOZ2RCem5wWUNSbHJ4eWFleTNSSUYxQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNyT3crbVJtS1Z2Z3hXT0NXMG5ON3h2WlQwZ05DLzdJRlpQalhaUjBmYTh2c2dKNVJOTWczaUpqam1KZWVVWitwQm5TbFIrZ0d1Q0dBcVR1VEl0MmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJIOXo4QjVxUzNYK2xLd1lrdG81cHYrME5TZ1FaNDViRWlVN0F4WlJGb2VrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4NDkxNzIxOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxNTdBRjY4MjE4OUExODgxRjBFNjQ2NTFFMDEzRjU0RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5MzEzMDQwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODQ5MTcyMTlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjNFRUMyRUYzMjlEM0QzNEI0RUEwOTQ4MTlGNEU1MDEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTMxMzA0Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg0OTE3MjE5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjkzNEMxN0QxNzFENUQ1RDMxMkFCRTA0MEQzNzI0MTM3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDkzMTMwNjh9XSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ilo0RzVXVFc4IiwibWUiOnsiaWQiOiIyNjM3ODQ5MTcyMTk6MjNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxOTc4MzEyMjcwMjM3MjoyM0BsaWQiLCJuYW1lIjoi8J2TofCdk77wnZO88J2TvPCdlIIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0srMnl2SUZFUDdMa2NJR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNYM2F6R0dydGZjUDJRSStJTWdoeUk2c081TmRiR1FHNzI5QU52ODRGVjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikp0andVQjJOSTRRZDdPZjFBTERXUWIwOE5LelFLUnlMeUorY3g2NHd0VXpFQklrT2Y5bC9nQlhWcC90cFJhWXgzc0psczdOWWpXYjBvdkVhYUlsdkR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI4Z2J4elIzNmZxNUdSYXExaVNoNmMrTVIxTUhNSnhVVnBFNDNNczAyUDJHVER2bUlRSmIyN3ZIOHZ1V3hHbGtrcE1kb20raWpNOXhFZVBjcjJtcm1nUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NDkxNzIxOToyM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiRjkyc3hocTdYM0Q5a0NQaURJSWNpT3JEdVRYV3hrQnU5dlFEYi9PQlZlIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdRQXhBQSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDkzMTMwMzcsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS2c0In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: russymurohprocess.env.OWNER_NAME || "263784917219",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Russy muroh",              
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
