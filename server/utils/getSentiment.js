const {SentimentAnalyzer, PorterStemmer, WordTokenizer} = require('natural');
const {removeStopwords} = require('stopword');

const getSentimentLabel = (score) => {
    if (score <= -3) return 'very negative';
    if (score <= -1) return 'negative';
    if (score === 0) return 'neutral';
    if (score <= 2) return 'positive';
    return 'very positive';
};

function getSentiment(text) {
    const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, '');

    const tokenizer = new WordTokenizer();
    const tokenizedText = tokenizer.tokenize(alphaOnlyReview);

    const filteredText = removeStopwords(tokenizedText);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const score = analyzer.getSentiment(filteredText);
    const label = getSentimentLabel(score);

    return {score, label};
}

module.exports = getSentiment;