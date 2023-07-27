import { v4 as uuidv4 } from 'uuid';

export class BowlingGame {
    id: string = ''
    name:string = ''
    players:Array<Player> = []
    constructor(obj?:BowlingGameArgs) {
        Object.assign(this, obj)
        this.id = uuidv4()
    }
}
export interface BowlingGameArgs {
    name?:string
    players?:Array<Player>
}

export class Player {
    id: string = ''
    name: string = ''
    frames: Array<Frame> = [
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
    ]
    score:Score = new Score()
    constructor(obj?:PlayerArgs) {
        Object.assign(this, obj)
        this.id = uuidv4()
    }
}
export interface PlayerArgs {
    name?:string
}

export class Frame {
    first: string = ''
    second: string = ''
    third: string = ''
    constructor(obj?:FrameArgs) {
        Object.assign(this, obj)
    }
}
export interface FrameArgs {
    first?:string
    second?:string
    third?:string
} 

export class Score {
    score: number = 0
    constructor() {}
}

export const cleanFrames = (frames: Array<Frame>)=>{
    frames.forEach((f, i, list) => {
        const frameRolls = [
            parseInt(f.first.replace(/[^\d]/, '')), 
            parseInt(f.second.replace(/[^\d]/, '')), 
            parseInt(f.third.replace(/[^\d]/, ''))
        ]
        if((i+1) >= 10) { // Bonus rolls
            if(!isNaN(frameRolls[0])) 
                frameRolls[0] =Math.max(0, Math.min(frameRolls[0], 10))
            if(!isNaN(frameRolls[1])) 
                frameRolls[1] =Math.max(0, Math.min(frameRolls[1], 10))
            if(!isNaN(frameRolls[2])) 
                frameRolls[2] =Math.max(0, Math.min(frameRolls[2], 10))
        } else {
            if(!isNaN(frameRolls[0])) {
                frameRolls[0] =Math.max(0, Math.min(frameRolls[0], 10))
            }
            if(!isNaN(frameRolls[1])) {
                frameRolls[1] = Math.max(0, Math.min(frameRolls[1], (10-(frameRolls[0]||0))))
            }
        }

        f.first = isNaN(frameRolls[0]) ? '': frameRolls[0].toString()
        f.second = isNaN(frameRolls[1]) ? '': frameRolls[1].toString()
        f.third = isNaN(frameRolls[2]) ? '': frameRolls[2].toString()
    })
}

export const calculateScore = (frames: Array<Frame>)=>{
    let totalScore = 0
    frames.forEach((f, i, list) => {
        const frameRolls = [
            (parseInt(f.first) || 0), 
            (parseInt(f.second) || 0), 
            (parseInt(f.third) || 0)
        ]
        if ((i+1) >= 10) { // Bonus rolls
            totalScore += frameRolls[0] + frameRolls[1] + frameRolls[2]
            return;
        }
        const nextRolls = [
            (parseInt(list[i+1].first) || 0),
            (parseInt(list[i+1].second) || 0),
        ]
        if(nextRolls[0] == 10) {
            if((i+1) <= 8) {
                nextRolls[1] = (parseInt(list[i+2]?.first) || 0)
            } else {
                nextRolls[1] = (parseInt(list[i+1]?.second) || 0)
            }
        }
        if(frameRolls[0] == 10) { // Strike
            totalScore += frameRolls[0] + nextRolls[0] + nextRolls[1]
            return
        }
        if(frameRolls[0] + frameRolls[1] == 10) { // Spare
            totalScore += frameRolls[0] + frameRolls[1] + nextRolls[0]
        } else { // Not spare
            totalScore += frameRolls[0] + frameRolls[1]
        }
    })
    return totalScore
}
