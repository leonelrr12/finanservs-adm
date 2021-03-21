import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'

import AllProspects from './components/prospects/Show'
import NewProspects from './components/prospects/New'
import EditProspects from './components/prospects/Edit'

import AllSectors from './components/sectors/Show'
import NewSector from './components/sectors/New'
import EditSector from './components/sectors/Edit'

import AllCivilStatus from './components/civilStatus/Show'
import NewCivilStatus from './components/civilStatus/New'
import EditCivilStatus from './components/civilStatus/Edit'

import AllProfesions from './components/profesions/Show'
import NewProfesions from './components/profesions/New'
import EditProfesions from './components/profesions/Edit'

import AllProfesions_lw from './components/profesions_lw/Show'
import NewProfesions_lw from './components/profesions_lw/New'
import EditProfesions_lw from './components/profesions_lw/Edit'

import AllInstitutions from './components/institutions/Show'
import NewInstitutions from './components/institutions/New'
import EditInstitutions from './components/institutions/Edit'

import AllPlanillas_j from './components/planillas_j/Show'
import NewPlanillas_j from './components/planillas_j/New'
import EditPlanillas_j from './components/planillas_j/Edit'

import AllHousings from './components/housings/Show'
import NewHousings from './components/housings/New'
import EditHousings from './components/housings/Edit'

import AllPurposes from './components/purposes/Show'
import NewPurposes from './components/purposes/New'
import EditPurposes from './components/purposes/Edit'

import AllPayments from './components/payments/Show'
import NewPayments from './components/payments/New'
import EditPayments from './components/payments/Edit'

import AllEntities from './components/entities_f/Show'
import NewEntities from './components/entities_f/New'
import EditEntities from './components/entities_f/Edit'

import ProspectAproach from './components/prospectAproach/Show'
import ProspectsEntity from './components/prospectsEntity/Show'
import EditProspectsEntity from './components/prospectsEntity/Edit'


import Login from './components/users/login';
import MissingRoute from './components/MissingRoute'

function App() {

  return (
    <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={AllProspects} />
            <Route path="/prospects/new" exact component={NewProspects} />
            <Route path="/prospects/edit/:id" exact component={EditProspects} />

            <Route path="/sectors" exact component={AllSectors} />
            <Route path="/sectors/new" exact component={NewSector} />
            <Route path="/sectors/edit/:id" exact component={EditSector} />

            <Route path="/civilstatus" exact component={AllCivilStatus} />
            <Route path="/civilstatus/new" exact component={NewCivilStatus} />
            <Route path="/civilstatus/edit/:id" exact component={EditCivilStatus} />

            <Route path="/profesions" exact component={AllProfesions} />
            <Route path="/profesions/new" exact component={NewProfesions} />
            <Route path="/profesions/edit/:id" exact component={EditProfesions} />
            
            <Route path="/profesions_lw" exact component={AllProfesions_lw} />
            <Route path="/profesions_lw/new" exact component={NewProfesions_lw} />
            <Route path="/profesions_lw/edit/:id" exact component={EditProfesions_lw} />

            <Route path="/institutions" exact component={AllInstitutions} />
            <Route path="/institutions/new" exact component={NewInstitutions} />
            <Route path="/institutions/edit/:id" exact component={EditInstitutions} />

            <Route path="/planillas_j" exact component={AllPlanillas_j} />
            <Route path="/planillas_j/new" exact component={NewPlanillas_j} />
            <Route path="/planillas_j/edit/:id" exact component={EditPlanillas_j} />

            <Route path="/housings" exact component={AllHousings} />
            <Route path="/housings/new" exact component={NewHousings} />
            <Route path="/housings/edit/:id" exact component={EditHousings} />

            <Route path="/purposes" exact component={AllPurposes} />
            <Route path="/purposes/new" exact component={NewPurposes} />
            <Route path="/purposes/edit/:id" exact component={EditPurposes} />

            <Route path="/payments" exact component={AllPayments} />
            <Route path="/payments/new" exact component={NewPayments} />
            <Route path="/payments/edit/:id" exact component={EditPayments} />

            <Route path="/entities_f" exact component={AllEntities} />
            <Route path="/entities_f/new" exact component={NewEntities} />
            <Route path="/entities_f/edit/:id" exact component={EditEntities} />

            <Route path="/prospects/aproach" exact component={ProspectAproach} />
            <Route path="/entity_f" exact component={ProspectsEntity} />
            <Route path="/entity_f/edit/:id" exact component={EditProspectsEntity} />

            <Route path="/login" exact component={Login} />
            <Route component={MissingRoute} />

          </Switch>
        </div>
      </Router>
  );
}

export default App;
