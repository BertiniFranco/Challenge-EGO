import DataAccess from "./DataAccess";

class CaracteristicaDataAccess extends DataAccess {
    constructor() {
        super();
    }

    async list() {
        await this._get('caracteristica/');
    }
    async create(data) {
        await this._post('caracteristica/', data);
    }
    async update(id, data) {
        await this._put('caracteristica/', id, data);
    }
    async delete(id) {
        await this._destroy('caracteristica/', id);
    }
}

export default new CaracteristicaDataAccess();