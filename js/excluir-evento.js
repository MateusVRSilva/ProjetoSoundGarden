const formExcluirEvento = document.getElementById("excluir-evento");
const inputNome = document.getElementById("nome");
const inputBanner = document.getElementById("banner");
const inputAtracoes = document.getElementById("atracoes");
const inputDescricao = document.getElementById("descricao");
const inputData = document.getElementById("data");
const inputLotacao = document.getElementById("lotacao");
const btnExcluir = document.getElementById("excluir");


// const { location: { search } } = window;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id)

const obterEvento = async () => {

  const evento = await fetch(`${BASE_URL}/events/${id}`).then((result) =>
    result.json()
  );
  inputNome.value = evento.name;
  inputBanner.value = evento.poster;
  inputAtracoes.value = evento.attractions.join(", ");
  inputDescricao.value = evento.description;
  inputData.value = evento.scheduled.split(".")[0];
  inputLotacao.value = evento.number_tickets;
}

obterEvento();

formExcluirEvento.addEventListener('submit', async form => {
  form.preventDefault();

  const corfimAction = confirm('Tem certeza que deseja EXCLUIR o evento?')

  if(corfimAction == true){
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },    
    };
  
    const resposta = await fetch(
      `${BASE_URL}/events/${id}`,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        alert("Evento Excluído com sucesso!");
        window.location.href ='admin.html';
      } else {
        alert("Falha ao excluir evento!");
      }
    });
  } else {
    alert('Ação cancelada!')
    console.log(id)
  }
});