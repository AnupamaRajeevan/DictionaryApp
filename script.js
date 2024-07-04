const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const exampleEl = document.getElementById("example");
const antonymsEl = document.getElementById("antonyms");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    let definitions = result[0].meanings[0].definitions[0];

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = definitions.definition === undefined ? "Not Found" : definitions.definition;
      exampleEl.innerText = definitions.example === undefined ? "Not Found" : definitions.example;
      antonymsEl.innerText = definitions.antonyms;
      audioEl.src = result[0].phonetics[0].audio;
    }

    
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `an error happened, try again later`;
  }
}
function displayWordDetails(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  if (data && data.word) {
    const word = data.word;
    const synonyms = data.synonyms || [];
    const antonyms = data.antonyms || [];

    resultDiv.innerHTML = `
      <h2>${word}</h2>
      <div class="synonyms-antonyms">
        <p>Synonyms: ${synonyms.join(', ') || 'None'}</p>
        <p>Antonyms: ${antonyms.join(', ') || 'None'}</p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = 'Word not found. Please enter a valid word.';
  }
}


inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

