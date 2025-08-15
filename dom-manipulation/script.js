const quotes =  [
  { text: "The day ended doesn't mean it's the the end", category: "Motivation" },
  { text: "To be or not to be.", category: "Philosophy" },
  { text: "Think different, Work smart", category: "Inspiration" }
];

function showRandomQuote () {
  const showrandom = Math.floor(Math.random()*quotes.length);
  const randomQuote = quotes[showrandom];
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = randomQuote.text;
}
showRandomQuote();

const newQuoteButton = document.getElementById('newQuote');
newQuoteButton.addEventListener('click', showRandomQuote);

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

function createAddQuoteForm() {
  const container = document.getElementById("quoteFormContainer");
  container.innerHTML = ""; 

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.id = "newQuoteText";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "newQuoteCategory";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
}

