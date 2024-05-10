'use strict'

const { root_type } = require("../../../const/const")
const { balance_sheet_response_from_data } = require("../../../model/dto/account_book")

describe('test balance sheet response from data', () => {
    test('it will return the debit total 9500000, credit total 9500000, balance 0, and accounts grouped by root type', () => {
        const param = {
            data: {
                [root_type.assets]: {
                    total: 4985000,
                    accounts: [
                        {
                            code: "BNK-1",
                            name: "Commonwealth Bank",
                            debit_total: 985000,
                            credit_total: 0
                        },
                        {
                            code: "BNK-2",
                            name: "HSBC",
                            debit_total: 1500000,
                            credit_total: 0,
                        },
                        {
                            code: "BNK-3",
                            name: "Bank Central Asia",
                            debit_total: 7000000,
                            credit_total: 4500000
                        }
                    ],
                },
                [root_type.expenses]: {
                    total: 15000,
                    accounts: [
                        {
                            code: "RNT-1",
                            name: "Office rent",
                            debit_total: 7000,
                            credit_total: 0
                        },
                        {
                            code: "RNT-2",
                            name: "Car rent",
                            debit_total: 8000,
                            credit_total: 0
                        },
                    ]
                },
                [root_type.liabilities]: {
                    total: 1000000,
                    accounts: [
                        {
                            code: 'CC-1',
                            name: 'Credit Cards',
                            debit_total: 0,
                            credit_total: 1000000
                        },
                    ]
                },
                [root_type.equity]: {
                    total: 2500000,
                    accounts: [
                        {
                            code: 'IN-1',
                            name: 'Company investment',
                            debit_total: 0,
                            credit_total: 2500000 
                        },
                    ]
                },
                [root_type.revenue]: {
                    total: 1500000,
                    accounts: [
                        {
                            code: 'SL-1',
                            name: 'Sales',
                            debit_total: 0,
                            credit_total: 1500000
                        },
                    ]
                }
            }
        }

        const exp_ret = {
            data: {
                balance: 0,
                debit_total: 9500000,
                credit_total: 9500000,
                accounts: [
                    {
                        root_type: root_type.assets,
                        total: 4985000,
                        accounts: [
                            {
                                code: "BNK-1",
                                name: "Commonwealth Bank",
                                debit_total: 985000,
                                credit_total: 0
                            },
                            {
                                code: "BNK-2",
                                name: "HSBC",
                                debit_total: 1500000,
                                credit_total: 0,
                            },
                            {
                                code: "BNK-3",
                                name: "Bank Central Asia",
                                debit_total: 7000000,
                                credit_total: 4500000
                            }
                        ]
                    },
                    {
                        root_type: root_type.expenses,
                        total: 15000,
                        accounts: [
                            {
                                code: "RNT-1",
                                name: "Office rent",
                                debit_total: 7000,
                                credit_total: 0
                            },
                            {
                                code: "RNT-2",
                                name: "Car rent",
                                debit_total: 8000,
                                credit_total: 0
                            },
                        ]
                    },
                    {
                        root_type: root_type.liabilities,
                        total: 1000000,
                        accounts: [
                            {
                                code: 'CC-1',
                                name: 'Credit Cards',
                                debit_total: 0,
                                credit_total: 1000000
                            },
                        ]
                    },
                    {
                        root_type: root_type.equity,
                        total: 2500000,
                        accounts: [
                            {
                                code: 'IN-1',
                                name: 'Company investment',
                                debit_total: 0,
                                credit_total: 2500000 
                            },
                        ]
                    },
                    {
                        root_type: root_type.revenue,
                        total: 1500000,
                        accounts: [
                            {
                                code: 'SL-1',
                                name: 'Sales',
                                debit_total: 0,
                                credit_total: 1500000
                            },
                        ]
                    }
                ]
            }
        }

        const ret = balance_sheet_response_from_data(param.data)

        expect(ret).toMatchObject(exp_ret.data)
    })
})