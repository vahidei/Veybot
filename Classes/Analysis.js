module.exports = class Analysis {
    exec = original_message => {
        
        let message = original_message.replace(/[^a-zA-Z ]/g, "");

        let splitted_words = message.split(' ');

        return splitted_words;

    }
}