const rawEventos = document.getElementById("rawEventos");

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
            <a href="reservas.html" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${event._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${event._id}" class="btn btn-danger">excluir</a>
          </td>
      </tr>`; 

      rawEventos.appendChild(tr);
      
    });
};

getRawEvents();