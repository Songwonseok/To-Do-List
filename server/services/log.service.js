const LogModel = require('../models/log.model')
const ColumnsModel = require('../models/columns.model')

class LogService {
    constructor() {
        this.logModel = new LogModel();
        this.columnsModel = new ColumnsModel();
    }

    async read(user_id) {
        try {
            const logs = await this.logModel.SELECT_USERLOG(user_id);
            return logs;
        } catch (err) {
            throw err;
        }
    }

    async addNote(data) {
        try {
            await this.logModel.ADD_NOTE(data);
        } catch (err) {
            throw err;
        }
    }

    async updateNote(data) {
        try {
            await this.logModel.UPDATE_NOTE(data);
        } catch (err) {
            throw err;
        }
    }

    async moveNote(data) {
        try {
            await this.logModel.MOVE_NOTE(data);
        } catch (err) {
            throw err;
        }
    }

    async removeNote(data) {
        try {
            await this.logModel.REMOVE_NOTE(data);
        } catch (err) {
            throw err;
        }
    }

    async addColumn(data) {
        try {
            await this.logModel.ADD_COLUMN(data);
        } catch (err) {
            throw err;
        }
    }

    async updateColumn(data) {
        try {
            await this.logModel.UPDATE_COLUMN(data);
        } catch (err) {
            throw err;
        }
    }
    
    async removeColumn(data) {
        try {
            await this.logModel.REMOVE_COLUMN(data);
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LogService;