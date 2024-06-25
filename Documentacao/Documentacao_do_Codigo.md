

## </> Documentação do Código<a name = "documentacao"></a>

## 📝 Índice
- src/ 
	- [App.js](#appjs)
	- [server.js ](#serverjs)
	- src/Charts
		- [BarChart.js ](#BarChartjs)
		- [PieChart.js ](#PieChartjs)
	- src/Collapsibles 
		- [Collapsible.js ](#Collapsiblejs)
		- [InnerCollapsible.js ](#InnerCollapsiblejs)
		- [InnerCollapsible2.js ](#InnerCollapsible2js)
		- [useUsers.js ](#useUsersjs)
	- src/Navbar
		- [navbar.js ](#navbarjs)
	- src/News
		- [News.js ](#Newsjs)
	- src/Weather
		- [WeatherWidget.js ](#WeatherWidgetjs)

### src/App.js  <a name = "appjs"></a>

O ficheiro **App.js** é um componente principal da aplicação React que utiliza a biblioteca react-router-dom para a navegação entre diferentes rotas. Este componente integra múltiplos subcomponentes, como gráficos, widgets e elementos colapsáveis, e gere o estado de utilizadores e contagens de números aleatórios.

- **Importações**![Importações no codigo](https://i.ibb.co/w0SxYG0/image.png)
	-	**React**: Biblioteca principal para construção de interfaces de utilizador.
	- **react-router-dom**: Utilizada para criar um sistema de navegação baseado em rotas.
	- **Componentes personalizados**: Navbar, gráficos (BarChart, PieChart), elementos colapsáveis (Collapsible), widget de clima (WeatherWidget) e notícias (News).
	- **CSS**: Ficheiro de estilos para a aplicação.

- **Função Principal** `App`
![enter image description here](https://i.ibb.co/SRCVSQV/image.png)
	 - **useUsers**: Hook personalizado que gere o estado dos utilizadores e contagens de números aleatórios, e retorna funções e variáveis necessárias.

- **Mapeamento de Utilizadores para Elementos Colapsáveis**
![Mapeamento de Utilizadores para Elementos Colapsáveis](https://i.ibb.co/mHCcDKS/image.png)
	-   **collapsibles**: Mapeia os utilizadores para um formato adequado para os componentes `Collapsible`.

- **Renderização dos Gráficos**
![Renderização dos Gráficos](https://i.ibb.co/PrdvG2p/image.png)

	-   **renderCharts**: Função que renderiza dois gráficos (BarChart e PieChart) com as contagens de números aleatórios. Inclui mensagens de erro para problemas com Axios e WebSocket.

- **Renderização dos Elementos Colapsáveis**![Renderização dos Elementos Colapsáveis](https://i.ibb.co/QHkCM9z/image.png)
	-   **renderCollapsibles**: Função que mapeia e renderiza os elementos colapsáveis com base nos utilizadores.


- **Estrutura de Navegação e Componentes**
![Estrutura de Navegação e Componentes](https://i.ibb.co/GdyggHW/image.png)

	- **Router**: Componente que encapsula toda a aplicação, permitindo a navegação entre diferentes rotas.
	-   **Navbar**: Barra de navegação fixa no topo.
	-   **Switch**: Componente que renderiza apenas a primeira rota que corresponder ao caminho atual.
	-   **Route**: Define diferentes caminhos da aplicação:
		-   **"/"**: Rota principal que renderiza os gráficos, widget de clima e componente de notícias.
	    -   **"/users"**: Rota que renderiza os elementos colapsáveis com base nos utilizadores.

- **Exportação**
![Exportação](https://i.ibb.co/pnm6gJf/image.png)
	-   **export default App**: Exporta o componente `App` como padrão, tornando-o disponível para importação noutros ficheiros.

### src/server.js <a name = "serverjs"></a>

Este ficheiro **server.js** implementa um servidor utilizando Express e WebSocket, e conecta-se a uma base de dados MongoDB. A aplicação gere utilizadores e transmite atualizações em tempo real para clientes WebSocket conectados.

- **Importações**
![Importações](https://i.ibb.co/hKdTWZj/image.png)
	-   **express**: Framework web para Node.js.
	-   **mongoose**: Biblioteca para modelagem de dados MongoDB em Node.js.
	-   **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
	-   **WebSocket**: Biblioteca para implementar WebSockets em Node.js.
	-   **uuid**: Biblioteca para gerar identificadores únicos universais (UUIDs).
	-   **chalk**: Biblioteca para colorir o texto no terminal.

- **Configuração Inicial**
![Configuração Inicial](https://i.ibb.co/vjWLHDb/image.png)
	-   **app**: Instância da aplicação Express.
	-   **console.clear()**: Limpa o terminal.
	-   **app.use(cors())**: Habilita CORS.
	-   **app.use(express.json())**: Habilita o parsing de JSON no corpo das requisições.
	
- **Conexão ao MongoDB**
![Conexão ao MongoDB](https://i.ibb.co/z2Ck4Fp/image.png)
	-   **uri**: URL de conexão ao MongoDB.
	-   **connectToMongo**: Função assíncrona para conectar ao MongoDB. Em caso de falha, tenta reconectar após 1 segundo.


- **Esquema e Modelo do Utilizador**
![enter image description here](https://i.ibb.co/K0FcKQg/image.png)

	-   **userSchema**: Define a estrutura dos documentos de utilizador.
	-   **User**: Modelo mongoose baseado no esquema `userSchema`.

- **Configuração do Servidor**
![Configuração do Servidor](https://i.ibb.co/sFG6WwZ/image.png)
	-   server**: Inicia o servidor na porta 1000.
	-   **wss**: Instância do servidor WebSocket.

- **Gestão de Conexões WebSocket**
![Ge*stão de Conexões WebSocket](https://i.ibb.co/nsK5zGT/image.png)
	-   **connection**: Evento disparado quando uma nova conexão WebSocket é estabelecida. Atribui um ID único a cada conexão e atualiza o número de clientes conectados.



- **Broadcast de Utilizadores**
![Broadcast de Utilizadores](https://i.ibb.co/TbLknY3/image.png)
	-   **broadcastUsers**: Função assíncrona que envia dados dos utilizadores para todos os clientes WebSocket conectados.

- **Configuração do Change Stream**
![Configuração do Change Stream](https://i.ibb.co/MpVYCjS/image.png)
	-   **setupChangeStream**: Função que configura um change stream no MongoDB para monitorizar mudanças nos documentos de utilizador e enviar atualizações aos clientes WebSocket.


- **Roteamento Express**
![Roteamento Express](https://i.ibb.co/YRN5DXc/image.png)

	-   **"/"**: Endpoint raiz que responde com uma mensagem de conexão bem-sucedida.
	-   **"/api/users"**: Endpoint para obter todos os utilizadores.
	-   **"/api/users/:position**": Endpoint para obter utilizadores por posição.
	-   **"/api/users/:id**": Endpoint para atualizar um utilizador específico.

- **Gestão de Upgrade de Protocolo**
![ Gestão de Upgrade de Protocolo](https://i.ibb.co/ss63G66/image.png)
	-   **upgrade**: Evento que lida com pedidos de upgrade de protocolo, permitindo conexões WebSocket.

- **Gestão de Encerramento**
![Gestão de Encerramento](https://i.ibb.co/vB7mHkM/image.png)
	-   **SIGINT**: Evento que lida com o sinal de interrupção (Ctrl+C) para encerrar a aplicação de forma segura, fechando o change stream e a conexão MongoDB.
	-   **disconnected**: Evento que tenta reconectar ao MongoDB se a conexão for perdida inesperadamente.




### src/News/News.js <a name = "Newsjs"></a>

- **Objetivo do Componente:** O componente `News` é responsável por exibir as principais manchetes de notícias obtidas da API NewsAPI.
![imports](https://i.ibb.co/KKfdNnx/image.png)

**Estado:**

-   **noticias**: Armazena as notícias obtidas da API.
-   **loading**: Indica se as notícias estão sendo carregadas.
-   **error**: Armazena mensagens de erro em caso de falha ao carregar as notícias.
![const](https://i.ibb.co/WcfsQQR/image.png)
**Efeitos (Hooks `useEffect`):**

-   **Efeito de Carregamento Inicial:**
    -   Realiza uma requisição assíncrona para obter as notícias da API ao montar o componente.
    -   Atualiza o estado **noticias** com os dados recebidos da API.
    -   Atualiza o estado **loading** para indicar o término do carregamento.
    -   Em caso de erro, atualiza o estado **error** com uma mensagem apropriada.  ![effect](https://i.ibb.co/PQGvd6N/image.png)
    - **Efeito de Redimensionamento da Janela (`resize`):**

-   Monitora o redimensionamento da janela para ajustar dinamicamente o tamanho do widget de notícias.
-   Chama a função **adjustWidgetSize** para ajustar a altura do container de notícias com base na altura atual.
- ![effect2](https://i.ibb.co/c63CjLd/image.png)
- **Funções:**

-   **`adjustWidgetSize`**:
    -   Verifica a altura do container de notícias (**news-container**).
    -   Define uma altura fixa de 410px se a altura atual for maior que esse valor.
    -   Define altura automática caso contrário.![const](https://i.ibb.co/QjjM7wh/image.png)
    
   **Renderização Condicional:**

-   **Exibição de Erro:**
    -   Renderiza uma mensagem de erro caso ocorra um problema ao carregar as notícias.![if](https://i.ibb.co/GQznSCN/image.png)

**Exibição de Notícias:**

-   Renderiza as manchetes das notícias após o término do carregamento.
-   Exibe um indicador de carregamento enquanto as notícias estão sendo carregadas.
-   Para cada notícia, exibe o título **title**) e a descrição (**description**) como links clicáveis que abrem em uma nova aba.![enter image description here](https://i.ibb.co/3fqR60D/image.png)



### src/Weather/WeatherWidget.js <a name = "WeatherWidgetjs"></a>

**Objetivo do Componente:** O componente **WeatherWidget**   exibe previsões meteorológicas para os próximos dias com base na localização atual do usuário.
![import](https://i.ibb.co/QDJ14p0/image.png)
**Estado:**

-   **weatherData**: Armazena os dados da previsão meteorológica obtidos da API.
-   **error**: Armazena mensagens de erro em caso de falha ao obter os dados.
-   **widgetRef** e **userLanguageRef**: Referências para o elemento do widget e para o idioma do usuário, respectivamente.![const](https://i.ibb.co/YLP8Vcp/image.png)

**Efeitos (Hooks `useEffect`):**

-   **Efeito de Carregamento Inicial:**
    -   Obtém a localização atual do usuário usando **navigator.geolocation**.
    -   Com base na localização, determina o idioma do usuário para exibir os dados meteorológicos no idioma correto.
    -   Realiza uma requisição assíncrona para obter os dados meteorológicos da API OpenWeatherMap.
    -   Atualiza o estado **weatherData** com os dados filtrados para exibir somente as previsões a cada 24 horas.
    -   Chama a função **adjustWidgetHeight** para ajustar a altura do widget conforme necessário.![effect](https://i.ibb.co/vzFPs2w/image.png)
   
   **Efeito de Redimensionamento da Janela (`resize`):**

-   Monitora o redimensionamento da janela para ajustar dinamicamente a altura do widget de acordo com o conteúdo.![effect2](https://i.ibb.co/mD8PcB6/image.png)

**Persistência de Estado (`localStorage`):**

-   Salva o estado do widget (dados meteorológicos, erro e altura) no **localStorage** antes de fechar a janela ou atualizar a página.
-   Recupera o estado salvo do **localStorage** ao iniciar o componente para restaurar o estado anterior do widget.![effect3](https://i.ibb.co/P6ZM88P/image.png)

**Funções:**

-   **adjustWidgetHeight**:
    -   Verifica a altura atual do widget (**widgetRef.current**).
    -   Define uma altura fixa de 410px se a altura atual for maior que esse valor.
    -   Define altura automática caso contrário![const](https://i.ibb.co/02qzNS6/image.png)

**Renderização Condicional:**

-   **Exibição de Erro:**
    -   Renderiza uma mensagem de erro caso ocorra um problema ao carregar os dados meteorológicos.![if](https://i.ibb.co/Kw91ZGj/image.png)

**Exibição dos Dados Meteorológicos:**

-   Renderiza as previsões meteorológicas para cada dia.
-   Exibe o dia da semana, ícone do tempo, descrição, temperatura e umidade.![return](https://i.ibb.co/ZhK47z3/image.png)
