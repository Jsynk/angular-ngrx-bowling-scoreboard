import { createActionGroup, props } from '@ngrx/store';

export const BowlingGamesActions = createActionGroup({
  source: 'BowlingGames',
  events: {
    'Add BowlingGame': props<{ name: string }>(),
    'Remove BowlingGame': props<{ id: string }>(),
    'Set BowlingGame Name': props<{ name: string, gameId: string }>(),
    'Add Player': props<{ name: string, gameId: string }>(),
    'Remove Player': props<{ id: string, gameId: string }>(),
    'Set Player Name': props<{ name: string, playerId: string, gameId: string }>(),
    'Set Score': props<{ text: string, playerIndex: number, gameIndex: number, frameIndex: number, frameProp: string }>(),
  },
});
