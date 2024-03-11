import DataAccess from "./DataAccess";

class ModeloDataAccess extends DataAccess {
    async list() {
        await this._get('modelo/');
    }
    async create(data) {
        await this._post('modelo/', data);
    }
    async update(id, data) {
        await this._put('modelo/', id, data);
    }
    async delete(id) {
        await this._destroy('modelo/', id);
    }
}

export default new ModeloDataAccess();