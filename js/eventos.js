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
        <button onclick="btnReservar('${event._id}')" id="${event._id}" class="btn btn-primary">Reservar Ingresso</button>
      </article>`;

      divtodosEventos.appendChild(article);
    });
};

var idEvento = "";

getAllEvents();


function btnReservar(idEvent) { 
  abrirmodal('vis-modal');
  idEvento = idEvent;
  console.log(idEvento, typeof(idEvento)) 
};

function gerarReserva(){
  const nomeReserva = document.getElementById('nome');
  const emailReserva = document.getElementById('email');
  const numTickets = document.getElementById('tickets');


  const newEvent = {
    owner_name: nomeReserva.value,
    owner_email: emailReserva.value,
    number_tickets: numTickets.value,
    event_id: idEvento,
  };

  console.log(newEvent);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),    
  };

  fetch(
    `${BASE_URL}/bookings`,
    requestOptions
  ).then((response) => {
    if (response.ok) {
      alert("Reserva criada com sucesso!");
      window.location.href ='eventos.html';
      
    } else {
      alert("Falha ao realizar reserva!");
      console.log(response.message)
    }
  });      
}


// Funções do Modal

function abrirmodal(carregarmodal){
  let modal = document.getElementById(carregarmodal);
   modal.style.display = 'block';
  }

  function fechar(fecharmodal){
  let modalfechar = document.getElementById(fecharmodal);
   modalfechar.style.display = 'none';
}

  