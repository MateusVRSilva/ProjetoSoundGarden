function abrirmodal(carregarmodal){
  let modal = document.getElementById(carregarmodal);
   modal.style.display = 'block';
  }
  
  
  function fechar(fecharmodal){
  let modalfechar = document.getElementById(fecharmodal);
   modalfechar.style.display = 'none';
  }
  



const divEventos = document.getElementById("eventos");

const getEvents = async () => {
  const events = await fetch(`${BASE_URL}/events`).then((result) =>
    result.json()
  );

  events
    .sort((eventoA, eventoB) => new Date(eventoA.scheduled) - new Date(eventoB.scheduled))
    .slice(0, 3)
    .forEach((event) => {
      const article = document.createElement("article");
      article.innerHTML = `
      <article class="evento card p-5 m-3">
        <h2>${event.name} - ${new Date(event.scheduled).toLocaleDateString(
        "pt-BR"
      )}</h2>
        <h4>${event.attractions.join(", ")}</h4>
        <p>
          ${event.description}
        </p>
        <button id="button"  class="btn btn-primary" onclick="abrirmodal('vis-modal')">reservar ingresso</button>
      </article>`;

      divEventos.appendChild(article);
    });
};

getEvents();