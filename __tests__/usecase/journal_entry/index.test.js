'use strict';

const dayjs = require("dayjs");
const journal_entry_usecase = require("../../../usecase/journal_entry");

describe('Record Expense', () => {
    test("If no error, it will return the recorded journal", async () => {
        const account_book_id = 5,
            id = 1,
            journal_item_ids = [1,2],
            account_types = [
                {
                    id: 1,
                    code: 'BNK-1',
                    name: 'Commonwealth Bank',
                    debit_sign: 1,
                    credit_sign: -1
                },
                {
                    id: 2,
                    code: 'LOA-1',
                    name: 'Loans Payable',
                    debit_sign: -1,
                    credit_sign: 1,
                }
            ]

        const req = {
            account_book_id: account_book_id,
            datetime: dayjs('2024-05-04T00:00:00+07:00'),
            items: [
                {
                    account_type_id: account_types[0].id,
                    debit: 5000000,
                    credit: 0
                },
                {
                    account_type_id: account_types[1].id,
                    debit: 0,
                    credit: 5000000
                }
            ]
        }

        const mock_persistent = {
            repository: {
                account_book: {
                    get_by_id: jest.fn((id) => {
                        return {
                            id: id,
                            description: 'Book of year',
                            fiscal_start_date: '2024-05-01T00:00:00+07:00',
                            fiscal_end_date: '2025-04-30T23:59:59+07:00'
                        }
                    })
                },
                journal_entry: {
                    create: jest.fn((data) => {
                        data["id"] = id
                        return data
                    })
                },
                journal_entry_item: {
                    bulk_create: jest.fn((items) => {
                        for (let i = 0; i < items.length; i++) {
                            items[i]["id"] = journal_item_ids[i]
                        }

                        return items
                    })
                }
            }
        }

        const mock_resource = {
            pgsql: {
                begin: jest.fn(),
                commit: jest.fn(),
                rollback: jest.fn()
            }
        }

        const usec = new journal_entry_usecase(mock_persistent, mock_resource)

        const ret = await usec.record(req)

        expect(ret.account_book_id).toBe(ret.account_book_id)
    })

    test("if debit and credit are not balance, it will throw error", async () => {
        const account_book_id = 5,
            id = 1,
            journal_item_ids = [1,2],
            account_types = [
                {
                    id: 1,
                    code: 'BNK-1',
                    name: 'Commonwealth Bank',
                    debit_sign: 1,
                    credit_sign: -1
                },
                {
                    id: 2,
                    code: 'LOA-1',
                    name: 'Loans Payable',
                    debit_sign: -1,
                    credit_sign: 1,
                }
            ]

        const req = {
            account_book_id: account_book_id,
            datetime: dayjs('2024-05-04T00:00:00+07:00'),
            items: [
                {
                    account_type_id: account_types[0].id,
                    debit: 4000000,
                    credit: 0
                },
                {
                    account_type_id: account_types[1].id,
                    debit: 0,
                    credit: 5000000
                }
            ]
        }

        const mock_persistent = {
            repository: {
                account_book: {
                    get_by_id: jest.fn((id) => {
                        return {
                            id: id,
                            description: 'Book of year',
                            fiscal_start_date: '2024-05-01T00:00:00+07:00',
                            fiscal_end_date: '2025-04-30T23:59:59+07:00'
                        }
                    })
                },
                journal_entry: {
                    create: jest.fn((data) => {
                        data["id"] = id
                        return data
                    })
                },
                journal_entry_item: {
                    bulk_create: jest.fn((items) => {
                        for (let i = 0; i < items.length; i++) {
                            items[i]["id"] = journal_item_ids[i]
                        }

                        return items
                    })
                }
            }
        }

        const mock_resource = {
            pgsql: {
                begin: jest.fn(),
                commit: jest.fn(),
                rollback: jest.fn()
            }
        }

        const usec = new journal_entry_usecase(mock_persistent, mock_resource)

        await expect(async () => {
            await usec.record(req)
        }).rejects.toThrow()
    })

    test("if datetime is out of range the fiscal date, it will throw error", async () => {
        const account_book_id = 5,
            id = 1,
            journal_item_ids = [1,2],
            account_types = [
                {
                    id: 1,
                    code: 'BNK-1',
                    name: 'Commonwealth Bank',
                    debit_sign: 1,
                    credit_sign: -1
                },
                {
                    id: 2,
                    code: 'LOA-1',
                    name: 'Loans Payable',
                    debit_sign: -1,
                    credit_sign: 1,
                }
            ]

        const req = {
            account_book_id: account_book_id,
            datetime: dayjs('2027-05-04T00:00:00+07:00'),
            items: [
                {
                    account_type_id: account_types[0].id,
                    debit: 4000000,
                    credit: 0
                },
                {
                    account_type_id: account_types[1].id,
                    debit: 0,
                    credit: 5000000
                }
            ]
        }

        const mock_persistent = {
            repository: {
                account_book: {
                    get_by_id: jest.fn((id) => {
                        return {
                            id: id,
                            description: 'Book of year',
                            fiscal_start_date: '2024-05-01T00:00:00+07:00',
                            fiscal_end_date: '2025-04-30T23:59:59+07:00'
                        }
                    })
                },
                journal_entry: {
                    create: jest.fn((data) => {
                        data["id"] = id
                        return data
                    })
                },
                journal_entry_item: {
                    bulk_create: jest.fn((items) => {
                        for (let i = 0; i < items.length; i++) {
                            items[i]["id"] = journal_item_ids[i]
                        }

                        return items
                    })
                }
            }
        }

        const mock_resource = {
            pgsql: {
                begin: jest.fn(),
                commit: jest.fn(),
                rollback: jest.fn()
            }
        }

        const usec = new journal_entry_usecase(mock_persistent, mock_resource)

        await expect(async () => {
            await usec.record(req)
        }).rejects.toThrow()
    })
})