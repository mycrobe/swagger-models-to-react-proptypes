#!/usr/bin/env node

var SwaggerClient = require('swagger-client');
var _ = require('lodash');

var swaggerParsers = {
    '1.2': require('../parsers/1.2'),
    '2.0': require('../parsers/2.0')
};

var options = require('minimist')(process.argv.slice(2));
var url = options.schemaURL || options._[0];

var client = new SwaggerClient({
    url: url,
    success: function() {
        if (!_.has(swaggerParsers, client.swaggerVersion)) {
            throw new Error('Unsupported swagger version - ' + client.swaggerVersion);
        }
        swaggerParsers[client.swaggerVersion](client, options);
    }
});