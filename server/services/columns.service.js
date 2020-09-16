const ColumnsModel = require('../models/columns.model')

class ColumnsService {
    constructor() {
        this.columnsModel = new ColumnsModel();
    }

    async findOne(columns_id) {
        try {
            const columns = await this.columnsModel.SELECT(columns_id);
            return columns;
        } catch (err) {
            throw err;
        }
    }

    async create(columnsDTO) {
        try {
                const inserId = await this.columnsModel.INSERT(columnsDTO);
                return inserId;
        } catch (err) {
            throw err;
        }
    }

    async update(columnsDTO) {
        try {
            const changedRows = await this.columnsModel.UPDATE(columnsDTO);
            return changedRows;
        } catch (err) {
            throw err;
        }
    }

    async delete(columns_id) {
        try {
            const affectedRows = await this.columnsModel.DELETE(columns_id);
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ColumnsService;