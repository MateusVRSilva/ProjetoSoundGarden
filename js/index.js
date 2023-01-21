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
        <button onclick="btnReservar('${event._id}')" id="${event._id}" class="btn btn-primary">Reservar Ingresso</button>        
      </article>`;

      divEventos.appendChild(article);
      console.log("Adicionado Evento");
    });

};

var idEvento = "";

getEvents();


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
      window.location.href ='index.html';
      
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