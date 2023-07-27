import { createReducer, on } from '@ngrx/store';
import { createImmerReducer, immerOn } from 'ngrx-immer/store';

import { BowlingGamesActions } from './bowling.actions';
import { BowlingGame, Player, cleanFrames, calculateScore } from '../../bowling/bowling.model';

export const initialState: ReadonlyArray<BowlingGame> = [
    new BowlingGame({ name: 'Game 1', players: [new Player({ name:'Bob' })]}),
];

export const bowlingGamesReducer = createImmerReducer(
    initialState,
    immerOn(BowlingGamesActions.addBowlingGame, (state, { name }) => ([
        ...state,
        new BowlingGame({ name, players: []})
    ])),
    immerOn(BowlingGamesActions.removeBowlingGame, (state, { id }) => (
        state.filter((bg) => bg.id !== id)
    )),
    immerOn(BowlingGamesActions.setBowlingGameName, (state, { name, gameId }) => {
        const bowlingGameIndex = state.findIndex(bg=>bg.id===gameId)
        if(state[bowlingGameIndex]) {
            state[bowlingGameIndex].name = name
        }
        return state
    }),
    immerOn(BowlingGamesActions.addPlayer, (state, { name, gameId }) => {
        const bowlingGameIndex = state.findIndex(bg=>bg.id===gameId)
        if(state[bowlingGameIndex]) {
            state[bowlingGameIndex].players = [...state[bowlingGameIndex].players, new Player({name}) ]
        }
        return state
    }),
    immerOn(BowlingGamesActions.removePlayer, (state, { id, gameId }) => {
        const bowlingGameIndex = state.findIndex(bg=>bg.id===gameId)
        if(state[bowlingGameIndex]) {
            state[bowlingGameIndex].players = state[bowlingGameIndex].players.filter((p) => p.id !== id)
        }
        return state
    }),
    immerOn(BowlingGamesActions.setPlayerName, (state, { name, playerId, gameId }) => {
        const bowlingGameIndex = state.findIndex(bg=>bg.id===gameId)
        if(state[bowlingGameIndex]) {
            const playerIndex = state[bowlingGameIndex].players.findIndex(p=>p.id==playerId)
            if(state[bowlingGameIndex].players[playerIndex]) {
                state[bowlingGameIndex].players[playerIndex].name = name
            }
        }
        return state
    }),
    immerOn(BowlingGamesActions.setScore, (state, { text, playerIndex, gameIndex, frameIndex, frameProp }) => {
        const player = state[gameIndex].players[playerIndex]
        const frames = player.frames
        const frame = frames[frameIndex]
        if(frameProp == 'first')
            frame.first = text
        else if(frameProp == 'second')
            frame.second = text
        else if(frameProp == 'third')
            frame.third = text     
        cleanFrames(frames)
        player.score.score = calculateScore(frames) 
        return state
    }),
);
