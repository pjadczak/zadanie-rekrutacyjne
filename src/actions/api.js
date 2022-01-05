import axios from 'axios';

export const url = 'http://localhost:3004/';

const api = (path,data,callBack, method = 'post') => {

    const headers={ 
        'Content-type': 'application/json',
        'Host-Address': window.location.protocol+'//'+window.location.host,
    };
    axios({
        method,
        url: url+path,
        data,
        headers
    }).then(res => {
        callBack({
            result: true, 
            data: (res.data?.data !== undefined ? res.data.data : res.data),
            messages: getMessages(res.data.message)
        });
    }).catch(error => {
        if (error.response==null){
            return false;
        }
        if (error.toString().indexOf('Error: timeout of')>=0){
            callBack({
                result: false,
                data: null,
                messages: [{ title: 'Error', message: 'Koniec czasu na wykonanie zapytania', type: 'error' }],
                errors: [],
                errCode: 99,
                message: error.response.data.error.message !== undefined ? error.response.data.error.message : ''
            });
        } else {

            callBack({ 
                result: false, 
                data: error.response.data, 
                messages: getMessages(error.response.data.message), 
                error: error.response.data.error !== undefined ? error.response.data.error : []
            });

        }
    });

}

export default api;

const getMessages = (data) => {
    const messages = [];
    if (!data) return messages;
    for (const [key, value] of Object.entries(data)) {
        if (value.length>0){
            value.forEach(obj => {
                messages.push({ type: key, title: obj.title, message: obj.message });
            });
        }
    }
    return messages;
}
