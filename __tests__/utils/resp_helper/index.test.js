'use strict'

const httpMocks = require('node-mocks-http');
const { success_helper, error_helper } = require('../../../utils/resp_helper');
const { status_code } = require('../../../const/const');

describe('testing success helper', () => {
    test("if data is not array, it will return the data", () => {
        const resp = httpMocks.createResponse();

        const exp_resp = {
            code: status_code.ok,
            data: {
                id: 1,
            },
            success_data: {
                ok: true, 
                message: 'Success', 
                data: {
                    id: 1
                }
            }
        }

        success_helper(resp, exp_resp.code, exp_resp.data)
        const data = resp._getJSONData()

        expect(exp_resp.success_data.ok).toBe(data.ok)
        expect(exp_resp.success_data.message).toBe(data.message)
        expect(exp_resp.success_data.data).toMatchObject(data.data)
        expect(exp_resp.code).toBe(resp.statusCode)
    })

    test("if data is array, it will return the data in items", () => {
        const resp = httpMocks.createResponse();

        const param = {
            res: resp,
            code: status_code.ok,
            data: [
                {
                    id: 1,
                },
                {
                    id: 2,
                }
            ]
        }

        const exp_ret = {
            code: param.code,
            data: {
                ok: true,
                message: 'Success',
                data: {
                    items: param.data
                }
            }
        }

        success_helper(param.res, param.code, param.data)
        const ret = resp._getJSONData()

        expect(exp_ret.data).toMatchObject(ret)
        expect(exp_ret.code).toBe(resp.statusCode)
    })
})

describe('testing error helper', () => {
    test('if data is error, it will return as message', () => {
        const resp = httpMocks.createResponse();

        const param = {
            res: resp,
            code: status_code.internal_status_error,
            err: new Error("any error")
        }

        const exp_ret = {
            code: param.code,
            data: {
                ok: false,
                message: param.err.toString()
            }
        }

        error_helper(param.res, param.code, param.err)
        const ret = resp._getJSONData()

        expect(exp_ret.data).toMatchObject(ret)
        expect(exp_ret.code).toBe(resp.statusCode)
    })
})