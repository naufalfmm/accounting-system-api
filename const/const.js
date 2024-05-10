'use strict';

module.exports.err = {
    fiscal_range_account_book_exist: Error("Account book with specific fiscal range has been exist"),
    fiscal_start_date_before_end_date: Error("Fiscal start date must be before fiscal end date"),
    journal_date_out_of_range_book_fiscal_date: Error("Journal date is out of range book fiscal date"),
    debit_credit_journal_not_balance: Error("Total debit and credit are not balance"),
    invalid_format: (t, d) => Error(`${t || 'Record'} for ${d} is invalid`),
    record_not_found_format: (data) => Error(`${data || 'Record'} missing`),
}

module.exports.status_code = {
    created: 201,
    ok: 200,
    bad_request: 400,
    internal_status_error: 500,
}

module.exports.root_type = {
    assets: 'ASSETS',
    expenses: 'EXPENSES',
    liabilities: 'LIABILITIES',
    equity: 'EQUITY', 
    revenue: 'REVENUE',
    all: ['ASSETS', 'EXPENSES', 'LIABILITIES', 'EQUITY', 'REVENUE']
}