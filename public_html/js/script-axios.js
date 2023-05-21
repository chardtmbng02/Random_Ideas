const button = document.querySelector("#love-btn");
const love_content = document.querySelector("#love");
const love_credits = document.querySelector("#quote-id");
const admin_content = document.querySelector("#table-content");

// Fetching from api using axios
function fetchQuotes() {
  const url = `http://localhost:5000/api/ideas`;

  axios
    .get(url)
    .then((response) => {
      const api_data = response.data;

      const quote_id = Math.floor(Math.random() * `${api_data.data.length}`);

      if (quote_id <= api_data.data.length) {
        love_content.innerHTML = api_data.data[`${quote_id}`].text;
        love_credits.innerHTML = api_data.data[`${quote_id}`].tag;
      } else {
        love_content.innerHTML = "Id cannot be found";
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Fetching from api to admin

function fetchQuotestoAdmin() {
  const url = `http://localhost:5000/api/ideas`;

  axios.get(url).then((response) => {
    const api_data = response.data;
    console.log(api_data.data.length);

    for (let index = 0; index < api_data.data.length; index++) {
      const table_row = document.createElement("tr");
      table_row.classList.add("text-wrap")
      table_row.innerHTML = `
  
    <td>${api_data.data[index]._id}</td>
    <td>${api_data.data[index].tag}</td>
    <td>${api_data.data[index].text}</td>
    <td>${api_data.data[index].username}</td>
    <td>${api_data.data[index].date}</td>
    <td><a onClick ="deleteQuote()" href="#">Edit</a> | <a href="/delete/${api_data.data[index]._id}">Delete</a> </td>
  
`;
      document.querySelector("#table-content").appendChild(table_row);
    }
  });
}

// deleting record from api using axios
function deleteQuote() {
  const element = document.querySelector("#table-content .status");
  axios
    .delete("http://localhost:5000/api/ideas/6469bbc549652f17923ab304")
    .then(() => (element.innerHTML = "Delete successful"));
}

window.onload = (e) => {
  fetchQuotestoAdmin();
};
