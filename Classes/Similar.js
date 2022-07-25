module.exports = class Similar {

    constructor() {

        let list = require('../Similar/Similar.json');

        this.similars = list;

        this.list = this.#extract(list);

    }

    #extract = (list) => {
        list = Object.keys(list).filter(item => item.includes("|"));
        let c = {};

        list.forEach(w => {
            let a = w.split('|');
            a.forEach(b => {
                c[b] = w;
            });
        });
        return c;
    }

    check = (words, list = this.list) => {

        let priority = {};
        words.forEach(w => {
            if (list[w] !== null) {
                if (priority[list[w]] !== undefined) {
                    priority[list[w]]++;
                } else {
                    priority[list[w]] = 1;
                }
            }
        });

        if (!priority.length) {

            var sortable = [];
            for (var item in priority) {
                sortable.push([item, priority[item]]);
            }

            sortable = sortable.sort((a, b) => { return b[1] - a[1] });

            let result = this.similars[sortable[0][0]];

            if (typeof result == 'object') {
                return this.check(words, result);
            }

            return result;
        }

    }

}