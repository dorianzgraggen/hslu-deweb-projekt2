export class Game {
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
}

type Move = any;
