import React from 'react' ;
import ClientTable from './ClientTable' ;
import ClientDetail from './ClientDetail' ;
import './clientpanel-css.scss' ;
import {Route,Switch} from "react-router-dom" ;


class ClientPanel extends React.Component {
    render(){
        return(
          <div class="client-panel">
          <div class="basic-admin-dash basic-admin-container">
                  <h2>Client</h2>
          </div>
          <div class="client-table-section">
              <Switch>
                 <Route path="/dz-admin/:slug/clients/" exact  component={ClientTable} />
                 <Route path="/dz-admin/:slug/clients/:id/"  component={ClientDetail} />
              </Switch>

          </div>

          </div>
        )
    }
}

export default ClientPanel
