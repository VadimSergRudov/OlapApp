export interface IAgrFact{
    id: string;
    sumValue: number;
    averageValue: number;
    maxValue: number;
    minValue: number;
    indicatorName: number;
    countryName: number;
}

export interface IFact{
    id: string;
    date: Date;
    frequency: string;
    value: number;
    countryId: string;
    indicatorId: string;
    countryName: string;
    indicatorName: string;
}

export interface IIndicator{
    id: string;
    name: string;
    code: number;
}

export interface ICountry{
    id: string;
    name: string;
    code: number;
}