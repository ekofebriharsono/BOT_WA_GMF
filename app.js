const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'This is Bot WhatsApp GMF Aero Asia'
    });
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    let message = msg.body;
    message = message.toLowerCase();

    if (message == 'hai') {
        msg.reply('Im a bot from *GMF Aero Asia*');
    }
});

app.post('/send_message', (req,res) => {
    const number = req.body.number;
    const message = req.body.message;

    client.sendMessage(number, message).then(response => {
        res.status(200).json({
            status:true,
            response: response
        })
    }).catch(err => {
        res.status(500).json({
            status:true,
            response: err
        })
    });
});

client.initialize();

server.listen(8000, function(){
    console.log('App running on *: 8000');
})