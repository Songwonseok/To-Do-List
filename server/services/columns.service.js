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
            columnsDTO.subject = `column ${columnsDTO.name}`
            return columnsDTO;
        } catch (err) {
            throw err;
        }
    }

    async update(columnsDTO) {
        try {
            await this.columnsModel.UPDATE(columnsDTO);
        } catch (err) {
            throw err;
        }
    }

    async rename(columnsDTO) {
        try {
            const origin = await this.cService.findOne(columnsDTO.id);
            await this.columnsModel.UPDATE(columnsDTO);
            return `Column ${origin.name} -> ${columnsDTO.name}`
        } catch (err) {
            throw err;
        }
    }

    async delete(columns_id) {
        try {
            const origin = await this.cService.findOne(columns_id);
            await this.columnsModel.DELETE(columns_id);
            return `Column ${origin.name}`
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ColumnsService;