'use strict';

const { Model } = require("sequelize");

let used_preloads = [];

const preload_join_type = {
    default: 'default',
    inner: 'inner',
    left: 'left',
    right: 'right'
}

const preload = class {
    alias_type = 'alias'
    model_type = 'model'

    alias
    model
    where
    join_type
    preloads
    type

    constructor(alias, model, where, join_type, preloads) {
        if (!model) {
            this.alias = alias
            this.join_type = join_type || preload_join_type.left
            this.type = this.alias_type
            return
        }

        this.alias = alias
        this.model = model
        this.where = where
        this.join_type = join_type || preload_join_type.left
        this.preloads = preloads
        this.type = this.model_type
    }

    to_opt = (models) => {
        if (this.type === this.alias_type) return this.alias

        let opt = {
            model: this.model,
            as: this.alias,
            required: false
        }

        if (!(this.model instanceof Model)) {
            opt.model = models[this.model]
        }

        if (this.join_type === preload_join_type.inner) opt.required = true
        if (this.join_type === preload_join_type.right) {
            opt.required = false
            opt.right = true
        }

        if (this.where) {
            opt.where = this.where
        }

        if (this.preloads) {
            opt.include = this.preloads.map(preload => preload.to_opt(models))

            if (opt.include.length === 1) opt.include = opt.include[0]
        }

        return opt
    }
}

const preload_orm = class {
    constructor() {}

    get = (models) => {
        if (!used_preloads) {
            return null
        }

        let prelds = []
        for (let i = 0; i < used_preloads.length; i++) {
            prelds.push(used_preloads[i].to_opt(models))
        }

        used_preloads = []

        if (prelds.length === 1) {
            return prelds[0]
        }

        return prelds
    }

    set = (preloads) => {
        used_preloads = preloads
    }

    set_by_alias = (alias) => {
        used_preloads.push(new preload(alias))
    }

    set_by_model = (model, alias, where, join_type, preloads) => {
        used_preloads.push(new preload(alias, model, where, join_type, preloads))
    }
}

const create_preload_by_model = (model, alias, where, join_type, preloads) => {
    return new preload(alias, model, where, join_type, preloads)
}

const create_preload_by_alias = (alias) => {
    return new preload(alias)
}

module.exports = {
    preload_join_type,
    preload_orm,
    create_preload_by_model,
    create_preload_by_alias
}