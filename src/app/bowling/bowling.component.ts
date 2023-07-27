import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectBowlingGames } from "../state/bowling/bowling.selectors";
import { BowlingGamesActions } from "../state/bowling/bowling.actions";

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.scss'],
  host: {'class': 'flex-grow container mx-auto p-2 py-4'}
})
export class BowlingComponent {
  bowlingGames = this.store.select(selectBowlingGames)

  addBowlingGame(name: string) {
    this.store.dispatch(BowlingGamesActions.addBowlingGame({ name }));
  }
  removeBowlingGame(id: string) {
    this.store.dispatch(BowlingGamesActions.removeBowlingGame({ id }));
  }
  setBowlingGameName(event: Event, gameId: string) {
    const name = (event.target as HTMLInputElement).value
    this.store.dispatch(BowlingGamesActions.setBowlingGameName({ name, gameId }));
  }
  addPlayer(name: string, gameId: string) {
    this.store.dispatch(BowlingGamesActions.addPlayer({ name, gameId }));
  }
  removePlayer(id: string, gameId: string) {
    this.store.dispatch(BowlingGamesActions.removePlayer({ id, gameId }));
  }
  setPlayerName(event: Event, playerId: string, gameId: string) {
    const name = (event.target as HTMLInputElement).value
    this.store.dispatch(BowlingGamesActions.setPlayerName({ name, playerId, gameId }));
  }

  newGameName = signal('')
  setNewGameName(event: Event) {
    this.newGameName.set((event.target as HTMLInputElement).value)
  }
  newPlayerName = signal('')
  setNewPlayerName(event: Event) {
    this.newPlayerName.set((event.target as HTMLInputElement).value)
  }

  setScore(event: Event, frameIndex: number, playerIndex: number, bgIndex: number, frameProp: string) {
    const eventTarget = (event.target as HTMLInputElement)
    const text = eventTarget.value
    this.bowlingGames.subscribe(state => {
      const frame = state[bgIndex].players[playerIndex].frames[frameIndex]
      if(frameProp == 'first')
        eventTarget.value = frame.first
      else if(frameProp == 'second')
        eventTarget.value = frame.second
      else if(frameProp == 'third')
        eventTarget.value = frame.third
    })
    this.store.dispatch(BowlingGamesActions.setScore({ text, frameIndex, playerIndex, gameIndex:bgIndex, frameProp }));
  }

  constructor(private store: Store) {}

  ngOnInit() {
    
  }
}
