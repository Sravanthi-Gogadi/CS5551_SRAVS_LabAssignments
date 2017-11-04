var express = require('express');
var app = express();
var request = require('request');
var http = require('http'), https = require('https');


var port = process.env.PORT || 5001;

app.use(express.static(__dirname ));

app.get('/', function(req, res) {
    res.render('index');
})

app.listen(port, function() {
    console.log('app running')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data/:id', function (req,res)
{
    var result1= {'yresult':[]};
    var result2 = {'y2result':[]};
    var result ={'gresult':[]};
    var parts= req.params.id.split('&', 2);
    var search = parts[0];
    var lang= parts[1];


    request('https://kgsearch.googleapis.com/v1/entities:search?query='+search+'&key=AIzaSyAIJC4iA7279Vyq2gLVfzzDmZUooqShUhI&limit=1',
        function (error, response, body) {
            if (error) {
                return console.log('Google Api Error', error);
            }
            if (response.statusCode !== 200) {
                return console.log('Invalid code returned', response.statusCode)
            }
            body = JSON.parse(body);

            var ven = body.itemListElement;
            //console.log(ven);

            var replacedName = ven[0].result.name.replace(/ /g, "%20");
            var replacedDesc = ven[0].result.description.replace(/ /g, "%20");
            var Name = ven[0].result.name;
            console.log(ven[0].result.name);
            var Description = ven[0].result.description;
            console.log(ven[0].result.description);
            var options = {
                host: 'translate.yandex.net',
                port: 443,
                path: '/api/v1.5/tr.json/translate?key=trnsl.1.1.20170913T034651Z.489eb6aa12589e99.525b452bb54efb9faac7e0307e28d7d024576cf1&lang=fr&text=' + replacedName,
                method: 'GET'
            };

            https.request(options, function (res1) {

                res1.setEncoding('utf8');

                res1.on('data', function (chunk) {
                    var rest = null;
                    rest = JSON.parse(chunk);
                    if (rest.code == 200) {
                        console.log(rest.text + '');
                    } else {
                        console.log('ERR ' + chunk);
                    }
                    result1.yresult.push(rest.text);

                });



                var options2 = {
                    host: 'translate.yandex.net',
                    port: 443,
                    path: '/api/v1.5/tr.json/translate?key=trnsl.1.1.20170913T034651Z.489eb6aa12589e99.525b452bb54efb9faac7e0307e28d7d024576cf1&lang='+lang+'&text=' + replacedDesc,
                    method: 'GET'
                };

                https.request(options2, function (res2) {

                    res2.setEncoding('utf8');

                    res2.on('data', function (chunk) {
                        var rest1 = null;
                        rest1 = JSON.parse(chunk);
                        if (rest1.code == 200) {
                            console.log(rest1.text + '');
                        } else {
                            console.log('ERR ' + chunk);
                        }
                        result2.y2result.push(rest1.text);

                    });


                    ,
                        function (error, response, body) {
                            if (error) {
                                return console.log('Google Api Error', error);
                            }
                            if (response.statusCode !== 200) {
                                return console.log('Invalid code returned', response.statusCode)
                            }
                            body = JSON.parse(body);

                            pix= body.hits;
                                                        result.gresult.push({
                                'name': Name,
                                'Category': Description,
                                'translatedCategory': result2.y2result[0].toString(),
                                'translatedName': result1.yresult[0].toString(),
                                'PixabayImage': pix[0].previewURL
                            });

                            res.contentType('application/json');
                            res.write(JSON.stringify(result.gresult));
                            res.end();

                        });
                }).end();
            }).end();
        });





});