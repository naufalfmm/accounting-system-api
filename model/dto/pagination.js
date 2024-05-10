'use strict';

module.exports.pagination_request_from_req = (req) => {
    return {
        page: (req.query.page && parseInt(req.query.page) || 1),
        limit: (req.query.limit && parseInt(req.query.limit) || 100)
    }
}

module.exports.pagination_response = (page, limit, total_data) => {
    return {
        page: page,
        limit: limit,
        total_page: Math.ceil(total_data/limit)
    }
}