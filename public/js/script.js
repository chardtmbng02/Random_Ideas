const button = document.querySelector('#love-btn');
const love_content = document.querySelector('#love');
const love_credits = document.querySelector('#quote-id')

button.addEventListener('click', generateQuote);

function generateQuote() {
  const xhr = new XMLHttpRequest();

  xhr.open('Get', 'http://localhost:5000/api/ideas');
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      const quote_id = Math.floor(Math.random() * 11); // generate numbers from 0 to 10
      love_content.innerHTML = data.data[`${quote_id}`].text;
      love_credits.innerHTML = data.data[`${quote_id}`].tag;
      
    } else {
      love_content.innerHTML = 'We cannot load any love quote at the moment. Be right back!';
    }
  };

  xhr.send();
};

document.addEventListener('DOMContentLoaded', generateQuote);