import { useState } from "react";
import classes from "../App.module.css";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { ICountry, IIndicator, IFact, IAgrFact } from "../types/DataTypes";
import { IQueryObject } from "../types/QueryObject";
import DataService from "../services/DataService";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";


interface IFilterProps {
    countries: ICountry[];
    indicators: IIndicator[]
    dimension: string;
    frequency: string;
    setDimension: (value: string) => void;
    setNames: (value: string[]) => void;
    setDates: (value: Date[]) => void;
    setFacts: (value: IFact[]) => void;
    setAgrFacts: (value: IAgrFact[]) => void;
    setFrequency: (value: string) => void;
}

export default function Filters(props: IFilterProps) {
    const { countries, indicators, dimension, frequency, setDimension, setFacts, setNames, setDates, setAgrFacts, setFrequency } = props;
    const [countryId, setCountryId] = useState<string>("")
    const [indicatorId, setIndicator] = useState<string>("")
    const [sinceDate, setSinceDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const onFilterItemChange = async (query: IQueryObject) => {
        try {
            const argFactsResponse = await DataService.fetchAgrFacts(query);
            const factsResponse = await DataService.fetchFacts(query);
            const testNames = query.dimension === "Country" ? [...new Set(factsResponse.map(item => item.indicatorName))] : [...new Set(factsResponse.map(item => item.countryName))]
            setNames(testNames);
            const d = [...new Set(factsResponse.map(item => item.date))]
            setDates(d);
            setAgrFacts(argFactsResponse);
            setFacts(factsResponse);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.filterContainer}>
            <div>
                <div className={classes.filterItem}>
                    <InputLabel>Choose dimension:</InputLabel>
                    <Select className={classes.filterSelect}
                        value={dimension}
                        onChange={(event: SelectChangeEvent<typeof dimension>) => {
                            const currentValue = event.target.value
                            setDimension(currentValue)
                            onFilterItemChange({
                                dimension: currentValue,
                                frequency: frequency,
                                sinceDate: sinceDate ? new Date(moment(sinceDate).format("YYYY-MM-DD")) : null,
                                toDate: toDate ? new Date(moment(toDate).format("YYYY-MM-DD")) : null,
                                valueId: currentValue === "Country" ? countryId : indicatorId
                            })
                        }}>
                        <MenuItem value={"Country"}>Country</MenuItem>
                        <MenuItem value={"Indicator"}>Indicator</MenuItem>
                    </Select>
                </div>
                <div className={classes.filterItem}>
                    <InputLabel>Choose value:</InputLabel>
                    {dimension === "Country"
                        ? <Select className={classes.filterSelect}
                            value={countryId}
                            onChange={(event: SelectChangeEvent<typeof countryId>) => {
                                onFilterItemChange({
                                    dimension: dimension,
                                    frequency: frequency,
                                    sinceDate: sinceDate ? new Date(moment(sinceDate).format("YYYY-MM-DD")) : null,
                                    toDate: toDate ? new Date(moment(toDate).format("YYYY-MM-DD")) : null,
                                    valueId: event.target.value
                                })
                                setCountryId(event.target.value)
                            }}>
                            {countries.map(country => {
                                return <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                            })}
                        </Select>
                        : <Select className={classes.filterSelect}
                            value={indicatorId}
                            onChange={(event: SelectChangeEvent<typeof indicatorId>) => {
                                setIndicator(event.target.value)
                                onFilterItemChange({
                                    dimension: dimension,
                                    frequency: frequency,
                                    sinceDate: sinceDate ? new Date(moment(sinceDate).format("YYYY-MM-DD")) : null,
                                    toDate: toDate ? new Date(moment(toDate).format("YYYY-MM-DD")) : null,
                                    valueId: event.target.value
                                })
                            }}>
                            {indicators.map(indicator => {
                                return <MenuItem key={indicator.id} value={indicator.id}>{indicator.name}</MenuItem>
                            })}
                        </Select>}
                </div>
                <div className={classes.filterItem}>
                    <InputLabel>Choose frequency:</InputLabel>
                    <Select className={classes.filterSelect}
                        value={frequency}
                        onChange={(event: SelectChangeEvent<typeof frequency>) => {
                            setFrequency(event.target.value)
                            onFilterItemChange({
                                dimension: dimension,
                                frequency: event.target.value,
                                sinceDate: sinceDate ? new Date(moment(sinceDate).format("YYYY-MM-DD")) : null,
                                toDate: toDate ? new Date(moment(toDate).format("YYYY-MM-DD")) : null,
                                valueId: dimension === "Country" ? countryId : indicatorId
                            })
                        }}>
                        <MenuItem value={"A"}>A</MenuItem>
                        <MenuItem value={"Q"}>Q</MenuItem>
                    </Select>
                </div>
            </div>
            <div style={{ marginLeft: "50px" }}>
                <div className={classes.filterItem}>
                    <InputLabel>Since date:</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker className={classes.datePicker}
                            views={["year"]}
                            value={sinceDate}
                            onChange={(newValue) => {
                                setSinceDate(newValue ?? null)
                                onFilterItemChange({
                                    dimension: dimension,
                                    frequency: frequency,
                                    sinceDate: newValue ?  new Date(moment(newValue).format("YYYY-MM-DD")) : null,
                                    toDate: toDate ? new Date(moment(toDate).format("YYYY-MM-DD")) : null,
                                    valueId: dimension === "Country" ? countryId : indicatorId
                                })
                            }} />
                    </LocalizationProvider>
                </div>
                <div className={classes.filterItem}>
                    <InputLabel>To date:</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker className={classes.datePicker}
                            views={["year"]}
                            value={toDate}
                            onChange={(newValue) => {
                                setToDate(newValue ?? null)
                                onFilterItemChange({
                                    dimension: dimension,
                                    frequency: frequency,
                                    sinceDate: sinceDate ? new Date(moment(sinceDate).format("YYYY-MM-DD")) : null,
                                    toDate: newValue ? new Date(moment(newValue).format("YYYY-MM-DD")) : null,
                                    valueId: dimension === "Country" ? countryId : indicatorId
                                })
                            }} />
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
}