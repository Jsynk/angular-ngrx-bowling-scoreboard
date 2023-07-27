import { createFeatureSelector } from '@ngrx/store';
import { BowlingGame } from '../../bowling/bowling.model';
 
export const selectBowlingGames = createFeatureSelector<ReadonlyArray<BowlingGame>>('bowlingGames');
