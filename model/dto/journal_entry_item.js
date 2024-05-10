'use strict';

module.exports.journal_entry_item_response_from_dao = (dao) => {
    let item = {
        journal_entry_id: dao.journal_entry_id,
        account_type_id: dao.account_type_id,
        notes: dao.notes,
        debit: dao.debit,
        credit: dao.credit,
        created_at: dao.created_at,
        updated_at: dao.updated_at,
    }

    if (dao.account_type) {
        item['account_type'] = {
            code: dao.account_type.code,
            name: dao.account_type.name,
            root_type: dao.account_type.root_type
        }
    }

    return item
}