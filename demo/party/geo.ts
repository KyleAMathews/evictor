// We use this 'party' to get and broadcast presence information
// from all connected users. We'll use this to show how many people
// are connected to the room, and where they're from.

import type { State } from "../messages";

import type {
  Party,
  PartyConnection,
  PartyConnectionContext,
  PartyServer,
  PartyWorker,
} from "partykit/server";

export default class MyRemix implements PartyServer {
  // save a reference to the party
  party: Party;
  constructor(party: Party) {
    this.party = party;
  }

  // we'll store the state in memory
  state: State;
  // let's opt in to hibernation mode, for much higher concurrency
  // like, 1000s of people in a room 🤯
  // This has tradeoffs for the developer, like needing to hydrate/rehydrate
  // state on start, so be careful!
  static options = {
    hibernate: true,
  };

  // This is called every time a new room is made
  // since we're using hibernation mode, we should
  // "rehydrate" this.state here from all connections
  onStart(): void | Promise<void> {
    for (const connection of this.party.getConnections()) {
      const { from } = connection.deserializeAttachment();
      this.state = {
        total: (this.state?.total ?? 0) + 1,
        from: {
          ...this.state?.from,
          [from]: (this.state?.from[from] ?? 0) + 1,
        },
      };
    }
  }

  // This is called when a connection has an error
  async onError(connection: PartyConnection, err: Error): Promise<void> {
    // let's log the error
    console.error(err);
    // and close the connection
    await this.onClose(connection);
  }
}

MyRemix satisfies PartyWorker;
