let quotes = JSON.parse(localStorage.getItem("quotes")) ||   [
  { text: "The day ended doesn't mean it's the the end", category: "Motivation" },
  { text: "To be or not to be.", category: "Philosophy" },
  { text: "Think different, Work smart", category: "Inspiration" }
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}


function showRandomQuote() {
  console.log(quotes)
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quote-text").innerHTML = randomQuote.text;
  document.getElementById(
    "quote-category"
  ).innerHTML = randomQuote.category;
}

// document.getElementById("newQuote").addEventListener("click",showRandomQuote);
function createAddQuoteForm() {
  let quoteFormContainer = document.querySelector(
    ".quoteFormContainer"
  
    
  );
  
  const formheading = document.createElement("h2");
  formheading.textContent = "Add new Quote";
  quoteFormContainer.appendChild(formheading);

  const addNewQuoteTextInput = document.createElement("input");
  addNewQuoteTextInput.id = "AddNewQuote";
  addNewQuoteTextInput.type = "text";
  addNewQuoteTextInput.placeholder = "Add new Quote";
  quoteFormContainer.appendChild(addNewQuoteTextInput);

  const addNewQuoteCategoryInput = document.createElement("input");
  addNewQuoteCategoryInput.id = "AddNewQuoteCategory";
  addNewQuoteCategoryInput.type = "text";
  addNewQuoteCategoryInput.placeholder = "Add Category";
  quoteFormContainer.appendChild(addNewQuoteCategoryInput);

  const addQuoteButton = document.createElement("Button");
  addQuoteButton.Id = "QuoteButton";
  addQuoteButton.textContent = "Add Quote";
  quoteFormContainer.appendChild(addQuoteButton);
  addQuoteButton.addEventListener("click",function(){
    let textValue=addNewQuoteTextInput.value.trim();
    let categoryValue=addNewQuoteCategoryInput.value.trim();
    console.log(textValue)
    console.log(categoryValue)
    quotes.push({text:textValue,category:categoryValue})
  })
}
createAddQuoteForm();

function addQuote(newQuote) {
  quotes.push(newQuote);
  saveQuotes();
}
function loadLastViewedQuote() {
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML = `
      <p>quote.text</p>
      <small>— quote.category</small>
    `;
  }
}

function exportQuotesToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        // populateCategories();
        notifyUser("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Failed to parse the JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}
// Populate category dropdown from quotes
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const lastSelected = localStorage.getItem("selectedCategory");
  if (lastSelected) {
    categoryFilter.value = lastSelected;
    filterQuotes();
  }
}

// Filter quotes by selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);
  
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
  showRandomQuote();
}
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText").value.trim();
  const categoryInput = document.getElementById("newQuoteCategory").value.trim();

  if (textInput && categoryInput) {
    const newQuote = { text: textInput, category: categoryInput };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    postQuoteToServer(newQuote);
    alert("New quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}
function notifyUser(message) {
  const div = document.getElementById("syncNotice");
  div.textContent = message;
  setTimeout(() => (div.textContent = ""), 5000);
}

// fetch quotes from server (GET)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverQuotes = await response.json();
    return serverQuotes.slice(0, 10).map(post => ({
      text: post.title,
      category: `Server-${post.userId}`
    }));
  } catch (error) {
    console.error("Failed to fetch from server:", error);
    return [];
  }
}

//  sync local quotes with server quotes
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  const newQuotes = serverQuotes.filter(
    sq => !quotes.some(local => local.text === sq.text)
  );

  if (newQuotes.length > 0) {
    quotes.push(...newQuotes);
    saveQuotes();
    populateCategories();
    console.log("Quotes synced with server!");
    notifyUser("Quotes synced from server!");
  }
}

//  POST a quote to the server with JSON body
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });

    const result = await response.json();
    console.log("Quote posted to server:", result);
    return result;
  } catch (error) {
    console.error("Failed to post quote to server:", error);
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  createAddQuoteForm();
  populateCategories();
  loadLastViewedQuote();
  syncWithServer(); 
  setInterval(syncWithServer, 30000);
});

function syncQuotes() {
  syncWithServer(); 
}
