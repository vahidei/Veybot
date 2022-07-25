module.exports = class Answer {

    constructor() {

        let Moods = require('./Moods');
        this.answerList = require(`../Answers/${CURRENT_LANG}/${CURRENT_MOOD}.json`)
        this.moods = new Moods;

    }

    make = (original_message, answer, user_id) => {

        let pos = answer.indexOf('@answer:');

        if (pos == '-1') {

        } else {
            answer = answer.substr(pos + 8, answer.length - 1);
        }

        pos = answer.indexOf('/');
        if (pos == '-1') {
            
        } else {
            let action = answer.split('/')[1];
            let actionClass = new (require('./Action'))(original_message, answer, action, user_id);
            let ans = actionClass.exec();
            return this.make(original_message, ans, user_id)
        }

        if(answer.indexOf('+') == '-1'){
            clients[user_id].answers.push(answer);
            return this.answerList[answer] || answer;
        }

        let anss = answer.split('+');
        let answers = '';
        anss.forEach(item => {
            answers += (this.answerList[item] || item+'.')+' ';
        });
        return answers;

        
    }

}