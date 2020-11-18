export interface IconDatum {
  fill?: string;
  fillRule?: string;
  paths: string[];
  stroke?: string;
  strokeWidth?: string;
  viewBox: string;
}

export interface IconHashTable {
  [key: string]: IconDatum;
}

export const IconTable: IconHashTable = {
  crossCircle: {
    paths: [
      'M12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM14.578 8.016l1.406 1.406-2.578 2.578 2.578 2.578-1.406 1.406-2.578-2.578-2.578 2.578-1.406-1.406 2.578-2.578-2.578-2.578 1.406-1.406 2.578 2.578z',
    ],
    viewBox: '0 0 24 24',
  },
};
