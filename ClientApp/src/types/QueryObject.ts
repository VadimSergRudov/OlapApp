export interface IQueryObject{
    dimension: string;
    valueId: string; // id 
    frequency: string;
    sinceDate: Date | null;
    toDate: Date | null;
}