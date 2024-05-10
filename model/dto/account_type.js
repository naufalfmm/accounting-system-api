'use strict';

module.exports.simple_account_type_response_from_dao = (dao) => {
    return {
        code: dao.code,
        name: dao.name,
        root_type: dao.root_type,
        created_at: dao.created_at,
        updated_at: dao.updated_at
    }
}