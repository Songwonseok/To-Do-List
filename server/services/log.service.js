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
            const logDTO = {
                user_id: data.user_id,
                user_id: 4,
                subject : data.content,
                to_column : data.to_column
            }
            await this.logModel.ADD_NOTE(logDTO);
        } catch (err) {
            throw err;
        }
    }

    async updateNote(data) {
        try {
            const logDTO = {
                user_id: data.user_id,
                user_id: 4,
                subject : data,
            }
            await this.logModel.UPDATE_NOTE(logDTO);
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
            const logDTO = {
                user_id: data.user_id,
                user_id: 4,
                subject: data
            }
            await this.logModel.UPDATE_COLUMN(logDTO);
        } catch (err) {
            throw err;
        }
    }
    
    async removeColumn(data) {
        try {
            const logDTO = {
                user_id: data.user_id,
                user_id: 4,
                subject: data
            }
            await this.logModel.REMOVE_COLUMN(logDTO);
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LogService;