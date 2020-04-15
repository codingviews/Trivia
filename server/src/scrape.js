const fetch = require('node-fetch');
const cheerio = require('cheerio');

const baseUrl = 'https://www.rd.com/culture/trivia-questions/page';

async function getTriviaPage(pageNum) {
  const url = `${baseUrl}/${pageNum}/`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const containers = $('.card-content');
  console.log(containers.length);

  const questions = [];

  for (let i = 0; i < containers.length; i += 2) {
    const question = $(containers[i]);
    const answer = $(containers[i + 1]);

    questions.push({
      question: question.text(),
      answer: answer.text()
    });

    console.log(questions);
  }
}

getTriviaPage(1);