const API = "https://pokeapi.co/api/v2";
const grid = document.getElementById("pokemonGrid");
const hint = document.getElementById("hint");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");

let allPokemon = [];
let sortAsc = true; // true = 001.., false = reverse

function pad3(n){ return String(n).padStart(3,"0"); }

async function fetchJson(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error("Error cargando " + url);
  return res.json();
}

function render(list){
  grid.innerHTML = "";

  list.forEach(p => {
    const a = document.createElement("a");
    a.className = "pokemon-card";
    a.href = `pokemon.html?id=${p.id}`;
    a.innerHTML = `
      <span class="number">#${pad3(p.id)}</span>
      <img src="${p.img}" alt="${p.name}">
      <p class="name">${p.name}</p>
    `;
    grid.appendChild(a);
  });

  hint.textContent = list.length ? "" : "No se encontraron resultados.";
}

function applySearch(){
  const q = searchInput.value.trim().toLowerCase();
  let filtered = allPokemon;

  if(q){
    filtered = allPokemon.filter(p =>
      p.name.includes(q) || String(p.id).includes(q)
    );
  }

  // orden actual
  filtered = [...filtered].sort((a,b) => sortAsc ? a.id-b.id : b.id-a.id);
  render(filtered);
}

async function loadFirst151(){
  hint.textContent = "Cargando Pokémon...";
  // trae lista básica
  const data = await fetchJson(`${API}/pokemon?limit=151&offset=0`);

  // construye ids/imágenes sin pedir 151 fetch extra
  allPokemon = data.results.map((item, idx) => {
    const id = idx + 1;
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return { id, name: item.name, img };
  });

  applySearch();
  hint.textContent = "";
}

searchInput.addEventListener("input", applySearch);

sortBtn.addEventListener("click", () => {
  sortAsc = !sortAsc;
  applySearch();
});

loadFirst151().catch(err => {
  hint.textContent = "Error cargando Pokédex: " + err.message;
});