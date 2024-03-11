import Paper from "@mui/material/Paper/Paper";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import classes from "../App.module.css";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import moment from "moment";
import { IFact } from "../types/DataTypes";


interface IFactTableProps {
    facts: IFact[];
    dates: Date[];
    selectedDimension: string;
    names: string[];
    frequency: string;
}

export default function FactTable(props: IFactTableProps) {
    const { dates, selectedDimension, names, facts, frequency } = props;

    const getIndicatorValue = (indicator: string, date: Date) => {
        const item = facts.find(item => item.indicatorName === indicator && item.date === date);
        return item ? item.value : '';
    }

    const getCountryValue = (country: string, date: Date) => {
        const item = facts.find(item => item.countryName === country && item.date === date);
        return item ? item.value : '';
    }

    const getDateString = (date: Date) => {
        if (frequency === "Q") {
            return moment(date).format('YYYY-MM-DD');
        }
        return moment(date).format('YYYY')
    }
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.stickyLeft}>{selectedDimension === "Country" ? "Indicator" : "Country"}</TableCell>
                        {dates.map(date => <TableCell key={date.toString()}>{getDateString(date)}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map(value => {
                        return <TableRow key={value}>
                            <TableCell className={classes.stickyLeft}>{value}</TableCell>
                            {dates.map(date => <TableCell key={date.toString()}>
                                {selectedDimension === "Country" ? getIndicatorValue(value, date) : getCountryValue(value, date)}
                            </TableCell>)}
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}