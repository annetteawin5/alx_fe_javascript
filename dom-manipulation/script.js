const quotes =  [
  { text: "The day ended doesn't mean it's the the end", category: "Motivation" },
  { text: "To be or not to be.", category: "Philosophy" },
  { text: "Think different, Work smart", category: "Inspiration" }
];


function showRandomQuote() {
  console.log(quotes)
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quote-text").textContent = randomQuote.text;
  document.getElementById(
    "quote-category"
  ).textContent = randomQuote.category;
}

// document.getElementById("newQuote").addEventListener("click",showRandomQuote);
function createAddQuoteForm() {
  let dynamicFormContainer = document.querySelector(
    ".dynamicFormContainer"
  );
  const formheading = document.createElement("h2");
  formheading.textContent = "Add new Quote";
  dynamicFormContainer.appendChild(formheading);

  const addNewQuoteTextInput = document.createElement("input");
  addNewQuoteTextInput.id = "AddNewQuote";
  addNewQuoteTextInput.type = "text";
  addNewQuoteTextInput.placeholder = "Add new Quote";
  dynamicFormContainer.appendChild(addNewQuoteTextInput);

  const addNewQuoteCategoryInput = document.createElement("input");
  addNewQuoteCategoryInput.id = "AddNewQuoteCategory";
  addNewQuoteCategoryInput.type = "text";
  addNewQuoteCategoryInput.placeholder = "Add Category";
  dynamicFormContainer.appendChild(addNewQuoteCategoryInput);

  const addQuoteButton = document.createElement("Button");
  addQuoteButton.Id = "QuoteButton";
  addQuoteButton.textContent = "Add Quote";
  dynamicFormContainer.appendChild(addQuoteButton);
  addQuoteButton.addEventListener("click",function(){
    let textValue=addNewQuoteTextInput.value.trim();
    let categoryValue=addNewQuoteCategoryInput.value.trim();
    console.log(textValue)
    console.log(categoryValue)
    quotes.push({text:textValue,category:categoryValue})
  })
}
createAddQuoteForm();
// // function addQuote() {
// //   const textInput = document.getElementById("newQuoteText").value.trim();
// //   const categoryInput = document.getElementById("newQuoteCategory").value.trim();

//   if (textInput && categoryInput) {
//     const newQuote = { text: textInput, category: categoryInput };
//     quotes.push(newQuote);
//     alert("New quote added!");
//     document.getElementById("newQuoteText").value = "";
//     document.getElementById("newQuoteCategory").value = "";
//   } else {
//     alert("Please enter both quote and category.");
//   }
// }