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

