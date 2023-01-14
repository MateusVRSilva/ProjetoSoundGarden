const divtodosEventos = document.getElementById("todosEventos");

const getAllEvents = async () => {
  const allEvents = await fetch(`${BASE_URL}/events`).then((result) =>
    result.json()
  );
  console.log(allEvents);

  allEvents
    .sort((eventoA, eventoB) => new Date(eventoA.scheduled) - new Date(eventoB.scheduled))
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

      divtodosEventos.appendChild(article);
    });
};

getAllEvents();