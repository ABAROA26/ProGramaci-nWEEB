async function getPokeData() {
  const input = document.getElementById("poke_input");
  const listEl = document.getElementById("poke_data");
  const nameEl = document.getElementById("poke_name");
  if (!input || !listEl || !nameEl) return;

  const query = input.value.trim().toLowerCase();
  if (!query) {
    alert("Ingresa el nombre o ID de un Pokémon.");
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        listEl.innerHTML = "Pokémon no encontrado.";
      } else {
        listEl.innerHTML = `Error: ${res.status}`;
      }
      return;
    }

    const data = await res.json();

    // construir contenido
    const img =
      data.sprites.front_default ||
      data.sprites.other?.["official-artwork"]?.front_default ||
      "";

    nameEl.textContent = `${data.name}`;
    listEl.innerHTML = `
      <div style="display:flex;gap:16px;align-items:center">
        ${
          img
            ? `<img src="${img}" alt="${data.name}" style="width:120px;height:120px;object-fit:contain;"/>`
            : ""
        }
        <div>
          
          
        </div>
      </div>`;
  } catch (err) {
    console.error(err);
    listEl.innerHTML = "Ocurrió un error al obtener los datos.";
  }
}
