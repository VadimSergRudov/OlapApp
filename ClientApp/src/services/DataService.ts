import axios from "axios";
import { IQueryObject } from "../types/QueryObject";
import { IAgrFact, ICountry, IFact, IIndicator} from "../types/DataTypes";

export default class DataService {
    static async fetchCountries(): Promise<ICountry[]> {
        return (await axios.get<ICountry[]>("https://localhost:44376/api/data/counties")).data;
    }

    static async fetchIndicators(): Promise<IIndicator[]> {
        return (await axios.get<IIndicator[]>("https://localhost:44376/api/data/indicators")).data;
    }

    static async fetchFacts(query: IQueryObject): Promise<IFact[]> {
        return (await axios.get("https://localhost:44376/api/data/facts", { params: query })).data;
    }

    static async fetchAgrFacts(query: IQueryObject): Promise<IAgrFact[]> {
        return (await axios.get("https://localhost:44376/api/data/agrfacts", { params: query })).data;
    }
}