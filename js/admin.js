const rawEventos = document.getElementById("rawEventos");
const resevasEvento = document.getElementById("resevasEvento");
const eventoDaReserva = document.getElementById("eventoDaReserva");

const getRawEvents = async () => {
  const rawEvents = await fetch(`${BASE_URL}/events`).then((result) =>
    result.json()
  );

let i=0;

    rawEvents
    .sort((eventoA, eventoB) => new Date(eventoA.scheduled) - new Date(eventoB.scheduled))
    .forEach((event) => {
      const tr = document.createElement("tr");
      let eventPosition = Number(Object.keys(rawEvents)[i++]);
      let position = eventPosition + 1;
      let id = event._id;
      console.log(id);
      
      tr.innerHTML = `
      <tr>
        <th scope="row">${position}</th>
          <td>${new Date(event.scheduled).toLocaleDateString(
            "pt-BR"
          )}</td>
          <td>${event.name}</td>
          <td>${event.attractions.join(", ")}</td>
          <td>
            <button onclick="verReservas('${event._id}','${event.name}')" id="${event._id}" class="btn btn-dark">ver reservas</button>
            <a href="editar-evento.html?id=${event._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${event._id}" class="btn btn-danger">excluir</a>
          </td>
      </tr>`; 

      rawEventos.appendChild(tr);
      
    });
};

var idEvento = "";
var nomeEvento = "";

getRawEvents();


function verReservas(idEvent, nomeEvent) { 

  idEvento = idEvent;
  nomeEvento = nomeEvent;
  console.log(idEvento, typeof(idEvento)) 
  console.log(idEvento.length)
  getRawbookings();
};


const getRawbookings = async () => {
  const rawbookings = await fetch(`${BASE_URL}/bookings/event/${idEvento}`).then((result) =>
    result.json()
  );
      rawbookings
      .forEach((event) => {
      const p = document.createElement("p");      
      p.innerHTML = `
      <p>Nome: ${event.owner_name}</p>
      <p>Email: ${event.owner_email}</p>
      <p>Tickets: ${event.number_tickets}
      <p>=============================================</p<`; 

      resevasEvento.appendChild(p);
      
    });
    
    const p2 = document.createElement("p2"); 
    p2.innerHTML = `Evento: ${nomeEvento}`
    eventoDaReserva.appendChild(p2);    
    
    abrirmodal('vis-modal');
};

// Funções do Modal

function abrirmodal(carregarmodal){
  let modal = document.getElementById(carregarmodal);
   modal.style.display = 'block';
  }

  function fechar(fecharmodal){
  let modalfechar = document.getElementById(fecharmodal);  
   modalfechar.style.display = 'none';
   resevasEvento.innerHTML = "";
   eventoDaReserva.innerHTML = "";
}
