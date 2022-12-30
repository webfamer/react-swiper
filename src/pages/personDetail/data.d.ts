export interface IpersonDetail {
  tRank: any;
  age: string;
  badSubject: string;
  fineSubject: string;
  hitNumber: string;
  hitRate: string;
  policeNumber: string;
  policeRank: string;
  policeName: string;
  subjectResponseList: IsubjectResponseList[];
}
export interface IsubjectResponseList {
  violationTime: number;
  subjectName: string;
  tRank: number;
  finalTime: string;
}

