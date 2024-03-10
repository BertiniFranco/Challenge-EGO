import DataAccess from "./DataAccess";

class MarcaDataAccess extends DataAccess {
    constructor() {
        super();
    }

    async list() {
        await this._get('marca/');
    }
    async create(data) {
        await this._post('marca/', data);
    }
    async update(id, data) {
        await this._put('marca/', id, data);
    }
    async delete(id) {
        await this._destroy('marca/', id);
    }
}

export default new MarcaDataAccess();