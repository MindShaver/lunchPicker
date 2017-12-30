'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /lunch
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: 
     * produces: application/json, text/json
     * responses: 200
     * operationId: lunch_post
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/lunch',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
