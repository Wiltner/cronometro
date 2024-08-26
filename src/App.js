import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: '00:00:00',
      temperatura: '',
      cidade: '',
    };

    // Lista de cidades (pode ser expandida)
    this.cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Curitiba'];
  }

  // Função para gerar um número aleatório entre 0 e o tamanho da lista de cidades - 1
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  componentDidMount() {
    // ... (restante do código)

    // Busca a temperatura de uma cidade aleatória a cada atualização
    setInterval(() => {
      const cidadeAleatoria = this.cidades[this.getRandomInt(this.cidades.length)];
      this.setState({ cidade: cidadeAleatoria });

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidadeAleatoria}&appid=YOUR_API_KEY&units=metric`)
        .then(response => response.json())
        .then(data => {
          this.setState({ temperatura: Math.round(data.main.temp) });
        })
        .catch(error => console.error('Erro ao buscar a temperatura:', error));
    }, 1000);
  }

  render() {
    return (
      <div>
        <h1>Tempo Atual em {this.state.cidade}</h1>
        <p>Hora: {this.state.hora}</p>
        <p>Temperatura: {this.state.temperatura}°C</p>
      </div>
    );
  }
}

export default App;