import axios from 'axios';

const API_URL = 'http://localhost:8000/ego/';

class DataAccess {
    response = null;
    hasError = false;
    error = null;

    resetValues() {
        this.response = null;
        this.hasError = false;
        this.error = null;
    }

    async _get(url, id=null) {
        this.resetValues();
        try {
            this.response = await axios.get(API_URL + url + `${id !== null ? id : ''}`);
        } catch(error) {
            this.hasError = true;
            this.error = error;
        }
    }

    async _post(url, data) {
        this.resetValues();
        try {
            this.response = await axios.post(API_URL + url, data);
        } catch(error) {
            this.hasError = true;
            this.error = error;
        }
    }

    async _put(url, id, data) {
        this.resetValues();
        try {
            this.response = await axios.put(API_URL + url + id, data);
        } catch(error) {
            this.hasError = true;
            this.error = error;
        }
    }

    async _destroy(url, id) {
        this.resetValues();
        try {
            this.response = await axios.delete(API_URL + url + id);
        } catch(error) {
            this.hasError = true;
            this.error = error;
        }
    }
}

export default DataAccess;