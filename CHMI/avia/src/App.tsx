import React from 'react';
import {MainPage} from "./Components/Pages/MainPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {ClientRoutes} from "./Config/Config";
import {RunCompany} from "./Components/Pages/RunCompany";
import {Statistic} from "./Components/Pages/Statictic";
import {PersonalCompany} from "./Components/Pages/PersonalCompany";
import {CompanyParticipants} from "./Components/Pages/CompanyParticipants";


function App() {
    return (
        <Router>
            <Switch>
                <Route component={CompanyParticipants} path={ClientRoutes.companyParticipants.template} />
                <Route component={Statistic} path={ClientRoutes.statistic.template} />
                <Route component={PersonalCompany} path={ClientRoutes.company.template} />
                <Route component={RunCompany} path={ClientRoutes.runCompany} />
                <Route component={MainPage} path={ClientRoutes.index} />

            </Switch>
        </Router>
    );
}

export default App;
