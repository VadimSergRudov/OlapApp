import React, { useState } from "react"
import classes from "./App.module.css"
import DataService from "./services/DataService"
import { IIndicator, ICountry, IFact, IAgrFact } from "./types/DataTypes";
import Filters from "./components/Filtets";
import FactTable from "./components/FactsTable";
import AgrFactTable from "./components/AgrFactsTable";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";

function App() {
  const [countries, setContries] = useState<ICountry[]>([]);
  const [indicators, setIndicators] = useState<IIndicator[]>([]);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [agrFacts, setAgrFacts] = useState<IAgrFact[]>([]);
  const [selectedDimension, setSelectedDimension] = useState<string>("Country");
  const [frequency, setFrequency] = useState<string>("A")
  const [dates, setDates] = useState<Date[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [tabValue, setTabValue] = React.useState(0);

  React.useEffect(() => {

    async function loadData() {
      try {
        const c = await DataService.fetchCountries();
        const i = await DataService.fetchIndicators();
        setContries(c);
        setIndicators(i);
      }
      catch (error) {
        console.log(error)
      }
    }
    loadData();
  }, [])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Filters countries={countries}
          indicators={indicators}
          dimension={selectedDimension}
          frequency={frequency}
          setDimension={setSelectedDimension}
          setFacts={setFacts}
          setDates={setDates}
          setNames={setNames}
          setAgrFacts={setAgrFacts}
          setFrequency={setFrequency} />
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Facts" />
          <Tab label="Aggregated Facts" />
        </Tabs>
        {tabValue === 0 &&
          <FactTable
            dates={dates}
            facts={facts}
            names={names}
            selectedDimension={selectedDimension} 
            frequency={frequency}/>}
        {tabValue === 1 &&
          <AgrFactTable facts={agrFacts}
            selectedDimension={selectedDimension} />}
      </div>
    </div>
  )
}

export default App
