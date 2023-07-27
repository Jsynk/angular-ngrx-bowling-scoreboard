import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngrx/store';

import { BowlingComponent } from './bowling.component';
import { Frame, cleanFrames, calculateScore, BowlingGame } from './bowling.model';

import { selectBowlingGames } from "../state/bowling/bowling.selectors";
import { BowlingGamesActions } from "../state/bowling/bowling.actions";
import { bowlingGamesReducer } from "../state/bowling/bowling.reducer";

describe('BowlingComponent', () => {
  let component: BowlingComponent;
  let fixture: ComponentFixture<BowlingComponent>;
  let store: Store<Array<BowlingGame>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideStore({ bowlingGames: bowlingGamesReducer }) ],
      declarations: [BowlingComponent]
    });
    fixture = TestBed.createComponent(BowlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create bowling component', () => {
    const fixture = TestBed.createComponent(BowlingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have right elements count on default bowling component', () => {
    const fixture = TestBed.createComponent(BowlingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('[test=bowling-game]')?.length).toEqual(1);
    expect(compiled.querySelectorAll('[test=bowling-player]')?.length).toEqual(1);
    expect(compiled.querySelectorAll('[test=bowling-frame]')?.length).toEqual(10);
  });

  it('should have right elements count empty state bowling component', () => {
    const bowlingGames = store.select(selectBowlingGames)
    let curState: ReadonlyArray<BowlingGame> = []
    bowlingGames.subscribe(state=>{ curState = state })
    store.dispatch(BowlingGamesActions.removeBowlingGame({id: curState[0].id}))
    const fixture = TestBed.createComponent(BowlingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('[test=bowling-game]')?.length).toEqual(0);
    expect(compiled.querySelectorAll('[test=bowling-player]')?.length).toEqual(0);
    expect(compiled.querySelectorAll('[test=bowling-frame]')?.length).toEqual(0);
  });

  it('should clean bowling frames properly', () => {
    const frames = [
      new Frame({first: '300', second: '10'}),
      new Frame({first: '3', second: '3s3'}),
      new Frame({first: '1w0', second: 'sss'}),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
    ]
    cleanFrames(frames)
    expect(frames[0].first).toBe('10')
    expect(frames[0].second).toBe('0')
    expect(frames[1].first).toBe('3')
    expect(frames[1].second).toBe('7')
    expect(frames[2].first).toBe('10')
    expect(frames[2].second).toBe('')
  });

  it('should calculate bowling score accurate', () => {
    const score1 = calculateScore([
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
    ])
    expect(score1).toBe(0)

    const score2 = calculateScore([
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10'}),
      new Frame({first:'10', second:'10', third:'10'}),
    ])
    expect(score2).toBe(300)

    const score3 = calculateScore([
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1'}),
      new Frame({first:'9', second:'1', third:'9'}),
    ])
    expect(score3).toBe(190)

    const score4 = calculateScore([
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame({first:'10', second:'10', third:'10'}),
    ])
    expect(score4).toBe(30)
  });
});
