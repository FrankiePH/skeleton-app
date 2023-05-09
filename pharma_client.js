const http = require('http');
const queststring = require('querystring');
const fs = require('fs');

// start
var start_message = queststring.stringify({
    'patient_id': 963401,
    'organisation': 013004,
    'type': 'start',
    'data': {}
})

var options = {
    uri: `http://[::1]:8080`,
    port: 8080,
    path: '/start_encounter',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(start_message)
    }
}

var httpreq = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log(`Body: ${chunk}`);
    });
    res.on('end', function() {
        res.send('ok');
    });
});
httpreq.write(start_message);
httpreq.end()

fs.appendFile('log.txt', '[1] Start message sent\n', function(err) {
    if (err) throw err;
    console.log('Saved');
});


function post_encounter_complete() {
    console.log('Posting encounter complete')

    var encounter_complete = queststring.stringify({
        'patient_id': 963401,
        'organisation': 013004,
        'type': 'encounter_complete',
        'data': {}
    });

    var options = {
        uri: `http://[::1]:8080`,
        port: 8080,
        path: '/finish_encounter',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
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
    fs.appendFile('log.txt', '[7] Encounter complete sent\n', function(err) {
        if (err) throw err;
        console.log('Saved');
    });
};


setTimeout(post_encounter_complete, 2500)