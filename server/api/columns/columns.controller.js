const resObject = require('../resObject')
const ColumnsService = require('../../services/columns.service');
class ColumnsController {
    constructor() {
        this.cService = new ColumnsService();

        this.findColumns = async (req, res, next) => {
            try {
                const columns_id = req.params.columnsId;
                const data = await this.cService.findOne(columns_id);
                const response = resObject(200, true, '컬럼 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        };

        this.insertColumns = async (req, res, next) => {
            try {
                const columnsDTO = {
                    name: req.body.name,
                    user_id: req.body.user_id
                }
                const data = await this.cService.create(columnsDTO);
                const response = resObject(200, true, '컬럼 추가 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
        this.updateColumns = async (req, res, next) => {
            try {
                const columnsDTO = {
                    id:req.body.id,
                    name: req.body.name,
                    head: req.body.head
                }
                const data = await this.cService.update(columnsDTO);
                const response = resObject(200, true, '컬럼 수정 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.deleteColumns = async (req, res, next) => {
            try {
                const columns_id = req.params.columnsId;
                const data = await this.cService.delete(columns_id);
                const response = resObject(200, true, '컬럼 삭제 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
    }
}


module.exports = new ColumnsController();
