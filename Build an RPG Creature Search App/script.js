const creaturesUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature";
const searchBtn = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const typesDiv = document.getElementById("types");
const personalDetailsContainer = document.querySelector(".personal-details-container");
const statsContainer = document.querySelector(".details-container");

let creaturesList = []

const handleInput = () => {
  const input = document.getElementById("search-input").value;
  if (!input) {
    alert('Enter name or id of the creature');
    return;
  }

  getCreatureData(input);
}

searchBtn.addEventListener("click",handleInput)

document.getElementById("search-input").addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    handleInput();
  }
})

const fetchCreaturesList = async () => {
  try {
    const res = await fetch(creaturesUrl);
    const data = await res.json();
    creaturesList = data;
  } catch (err) {
    console.log("Error", err);
    return;
  }
}

fetchCreaturesList();



const getCreatureData = async (input) => {
  try {
    const res = await fetch(`${creatureUrl}/${input.toLowerCase()}`);

    if(!res.ok) {
      throw new Error("Not Found");
    }

    const data = await res.json();
    showCreature(data);
    
  } catch (err) {
    alert("Creature not found")
    resetUI();
    return;
  }
}

const showCreature = (data) => {
  const {
    id,
    name, 
    weight,
    height,
    special,
    stats,
    types
  } = data;

  document.getElementById("creature-name").textContent = name.toUpperCase();
  document.getElementById("creature-id").textContent = `#${id}`;
  document.getElementById("weight").textContent = `Weight: ${weight}`;
  document.getElementById("height").textContent = `Height: ${height}`;

  typesDiv.innerHTML = "";
  types.forEach(({name}) => {
    typesDiv.innerHTML += `<p class="type">${name.toUpperCase()}</p>`;
  });

  document.getElementById("hp").textContent = stats[0].base_stat;
  document.getElementById("attack").textContent = stats[1].base_stat;
  document.getElementById("defense").textContent = stats[2].base_stat;
  document.getElementById("special-attack").textContent = stats[3].base_stat;
  document.getElementById("special-defense").textContent = stats[4].base_stat;
  document.getElementById("speed").textContent = stats[5].base_stat;
;
}

const resetUI = () => {
  document.getElementById("creature-name").textContent = "";
  document.getElementById("creature-id").textContent = "";
  document.getElementById("weight").textContent = "";
  document.getElementById("height").textContent = "";
  typesDiv.innerHTML = "";

  document.getElementById("hp").textContent = "0";
  document.getElementById("attack").textContent = "0";
  document.getElementById("defense").textContent = "0";
  document.getElementById("special-attack").textContent = "0";
  document.getElementById("special-defense").textContent = "0";
  document.getElementById("speed").textContent = "0";
}