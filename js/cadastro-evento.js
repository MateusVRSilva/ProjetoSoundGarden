const formCadastroEvento = document.getElementById('formCadastroEvento');

formCadastroEvento.addEventListener('submit', async form => {
  form.preventDefault();

  const nome = document.getElementById('nome');
  const atracoes = document.getElementById('atracoes');
  const descricao = document.getElementById('descricao');
  const data = document.getElementById('data');
  const lotacao = document.getElementById('lotacao');

  const newEvent = {
    name: nome.value,
    poster: 'link da imagem',
    attractions: atracoes.value.split(", "),
    description: descricao.value,
    scheduled: data.value,
    number_tickets: lotacao.value,
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
    `${BASE_URL}/events`,
    requestOptions
  ).then((response) => {
    if (response.ok) {
      alert("Evento cadastrado com sucesso!");
      window.location.href = "admin.html";
      
    } else {
      alert("Falha ao cadastrar evento!");
    }
  });;  
});
