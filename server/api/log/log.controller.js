const resObject = require('../resObject')
const LogService = require('../../services/log.service');
class LogController {
    constructor() {
        this.lService = new LogService();

        this.getUserLogs = async (req, res, next) => {
            try {
                const user_id = req.session.userInfo.id;
                const data = await this.lService.read(user_id);
                const response = resObject(200, true, '로그 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, (err.sqlMessage) ? err.sqlMessage : err.message, null);
                res.send(response);
            }
        };

        this.insertNoteLog = async (req, res, next) => {
            const logData =req.logData;
            try {
                await this.lService.addNote(logData);
                logData.addedBy = req.session.userInfo.name;
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(201, true, '노트 추가 성공', logData);
                res.send(response);
            }
        }
        this.editNoteLog = async (req, res, next) => {
            const logData = req.logData;
            logData.user_id = req.session.userInfo.id;
            try {
                await this.lService.updateNote(logData);
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(200, true, '노트 내용 변경', logData);
                res.send(response);
            }
        }

        this.moveNoteLog = async (req, res, next) => {
            const logData = req.logData;
            if(!logData)
                res.send({message: null});

            logData.user_id = req.session.userInfo.id;
            try {
                await this.lService.moveNote(logData);
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(200, true, '노트 위치 변경', logData);
                res.send(response);
            }
        }

        this.removeNoteLog = async (req, res, next) => {
            const logData = req.logData;
            logData.user_id = req.session.userInfo.id;
            try {
                await this.lService.removeNote(logData);
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(200, true, '노트 삭제 성공', logData);
                res.send(response);
            }
        }

        this.insertColumnLog = async (req, res, next) => {
            const logData = req.logData;
            logData.user_id = req.session.userInfo.id;
            try {
                await this.lService.addColumn(logData);
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(201, true, '컬럼 추가 성공', logData);
                res.send(response);
            }
        }

        this.editColumnLog = async (req, res, next) => {
            const logData = req.logData;
            logData.user_id = req.session.userInfo.id;
            try {
                await this.lService.updateColumn(logData);
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(200, true, '컬럼 이름변경 성공', logData);
                res.send(response);
            }
        }

        this.removeColumnLog = async (req, res, next) => {
            const logData = req.logData;
            logData.user_id = req.session.userInfo.id;
            try {
                await this.lService.removeColumn(logData);
            } catch (err) {
                console.error(err);
            } finally {
                const response = resObject(200, true, '컬럼 삭제 성공', logData);
                res.send(response);
            }
        }
    }
}


module.exports = new LogController();
