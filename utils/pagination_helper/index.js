'use strict';

module.exports.pagination = (page, limit) => {
    page = (page && parseInt(page) || 1)
    limit = (limit && parseInt(limit) || 100)

    return {
        offset: (page - 1) * limit,
        limit: limit
    }
}