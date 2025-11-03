const STORAGE_KEY = "miEntrenadorV2";
let entrenador = null;
let pokemonPreview = null;

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const inicio = document.getElementById("inicio");
const formReg = document.getElementById("formReg");
const infoBox = document.getElementById("infoBox");
const tNombre = document.getElementById("tNombre");
const tEmail = document.getElementById("tEmail");
const tInicio = document.getElementById("tInicio");

const qPoke = document.getElementById("qPoke");
const btnBuscar = document.getElementById("btnBuscar");
const preview = document.getElementById("preview");
const imgPrev = document.getElementById("imgPrev");
const namePrev = document.getElementById("namePrev");
const idPrev = document.getElementById("idPrev");
const btnAdd = document.getElementById("btnAdd");
const team = document.getElementById("team");
const btnReset = document.getElementById("btnReset");

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function mostrarInfo() {
  if (!entrenador) return;
  infoBox.classList.remove("hidden");
  tNombre.textContent = entrenador.nombre;
  tEmail.textContent = entrenador.email;
  tInicio.textContent = "Inicio: " + entrenador.inicio;
}

function guardarLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entrenador));
}

function cargarLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    entrenador = JSON.parse(raw);
  } else entrenador = null;
}

function renderTeam() {
  if (!entrenador || !entrenador.equipo || entrenador.equipo.length === 0) {
    team.innerHTML = '<div class="empty">No hay Pokémon aún</div>';
    return;
  }
  team.innerHTML = entrenador.equipo
    .map(
      (p, idx) => `
    <div class="poke" data-idx="${idx}">
      <img src="${p.sprite}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <div class="controls">
        <button class="small fav" title="marcar favorito">${
          p.fav ? "★" : "☆"
        }</button>
        <button class="small danger" title="liberar">Liberar</button>
      </div>
    </div>
  `
    )
    .join("");

  team.querySelectorAll(".poke").forEach((card) => {
    const idx = parseInt(card.dataset.idx, 10);
    card.querySelector(".fav").addEventListener("click", () => {
      entrenador.equipo[idx].fav = !entrenador.equipo[idx].fav;
      guardarLocal();
      renderTeam();
    });
    card.querySelector(".danger").addEventListener("click", () => {
      if (confirm("¿Liberar a " + entrenador.equipo[idx].nombre + "?")) {
        entrenador.equipo.splice(idx, 1);
        guardarLocal();
        renderTeam();
      }
    });
  });
}

cargarLocal();
if (entrenador) mostrarInfo(), renderTeam();

formReg.addEventListener("submit", (e) => {
  e.preventDefault();
  const n = nombre.value.trim();
  const c = correo.value.trim();
  const f = inicio.value;
  const today = new Date().toISOString().split("T")[0];

  let ok = true;
  if (n.length < 3) {
    document.getElementById("errNombre").classList.remove("hidden");
    nombre.classList.add("is-invalid");
    ok = false;
  } else {
    document.getElementById("errNombre").classList.add("hidden");
    nombre.classList.remove("is-invalid");
  }
  if (!isValidEmail(c)) {
    document.getElementById("errEmail").classList.remove("hidden");
    correo.classList.add("is-invalid");
    ok = false;
  } else {
    document.getElementById("errEmail").classList.add("hidden");
    correo.classList.remove("is-invalid");
  }
  if (!f || f < today) {
    document.getElementById("errDate").classList.remove("hidden");
    inicio.classList.add("is-invalid");
    ok = false;
  } else {
    document.getElementById("errDate").classList.add("hidden");
    inicio.classList.remove("is-invalid");
  }

  if (!ok) return;

  entrenador = { id: Date.now(), nombre: n, email: c, inicio: f, equipo: [] };
  guardarLocal();
  mostrarInfo();
  renderTeam();
  alert("Entrenador guardado con éxito");
});

btnReset.addEventListener("click", () => {
  if (confirm("Eliminar entrenador y equipo local?")) {
    localStorage.removeItem(STORAGE_KEY);
    entrenador = null;
    infoBox.classList.add("hidden");
    team.innerHTML = '<div class="empty">No hay Pokémon aún</div>';
  }
});

btnBuscar.addEventListener("click", () => buscarPoke(qPoke.value));
qPoke.addEventListener("keyup", (e) => {
  if (e.key === "Enter") buscarPoke(qPoke.value);
});

async function buscarPoke(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) {
    alert("Escribe un nombre");
    return;
  }
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(q)
    );
    if (!res.ok) {
      preview.classList.add("hidden");
      alert("No encontrado");
      return;
    }
    const data = await res.json();
    pokemonPreview = {
      id: data.id,
      nombre: data.name,
      sprite:
        data.sprites.front_default ||
        data.sprites.other?.["official-artwork"]?.front_default,
      fav: false,
    };
    imgPrev.src = pokemonPreview.sprite || "";
    namePrev.textContent = pokemonPreview.nombre;
    idPrev.textContent = "ID: " + pokemonPreview.id;
    preview.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Error al buscar");
  }
}

btnAdd.addEventListener("click", () => {
  if (!pokemonPreview) {
    alert("No hay Pokémon seleccionado");
    return;
  }
  if (!entrenador) {
    alert("Regístrate primero");
    return;
  }
  if (entrenador.equipo.find((p) => p.id === pokemonPreview.id)) {
    alert("Ya está en tu equipo");
    return;
  }
  entrenador.equipo.push({ ...pokemonPreview });
  guardarLocal();
  renderTeam();
  preview.classList.add("hidden");
  qPoke.value = "";
  alert("Añadido al equipo");
});
