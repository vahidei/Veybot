const Similar = require('./Similar');

module.exports = class Analysis {

    constructor() {
        let Answer = require('./Answer');
        this.words = require('../Words/Words.json');
        this.answer = new Answer();
        this.similar = new Similar();
    }

    exec = (original_message, user_id) => {

        let sentences = this.extractSentences(original_message);

        if (!sentences.length) {
            return '';
        }

        let result = '';

        sentences.forEach(sentence => {

            sentence = sentence.toLowerCase();

            clients[user_id].questions.push(sentence);

            let words = this.extractWords(sentence);

            if (words.length) {

                if (this.words.includes(words[0])) {

                    let dictionary = require(`../Words/${words[0]}.json`);
                    result += this.answer.make(
                        this.wordsCheck(words, dictionary),
                        user_id
                    );

                } else {
                    
                    result += this.similar.check(words);

                }

            }

        });

        return result;
    }

    wordsCheck = (words, dictionary, char = 1) => {

        if (words[char] !== undefined) {

            let orWords = Object.keys(dictionary).filter(item => item.includes("|"));

            if (orWords.length) {
                let c = {};
                orWords.forEach(w => {
                    let a = w.split('|');
                    a.forEach(b => {
                        c[b] = w;
                    });
                });
                orWords = c;
            }

            let keyword = dictionary[words[char]];

            if (keyword == undefined) {
                keyword = dictionary[orWords[words[char]]];
            }

            if (keyword !== undefined) {
                if (typeof keyword == 'object') {
                    return this.wordsCheck(words, keyword, char + 1);
                } else {

                    return this.returnVal(words, keyword, char);
                }
            } else {

                let keyword = dictionary['$THING$'];

                if (typeof keyword == 'object') {
                    return this.wordsCheck(words, keyword, char + 1);
                } else {
                    return this.returnVal(words, keyword, char);
                }

            }
        } else {
            return this.returnVal(words, dictionary['$END$'], char);
        }
    }

    returnVal = (words, keyword, char) => {

        let pos = keyword.indexOf('@import:');
        if (pos !== -1) {
            let file = keyword.substr(pos + 8, keyword.length - 1);
            let dict = require(`../Words/Imports/${file}.json`);
            return this.wordsCheck(words, dict, char);
        }
        return keyword;
    }

    extractWords = sentence => {
        return sentence
            .replace(/[^a-zA-Z  0-9]/g, "")
            .split(' ')
            .filter(word => word !== '' && word.length > 1);
    }

    extractSentences = text => {
        return text.replace(/([.?!])\s*/g, "$1|").split("|");
    }



}