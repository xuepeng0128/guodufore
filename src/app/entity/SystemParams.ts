export class SystemParams {
    upperLimitGuodubi: number;
    setPutCardGuodubiGrades: Array<number>;
    honerSet: {bronze: number, silver: number, gold: number, diamond: number, Supreme: number };


  constructor(upperLimitGuodubi?: number, setPutCardGuodubiGrades?: Array<number>, honerSet?: { bronze: number; silver: number; gold: number; diamond: number; Supreme: number }) {
    this.upperLimitGuodubi = upperLimitGuodubi;
    this.setPutCardGuodubiGrades = setPutCardGuodubiGrades;
    this.honerSet = honerSet;
  }
}
