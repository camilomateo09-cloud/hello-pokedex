const API = "https://pokeapi.co/api/v2";

const typeColors = {
  grass: "#7AC74C", poison: "#A33EA1", fire: "#EE8130", water: "#6390F0",
  bug: "#A6B91A", normal: "#A8A77A", electric: "#F7D02C", ground: "#E2BF65",
  fairy: "#D685AD", fighting: "#C22E28", psychic: "#F95587", rock: "#B6A136",
  ghost: "#735797", ice: "#96D9D6", dragon: "#6F35FC", dark: "#705746",
  steel: "#B7B7CE", flying: "#A98FF3",
};

function pad3(n){ return String(n).padStart(3,"0"); }

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id")) || 1;
  return Math.max(1, Math.min(151, id));
}

async function fetchJson(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error("Error al cargar: " + url);
  return res.json();
}

function goTo(id){
  const safe = Math.max(1, Math.min(151, id));
  window.location.href = `pokemon.html?id=${safe}`;
}

async function loadPokemon(id){
  const [poke, species] = await Promise.all([
    fetchJson(`${API}/pokemon/${id}`),
    fetchJson(`${API}/pokemon-species/${id}`)
  ]);

  // Nombre y número
  document.getElementById("pokeName").textContent = poke.name;
  document.getElementById("pokeNumber").textContent = `#${pad3(poke.id)}`;

  // Imagen (official artwork)
  const img =
    poke.sprites.other?.["official-artwork"]?.front_default ||
    poke.sprites.front_default;

  const imgEl = document.getElementById("pokeImg");
  imgEl.src = img;
  imgEl.alt = poke.name;

  // Tipos
  const typesEl = document.getElementById("types");
  typesEl.innerHTML = "";
  const types = poke.types.map(t => t.type.name);

  types.forEach(t => {
    const pill = document.createElement("span");
    pill.className = "type-pill";
    pill.textContent = t;
    pill.style.background = typeColors[t] || "#777";
    typesEl.appendChild(pill);
  });

  // Color principal (primer tipo)
  const mainColor = typeColors[types[0]] || "#7AC74C";
  document.getElementById("detailRoot").style.background = mainColor;

  // About
  document.getElementById("weight").textContent = (poke.weight / 10).toFixed(1) + " kg";
  document.getElementById("height").textContent = (poke.height / 10).toFixed(1) + " m";
  document.getElementById("ability").textContent =
    (poke.abilities?.[0]?.ability?.name || "-").replaceAll("-", " ");

  // Descripción ES/EN
  const entryEs = species.flavor_text_entries.find(e => e.language.name === "es");
  const entryEn = species.flavor_text_entries.find(e => e.language.name === "en");
  const desc = (entryEs?.flavor_text || entryEn?.flavor_text || "")
    .replace(/\f|\n|\r/g, " ");
  document.getElementById("desc").textContent = desc || "Sin descripción.";

  // Stats con barras
  const statsEl = document.getElementById("stats");
  statsEl.innerHTML = "";

  const labels = {
    hp: "HP", attack: "ATK", defense: "DEF",
    "special-attack": "SATK", "special-defense": "SDEF", speed: "SPD",
  };

  poke.stats.forEach(s => {
    const name = labels[s.stat.name] || s.stat.name.toUpperCase();
    const val = s.base_stat;
    const percent = Math.min(100, Math.round((val / 200) * 100));

    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `
      <div class="stat-name">${name}</div>
      <div class="stat-val">${String(val).padStart(3,"0")}</div>
      <div class="bar"><div style="width:${percent}%; background:${mainColor};"></div></div>
    `;
    statsEl.appendChild(row);
  });

  // Botones
  document.getElementById("prevBtn").onclick = () => goTo(id - 1);
  document.getElementById("nextBtn").onclick = () => goTo(id + 1);
}

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

loadPokemon(getIdFromUrl()).catch(err => {
  document.getElementById("pokeName").textContent = "Error";
  document.getElementById("desc").textContent = err.message;
});