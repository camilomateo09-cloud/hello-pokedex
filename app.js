const API = "https://pokeapi.co/api/v2";

const grid = document.getElementById("pokemonGrid");
const hint = document.getElementById("hint");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortBtn = document.getElementById("sortBtn");

const typeFilter = document.getElementById("typeFilter");

const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

let allPokemon = [];
let filteredPokemon = [];

let sortAsc = true;
let currentPage = 1;
const pageSize = 24;

function pad3(n){
  return String(n).padStart(3,"0");
}

async function fetchJson(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error("Error cargando: " + url);
  return res.json();
}

/* Render por página */
function render(){
  grid.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / pageSize));
  if(currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filteredPokemon.slice(start, end);

  pageItems.forEach(p => {
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

  pageInfo.textContent = `${currentPage} / ${totalPages}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  hint.textContent = filteredPokemon.length ? "" : "No se encontraron resultados.";
}

/* Aplica búsqueda + filtro tipo + orden */
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;

  let list = allPokemon;

  // 1) Búsqueda por nombre o id
  if(q){
    list = list.filter(p =>
      p.name.includes(q) || String(p.id).includes(q)
    );
  }

  // 2) Filtro por tipo (ej: fire)
  if(selectedType){
    list = list.filter(p => p.types.includes(selectedType));
  }

  // 3) Orden
  list = [...list].sort((a,b) => sortAsc ? a.id - b.id : b.id - a.id);

  filteredPokemon = list;

  // cada vez que cambias filtros, vuelves a la página 1
  currentPage = 1;
  render();
}

/* Cargar 151 Pokémon con tipos */
async function loadPokemon(){
  hint.textContent = "Cargando Pokémon y tipos...";

  // lista base
  const data = await fetchJson(`${API}/pokemon?limit=151&offset=0`);

  // 151 requests (para tipos) — OK para el ejercicio
  const promises = data.results.map(async (item, idx) => {
    const id = idx + 1;

    const details = await fetchJson(`${API}/pokemon/${id}`);
    const types = details.types.map(t => t.type.name);

    return {
      id,
      name: item.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      types
    };
  });

  allPokemon = await Promise.all(promises);

  hint.textContent = "";
  applyFilters();
}

/* ===== Eventos ===== */

searchInput.addEventListener("input", applyFilters);

searchInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") applyFilters();
});

searchBtn.addEventListener("click", () => {
  applyFilters();
  searchInput.focus();
});

sortBtn.addEventListener("click", () => {
  sortAsc = !sortAsc;
  applyFilters();
});

typeFilter.addEventListener("change", applyFilters);

prevPageBtn.addEventListener("click", () => {
  currentPage--;
  render();
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  render();
});

/* Iniciar */
loadPokemon().catch(err => {
  hint.textContent = "Error: " + err.message;
});
