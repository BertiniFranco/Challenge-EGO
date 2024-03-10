import DataAccess from "./DataAccess";

class AutoDataAccess extends DataAccess {
    async list() {
        await this._get('auto/');
    }
    async create(data) {
        await this._post('auto/', data);
    }
    async update(id, data) {
        await this._put('auto/', id, data);
    }
    async delete(id) {
        await this._destroy('auto/', id);
    }
}

export default new AutoDataAccess();