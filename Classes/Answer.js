module.exports = class Answer {

    constructor() {

        let Moods = require('./Moods');
        let AnswerList = require(`../Answers/${CURRENT_LANG}/${CURRENT_MOOD}.json`)
        this.moods = new Moods;

    }

    make = (answer, user_id) => {

        let pos = answer.indexOf('@answer:');

        if (pos == '-1') {

        } else {
            answer = answer.substr(pos + 8, answer.length - 1);
        }

        pos = answer.indexOf('/');
        if (pos == '-1') {
            
        } else {
            
        }

        clients[user_id].answers.push(answer);

        return answer;
    }



}