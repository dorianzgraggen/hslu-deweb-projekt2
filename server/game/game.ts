export class Game {
  code: string;
  secret: string;
  join_list_socket: WebSocket | null = null;

  constructor(code: string, secret: string) {
    this.code = code;
    this.secret = secret;
  }

  async begin() {
    await this.setFirstCard();
    await this.distributeCardsToPlayers();
    await this.sendBeginSignal();
  }

  async turn() {
    const move = await this.letMove();
    await this.sendMove(move);
    await this.analyzeMove();
  }

  private async setFirstCard() {}

  private async distributeCardsToPlayers() {}

  private async sendBeginSignal() {}

  private async letMove(): Promise<Move> {}

  private async sendMove(move: Move) {}

  private async analyzeMove() {
    await this.letDrawCards();
    await this.determineNextPlayer();
  }

  private async letDrawCards() {}

  private async determineNextPlayer() {}

  public async join(player: Player) {}
}

export class Player {
  socket: WebSocket;
  constructor(socket: WebSocket) {
    this.socket = socket;
  }
}

type Move = any;
