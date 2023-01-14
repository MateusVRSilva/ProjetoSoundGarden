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
        <button type="submit" id="${event._id}" class="btn btn-primary">ver reservas</button>
      </article>`;

      divEventos.appendChild(article);
    });
};

getEvents();




/* const btnReservar = document.getElementsByClassName("btn-primary")
console.log(btnReservar);
btnReservar.addEventListener('submit', reservar => {
  reservar.preventDefault();
  console.log("clicou")
}); */
