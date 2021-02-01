import React from "react";
import { BrowserRouter, Route} from "react-router-dom";

import ApplicationLayout from "./containers/App/index";


const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path='/' component={ApplicationLayout} />
            </div>
        </BrowserRouter>
    );
};

export default Router;
