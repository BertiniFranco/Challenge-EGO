import DataAccess from "./DataAccess";

class CategoriaDataAccess extends DataAccess {
    constructor() {
        super();
    }

    async list() {
        await this._get('categoria/');
    }
    async create(data) {
        await this._post('categoria/', data);
    }
    async update(id, data) {
        await this._put('categoria/', id, data);
    }
    async delete(id) {
        await this._destroy('categoria/', id);
    }
}

export default new CategoriaDataAccess();