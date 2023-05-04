const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http');
const queststring = require('querystring');

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/start_encounter', (req, res) => {
    /*
    This endpoint recieves a start request from pharma client. 
    It then posts the assessment request to the tympa server
    */
    console.log('Recieved start request')
    console.log('Posting assessment request...');

    var assessment_request = JSON.stringify({
        'patient_id': 963401,
        'organisation': 013004,
        'type': 'assessment_request',
        'data': {}
    });

    var options = {
        uri: `http://[::1]:${port}`,
        port: 8000,
        path: '/assessment_request',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(assessment_request)
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
    httpreq.write(assessment_request);
    httpreq.end();
});

app.post('/finish_encounter', (req, res) => {
    /*
    This endpoint recieved a post request from pharma client telling it the encounter has been completes
    It then sends an encounter_complete request to the tympa server
    */
    console.log('Encounter completed');
    console.log('Posting encounter complete request...');

    var encounter_complete = JSON.stringify({
        'patient_id': 963401,
        'organisation': 013004,
        'type': 'encounter_complete',
        'data': {}
    });

    var options = {
        uri: `http://[::1]:${port}`,
        port: 8000,
        path: '/encounter_complete',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(encounter_complete)
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
    httpreq.write(encounter_complete);
    httpreq.end();
});

app.post('/assessment_report', (req, res) => {
    /*
    This endpoint recieves the assessment report from the tympa server
    */
    console.log('Assessment report recieved')
});

app.listen(port, () => {
    console.log(`Listerning on port: ${port}`)
});