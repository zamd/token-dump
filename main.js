import express from 'express';
import jwt from 'jsonwebtoken';
import colors from 'colors';
import json from 'format-json';

const app = express();

function ensureAccessToken(req, _, next) {
    const authzHeader = req.headers['authorization'];
    if (!authzHeader || !authzHeader.startsWith("Bearer "))
        return next("Missing access_token");

    console.log(colors.green(`Processing ${req.originalUrl}`));
    const token = authzHeader.split("Bearer ")[1]
    const decoded = jwt.decode(token, {complete: true});
    console.log(colors.magenta(json.plain(decoded.payload)));
    next();
}


app.use('*', ensureAccessToken, (_,res)=>res.status(200).json({ok: true}));
app.listen(3000, ()=> console.log('ready on port 3000...'));