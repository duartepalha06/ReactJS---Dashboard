const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const WebSocket = require("ws");
const { v4: uuidv4 } = require('uuid');
const chalk = require("chalk");

const app = express();

console.clear();  

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://rafael:oliveira@cluster0.nyawetu.mongodb.net/sample_mflix?retryWrites=true&w=majority";

async function connectToMongo() {
  try {
    await mongoose.connect(uri);
    console.log(chalk.green("MongoDB conectado..."));
    setupChangeStream();
  } catch (err) {
    console.error(chalk.red("Erro ao conectar ao MongoDB:"), err);
    setTimeout(connectToMongo, 1000);
  }
}

connectToMongo();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  RandomNumber: Number,
});

const User = mongoose.model("User", userSchema, "users");

const server = app.listen(1000, () => {
  console.log(chalk.green(`Servidor iniciado na porta 1000`));
});

const wss = new WebSocket.Server({ noServer: true });
let numClients = 0;

wss.on("connection", function connection(ws, req) {
  numClients++;

  ws.id = uuidv4();
  console.log(`${chalk.green('[+]')} ${chalk.yellow(`{${numClients}}`)} ${chalk.white('Nova conexão estabelecida com ID:')} ${chalk.blueBright(ws.id)}`);

  ws.on("close", () => {
    numClients--;
    console.log(`${chalk.red('[-]')} ${chalk.yellow(`{${numClients}}`)} ${chalk.white('Conexão fechada com ID:')} ${chalk.blueBright(ws.id)}`);
  });
});

async function broadcastUsers() {
  try {
    const clients = wss.clients;
    if (!clients || clients.size === 0) {
      console.log(chalk.red("Nenhum cliente conectado"));
      return;
    }

    const users = await User.find();
    const data = JSON.stringify(users);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  } catch (err) {
    console.error(chalk.red("Erro ao enviar dados pelo WebSocket:"), err);
  }
}

let changeStream;

async function setupChangeStream() {
  try {
    changeStream = User.watch();
    changeStream.on("change", async () => {
      await broadcastUsers();
    });

    changeStream.on("error", (err) => {
      if (err.code === 'ECONNRESET') {
        console.log(chalk.red("Internet desligada"));
      } else {
        console.error(chalk.red("Erro no stream de mudança:"), err);
      }
      setTimeout(setupChangeStream, 1000);
    });
  } catch (err) {
    console.error(chalk.red("Erro ao iniciar o change stream:"), err);
    setTimeout(setupChangeStream, 1000);
  }
}






app.get("/", (req, res) => {
  res.send("Conectado ao MongoDB");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(chalk.red(err));
    res.status(500).send("Erro no servidor");
  }
});

app.get("/api/users/:position", async (req, res) => {
  try {
    const { position } = req.params;
    const users = await User.find({ position });
    res.json(users);
  } catch (err) {
    console.error(chalk.red(err));
    res.status(500).send("Erro no servidor");
  }
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, position, RandomNumber } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { name, email, position, RandomNumber },
      { new: true }
    );
    await broadcastUsers();
    res.json(updatedUser);
  } catch (err) {
    console.error(chalk.red(err));
    res.status(500).send("Erro ao atualizar utilizador");
  }
});

server.on("upgrade", (request, socket, head) => {
  request.url = '/';
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

let isShuttingDown = false;

process.on("SIGINT", async () => {
  isShuttingDown = true;

  if (changeStream) {
    try {
      await changeStream.close();
      console.log(chalk.yellow("Change stream encerrado"));
    } catch (err) {
      console.error(chalk.red("Erro ao fechar o change stream:"), err);
    }
  }

  try {
    await mongoose.connection.close();
    console.log(chalk.green("Conexão MongoDB fechada pelo encerramento da aplicação"));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red("Erro ao fechar a conexão MongoDB:"), err);
    process.exit(1);
  }
});

mongoose.connection.on('disconnected', () => {
  if (!isShuttingDown) {
    console.log(chalk.yellow('MongoDB desconectado. Tentando reconectar...'));
    connectToMongo();
  }
});
