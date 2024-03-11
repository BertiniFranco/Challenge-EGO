class Notifier {
    _enqueueSnackbar = null;

    constructor(enqueueSnackbar) {
        this._enqueueSnackbar = enqueueSnackbar;
    }

    notifyApiError(api) {
        this._enqueueSnackbar(api.error.response.data !== '' ? api.error.response.data :
            `${api.error.code}: ${api.error.message}`, {
            variant: 'error',
            autoHideDuration: 2000
        });
    }

    notifySuccess(message) {
        this._enqueueSnackbar(message, {
            variant: 'success',
            autoHideDuration: 2000
        });
    }

    notifyInfo(message) {
        this._enqueueSnackbar(message, {
            variant: 'info',
            autoHideDuration: 2000
        });
    }
}

export default Notifier;