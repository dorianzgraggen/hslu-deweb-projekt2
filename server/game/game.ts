import { Card } from '../cards.ts';

export class Game {
  code: string;
  secret: string;
  join_list_socket: WebSocket | null = null;
  host: WebSocket;
  players = new Array<Player>();
  current_player_index = 0;

  constructor(code: string, secret: string, host: WebSocket) {
    this.code = code;
    this.secret = secret;
    this.host = host;
  }

  async begin() {
    this.setFirstCard();
    this.distributeCardsToPlayers();
    await this.sendBeginSignal();
  }

  async turn() {
    const move = await this.letMove();
    await this.sendMove(move);
    await this.analyzeMove();
  }

  private setFirstCard() {
    const start_card = new Card(
      Card.getRandomColor(),
      Card.getRandomValue(),
      false,
      0,
      false
    );

    this.sendToAll({ type: 'first_card', start_card });
  }

  public playCard(card: Card, player_name: string) {
    this.sendToHost({ type: 'new_player_card', card, player_name });
    this.nextPlayer();
  }

  public drawCard(player_name: string) {
    let player = this.players.find((p) => p.name == player_name);

    if (player) {
      const card = Card.newRandom();
      player.send({ type: 'card_for_you', card });
      this.sendToHost({
        type: 'new_card_for',
        player_name,
      });
    }
  }

  private nextPlayer() {
    this.current_player_index =
      (this.current_player_index + 1) % this.players.length;
    this.currentPlayer?.send({ type: 'your_turn' });
  }

  private sendToHost(data: any) {
    this.host.send(JSON.stringify(data));
  }

  private sendToAll(data: any) {
    const stringified = JSON.stringify(data);
    this.players.forEach((p) => {
      p.socket.send(stringified);
    });

    this.host.send(stringified);
  }

  private async distributeCardsToPlayers() {
    this.players.forEach((player) => {
      const start_cards = new Array(7).fill(null).map((e) => Card.newRandom());
      player.send({ type: 'start_cards', start_cards });
    });
  }

  private async sendBeginSignal() {
    this.current_player_index = Math.floor(Math.random() * this.players.length);
    this.currentPlayer?.send({ type: 'your_turn' });
  }

  private get currentPlayer() {
    return this.players[this.current_player_index];
  }

  private async letMove(): Promise<Move> {}

  private async sendMove(move: Move) {}

  private async analyzeMove() {
    await this.letDrawCards();
    await this.determineNextPlayer();
  }

  private async letDrawCards() {}

  private async determineNextPlayer() {}

  public async join(player: Player) {
    this.players.push(player);
    this.host?.send(
      JSON.stringify({
        type: 'player_joined',
        player_name: player.name,
        player_cards: 7,
      })
    );
  }

  public aini() {
    console.log('aini');
    this.host?.send(JSON.stringify({ type: 'aini' }));
  }
}

export class Player {
  socket: WebSocket;
  _name: string;
  constructor(socket: WebSocket, name: string) {
    this.socket = socket;
    this._name = name;
  }

  public send(data: any) {
    this.socket.send(JSON.stringify(data));
  }

  public get name() {
    return this._name;
  }
}

type Move = any;
