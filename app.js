const inPutfield = document.querySelector(".field");
const searchBtn = document.querySelector(".searchbtn");
const text = document.querySelector(".text");
const mean1 = document.querySelector(".mean1");
const mean2 = document.querySelector(".mean2");
const mean3 = document.querySelector(".mean3");
const phonentic = document.querySelector(".phonentic");
const syn = document.querySelector(".syn");
const placeHolder = document.querySelector(".placehold");
const resultDisplay = document.querySelector(".resultss");
const loadingText = document.querySelector(".loadingt");

// function that contains everything..
async function searchWord(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    loadingText.classList.remove("hidden");
    const fetchApi = await fetch(apiUrl).then((respond) => respond.json());
    const wordPut = fetchApi[0]?.word || "Word not found";
    const meaning1 =
      fetchApi[0]?.meanings[0]?.definitions[0]?.definition ||
      "Meaning not found";
    const meaning2 =
      fetchApi[0]?.meanings[0]?.definitions[1]?.definition ||
      "Meaning not found";
    const meaning3 =
      fetchApi[0]?.meanings[0]?.definitions[2]?.definition ||
      "Meaning not found";
    const phoney = fetchApi[0]?.phonetic || "Phonetic not found";
    let synonyms = fetchApi[0]?.meanings[0]?.synonyms || [];
    const joinedSyn =
      synonyms.length > 0 ? synonyms.join(", ") : "No synonyms available";

    // displays
    text.textContent = wordPut;
    mean1.textContent = meaning1;
    mean2.textContent = meaning2;
    mean3.textContent = meaning3;
    syn.textContent = joinedSyn;
    phonentic.textContent = phoney;
    // console.log(phoney);
    inPutfield.value = "";
    loadingText.classList.add("hidden");
  } catch (error) {
    console.log(error);
  }
}

// Once the website load
window.addEventListener("DOMContentLoaded", () => {
  placeHolder.classList.remove("hidden");
  resultDisplay.classList.add("hidden");
});
searchBtn.addEventListener("click", () => {
  if (inPutfield.value) {
    searchWord(inPutfield.value);

    placeHolder.classList.add("hidden");
    resultDisplay.classList.remove("hidden");
  }
});
