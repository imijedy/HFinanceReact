import React from "react";
import {Route,Switch} from "react-router-dom";

import StatementPage from "../../containers/Pages/StatementPage/";
import CostTypesPage from "../../containers/Pages/CostTypesPage/";
import CostsPage from "../../containers/Pages/CostsPage/";
import IncomePage from "../../containers/Pages/IncomePage/";


const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={StatementPage}/>
            <Route exact path='/costtypes' component={CostTypesPage}/>
            <Route exact path='/costs' component={CostsPage}/>
            <Route exact path='/income' component={IncomePage}/>
        </Switch>
    );
};

export default Routes;