const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http');
const queststring = require('querystring');
const fs = require('fs');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function post_finish_request() {
    console.log('Posting tympa device finish message')

    var tympa_device_finish = queststring.stringify({
        'patient_id': 963401,
        'organisation': 013004,
        'type': 'tympa_device_finish',
        'data': {}
    });

    var options = {
        uri: `http://[::1]:${port}`,
        port: 8000,
        path: '/tympa_device_finish',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(tympa_device_finish)
        }
    };

    var httpreq = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log(`Body: ${chunk}`);
        });
        res.on('end', function() {
            res.send('ok');
        });
    });
    httpreq.write(tympa_device_finish);
    httpreq.end();
    fs.appendFile('log.txt', '[10] Finish event sent\n', function(err) {
        if (err) throw err;
        console.log('Saved');
    });
};

app.post('/start_event', (req, res) => {
    /*
    This endpoint recieves a start event and sets a timer.
    Once the timer has ran it will send a finish event to the tympa server
    */
    console.log('Recieved start event')
    console.log(`Starting timer for 5 seconds...`)

    fs.appendFile('log.txt', '[6] Recieved starter event\n', function(err) {
        if (err) throw err;
        console.log('Saved');
    });

    setTimeout(post_finish_request, 10000)
})

app.listen(port, () => {
    console.log(`Listerning on port: ${port}`)
});