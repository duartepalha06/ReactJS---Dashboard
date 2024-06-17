---


---

<h2 id="documentação-do-códigoa-name--documentacaoa">&lt;/&gt; Documentação do Código<a></a></h2>
<h2 id="📝-índice">📝 Índice</h2>
<ul>
<li>src/
<ul>
<li><a href="#appjs">App.js</a></li>
<li><a href="#serverjs">server.js </a></li>
</ul>
</li>
</ul>
<h3 id="srcapp.js--a-name--appjsa">src/App.js  <a></a></h3>
<p>O ficheiro <strong>App.js</strong> é um componente principal da aplicação React que utiliza a biblioteca react-router-dom para a navegação entre diferentes rotas. Este componente integra múltiplos subcomponentes, como gráficos, widgets e elementos colapsáveis, e gere o estado de utilizadores e contagens de números aleatórios.</p>
<ul>
<li>
<p><strong>Importações</strong><img src="https://i.ibb.co/w0SxYG0/image.png" alt="Importações no codigo"></p>
<ul>
<li><strong>React</strong>: Biblioteca principal para construção de interfaces de utilizador.</li>
<li><strong>react-router-dom</strong>: Utilizada para criar um sistema de navegação baseado em rotas.</li>
<li><strong>Componentes personalizados</strong>: Navbar, gráficos (BarChart, PieChart), elementos colapsáveis (Collapsible), widget de clima (WeatherWidget) e notícias (News).</li>
<li><strong>CSS</strong>: Ficheiro de estilos para a aplicação.</li>
</ul>
</li>
<li>
<p><strong>Função Principal</strong> <code>App</code><br>
<img src="https://i.ibb.co/SRCVSQV/image.png" alt="enter image description here"></p>
<ul>
<li><strong>useUsers</strong>: Hook personalizado que gere o estado dos utilizadores e contagens de números aleatórios, e retorna funções e variáveis necessárias.</li>
</ul>
</li>
<li>
<p><strong>Mapeamento de Utilizadores para Elementos Colapsáveis</strong><br>
<img src="https://i.ibb.co/mHCcDKS/image.png" alt="Mapeamento de Utilizadores para Elementos Colapsáveis"></p>
<ul>
<li><strong>collapsibles</strong>: Mapeia os utilizadores para um formato adequado para os componentes <code>Collapsible</code>.</li>
</ul>
</li>
<li>
<p><strong>Renderização dos Gráficos</strong><br>
<img src="https://i.ibb.co/PrdvG2p/image.png" alt="Renderização dos Gráficos"></p>
<ul>
<li><strong>renderCharts</strong>: Função que renderiza dois gráficos (BarChart e PieChart) com as contagens de números aleatórios. Inclui mensagens de erro para problemas com Axios e WebSocket.</li>
</ul>
</li>
<li>
<p><strong>Renderização dos Elementos Colapsáveis</strong><img src="https://i.ibb.co/QHkCM9z/image.png" alt="Renderização dos Elementos Colapsáveis"></p>
<ul>
<li><strong>renderCollapsibles</strong>: Função que mapeia e renderiza os elementos colapsáveis com base nos utilizadores.</li>
</ul>
</li>
<li>
<p><strong>Estrutura de Navegação e Componentes</strong><br>
<img src="https://i.ibb.co/GdyggHW/image.png" alt="Estrutura de Navegação e Componentes"></p>
<ul>
<li><strong>Router</strong>: Componente que encapsula toda a aplicação, permitindo a navegação entre diferentes rotas.</li>
<li><strong>Navbar</strong>: Barra de navegação fixa no topo.</li>
<li><strong>Switch</strong>: Componente que renderiza apenas a primeira rota que corresponder ao caminho atual.</li>
<li><strong>Route</strong>: Define diferentes caminhos da aplicação:
<ul>
<li><strong>"/"</strong>: Rota principal que renderiza os gráficos, widget de clima e componente de notícias.</li>
<li><strong>"/users"</strong>: Rota que renderiza os elementos colapsáveis com base nos utilizadores.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Exportação</strong><br>
<img src="https://i.ibb.co/pnm6gJf/image.png" alt="Exportação"></p>
<ul>
<li><strong>export default App</strong>: Exporta o componente <code>App</code> como padrão, tornando-o disponível para importação noutros ficheiros.</li>
</ul>
</li>
</ul>
<h3 id="srcserver.js-a-name--serverjsa">src/server.js <a></a></h3>
<p>Este ficheiro <strong>server.js</strong> implementa um servidor utilizando Express e WebSocket, e conecta-se a uma base de dados MongoDB. A aplicação gere utilizadores e transmite atualizações em tempo real para clientes WebSocket conectados.</p>
<ul>
<li>
<p><strong>Importações</strong><br>
<img src="https://i.ibb.co/hKdTWZj/image.png" alt="Importações"></p>
<ul>
<li><strong>express</strong>: Framework web para Node.js.</li>
<li><strong>mongoose</strong>: Biblioteca para modelagem de dados MongoDB em Node.js.</li>
<li><strong>cors</strong>: Middleware para habilitar CORS (Cross-Origin Resource Sharing).</li>
<li><strong>WebSocket</strong>: Biblioteca para implementar WebSockets em Node.js.</li>
<li><strong>uuid</strong>: Biblioteca para gerar identificadores únicos universais (UUIDs).</li>
<li><strong>chalk</strong>: Biblioteca para colorir o texto no terminal.</li>
</ul>
</li>
<li>
<p><strong>Configuração Inicial</strong><br>
<img src="https://i.ibb.co/vjWLHDb/image.png" alt="Configuração Inicial"></p>
<ul>
<li><strong>app</strong>: Instância da aplicação Express.</li>
<li><strong>console.clear()</strong>: Limpa o terminal.</li>
<li><strong>app.use(cors())</strong>: Habilita CORS.</li>
<li><strong>app.use(express.json())</strong>: Habilita o parsing de JSON no corpo das requisições.</li>
</ul>
</li>
<li>
<p><strong>Conexão ao MongoDB</strong><br>
<img src="https://i.ibb.co/z2Ck4Fp/image.png" alt="Conexão ao MongoDB"></p>
<ul>
<li><strong>uri</strong>: URL de conexão ao MongoDB.</li>
<li><strong>connectToMongo</strong>: Função assíncrona para conectar ao MongoDB. Em caso de falha, tenta reconectar após 1 segundo.</li>
</ul>
</li>
<li>
<p><strong>Esquema e Modelo do Utilizador</strong><br>
<img src="https://i.ibb.co/K0FcKQg/image.png" alt="enter image description here"></p>
<ul>
<li><strong>userSchema</strong>: Define a estrutura dos documentos de utilizador.</li>
<li><strong>User</strong>: Modelo mongoose baseado no esquema <code>userSchema</code>.</li>
</ul>
</li>
<li>
<p><strong>Configuração do Servidor</strong><br>
<img src="https://i.ibb.co/sFG6WwZ/image.png" alt="Configuração do Servidor"></p>
<ul>
<li><strong>server</strong>: Inicia o servidor na porta 1000.</li>
<li><strong>wss</strong>: Instância do servidor WebSocket.</li>
</ul>
</li>
<li>
<p><strong>Gestão de Conexões WebSocket</strong><br>
<img src="https://i.ibb.co/nsK5zGT/image.png" alt="Gestão de Conexões WebSocket"></p>
<ul>
<li><strong>connection</strong>: Evento disparado quando uma nova conexão WebSocket é estabelecida. Atribui um ID único a cada conexão e atualiza o número de clientes conectados.</li>
</ul>
</li>
<li>
<p><strong>Broadcast de Utilizadores</strong><br>
<img src="https://i.ibb.co/TbLknY3/image.png" alt="Broadcast de Utilizadores"></p>
<ul>
<li><strong>broadcastUsers</strong>: Função assíncrona que envia dados dos utilizadores para todos os clientes WebSocket conectados.</li>
</ul>
</li>
<li>
<p><strong>Configuração do Change Stream</strong><br>
<img src="https://i.ibb.co/MpVYCjS/image.png" alt="Configuração do Change Stream"></p>
<ul>
<li><strong>setupChangeStream</strong>: Função que configura um change stream no MongoDB para monitorizar mudanças nos documentos de utilizador e enviar atualizações aos clientes WebSocket.</li>
</ul>
</li>
<li>
<p><strong>Roteamento Express</strong><br>
<img src="https://i.ibb.co/YRN5DXc/image.png" alt="Roteamento Express"></p>
<ul>
<li><strong>"/"</strong>: Endpoint raiz que responde com uma mensagem de conexão bem-sucedida.</li>
<li><strong>"/api/users"</strong>: Endpoint para obter todos os utilizadores.</li>
<li><strong>"/api/users/:position</strong>": Endpoint para obter utilizadores por posição.</li>
<li><strong>"/api/users/:id</strong>": Endpoint para atualizar um utilizador específico.</li>
</ul>
</li>
<li>
<p><strong>Gestão de Upgrade de Protocolo</strong><br>
<img src="https://i.ibb.co/ss63G66/image.png" alt=" Gestão de Upgrade de Protocolo"></p>
<ul>
<li><strong>upgrade</strong>: Evento que lida com pedidos de upgrade de protocolo, permitindo conexões WebSocket.</li>
</ul>
</li>
<li>
<p><strong>Gestão de Encerramento</strong><br>
<img src="https://i.ibb.co/vB7mHkM/image.png" alt="Gestão de Encerramento"></p>
<ul>
<li><strong>SIGINT</strong>: Evento que lida com o sinal de interrupção (Ctrl+C) para encerrar a aplicação de forma segura, fechando o change stream e a conexão MongoDB.</li>
<li><strong>disconnected</strong>: Evento que tenta reconectar ao MongoDB se a conexão for perdida inesperadamente.</li>
</ul>
</li>
</ul>

