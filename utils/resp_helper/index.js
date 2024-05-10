'use strict';

const { status_code } = require("../../const/const");

module.exports.success_helper = (res, code, data) => {
    if (data instanceof Array) {
        return res.status(code).json({
            ok: true,
            message: 'Success',
            data: {
                items: data
            }
        })
    }

    return res.status(code).json({
        ok: true,
        message: 'Success',
        data: data
    })
}

module.exports.error_helper = (res, code, err) => {
    return res.status(code).json({
        ok: false,
        message: err.toString()
    })
}

module.exports.validation_error_helper = (res, val_errs) => {
    let err_msg = ''
    for (let i = 0; i < val_errs.length; i++) {
        err_msg = err_msg + `${val_errs[i].path}: ${val_errs[i].msg}\n`
    }

    return res.status(status_code.bad_request).json({
        ok: false,
        message: err_msg
    })
}