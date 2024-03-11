import { IAgrFact } from "../types/DataTypes"
import Paper from "@mui/material/Paper/Paper";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";

interface IAgrFactTableProps {
    facts: IAgrFact[];
    selectedDimension: string;
}

export default function AgrFactTable(props: IAgrFactTableProps) {
    const { facts, selectedDimension } = props;
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{selectedDimension === "Country" ? "Indicator" : "Country"}</TableCell>
                        <TableCell>Min</TableCell>
                        <TableCell>Max</TableCell>
                        <TableCell>Average</TableCell>
                        <TableCell>Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facts.map(fact => {
                        return <TableRow key={fact.id}>
                            <TableCell>{selectedDimension === "Country" ? fact.indicatorName : fact.countryName}</TableCell>
                            <TableCell>{fact.minValue}</TableCell>
                            <TableCell>{fact.maxValue}</TableCell>
                            <TableCell>{fact.averageValue}</TableCell>
                            <TableCell>{fact.sumValue}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>

    )
}