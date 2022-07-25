module.exports = class Action {

    constructor(original_message, answer, action, user_id) {
        this.action = action
        this.user_id = user_id
        this.answer = answer.split('/')[0]
        this.original_message = original_message
    }

    exec() {

        let set = this.#checkSet();
        if(set !== false){

            let value = set[1];
            if(set[1].startsWith('$')){
                let ex = value.substring(1).split('$');
                let mex = this.original_message.split(' ')
                let values = '';
                ex.forEach(index => {
                    values += mex[index] || ''
                });
                value = values
            }

            clients[this.user_id].data[set[0]] = value
            return '@answer:'+this.answer
        }

        let get = this.#checkGet();
        if(get !== false){
            if(get !== undefined){
                return '@answer:'+this.answer+'+'+get
            }
            return '@answer:'+this.action.split('|')[1]
        }

        let wiki = this.#checkWiki();
        wiki.then(res => {
            sockets[this.user_id].emit('message', res.data.parse.text['*']);
        })
        if(wiki !== false){
            return '@answer:'+this.answer
        }
    }

    #checkSet() {

        let pos = this.action.indexOf('@set:');
        let set = '';
        if (pos == '-1') {
            return false
        } else {
            set = this.action.substr(pos + 5, this.action.length - 1);
            let ex = set.split('=');
            return ex;
        }

    }


    #checkGet() {

        let pos = this.action.indexOf('@get:');
        let get = '';
        if (pos == '-1') {
            return false
        } else {
            get = this.action.substr(pos + 5, this.action.length - 1).split('|')[0];
            return clients[this.user_id].data[get]
        }

    }

    #checkWiki() {

        let pos = this.action.indexOf('@wiki:');

        if (pos == '-1') {
            return false;
        } else {
            let wiki = this.action.substr(pos + 6, this.action.length - 1);
            const axios = require('axios').default;
            let msg = this.original_message.split(' ');
            return axios.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + msg[2]);
        }

    }
}