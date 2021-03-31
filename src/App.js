import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'

import AllProspects from './components/prospects/Show'

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

import AllEstados_tramite from './components/estadosTramite/Show'
import NewEstados_tramite from './components/estadosTramite/New'
import EditEstados_tramite from './components/estadosTramite/Edit'

import AllType_documents from './components/typeDocuments/Show'
import NewType_documents from './components/typeDocuments/New'
import EditType_documents from './components/typeDocuments/Edit'

import AllTerms_loan from './components/termsLoan/Show'
import NewTerms_loan from './components/termsLoan/New'
import EditTerms_loan from './components/termsLoan/Edit'

import AllEntities from './components/entities_f/Show'
import NewEntities from './components/entities_f/New'
import EditEntities from './components/entities_f/Edit'

import AllSectorProfesion from './components/sectorProfesion/Show'
import NewSectorProfesion from './components/sectorProfesion/New'
import EditSectorProfesion from './components/sectorProfesion/Edit'

import AllEntityParams from './components/entityParams/Show'
import NewEntityParams from './components/entityParams/New'
import EditEntityParams from './components/entityParams/Edit'

import AllUsers from './components/users/Show'
import NewUsers from './components/users/New'
import EditUsers from './components/users/Edit'

import AllRoles from './components/roles/Show'
import NewRoles from './components/roles/New'
import EditRoles from './components/roles/Edit'

import ProspectsEntity from './components/prospectsEntity/Show'
import EditProspectsEntity from './components/prospectsEntity/Edit'

import Login from './components/login/login';
import Password from './components/login/password';
// import Login from './components/users/login';
import MissingRoute from './components/MissingRoute'

function App() {

  return (
    <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={AllProspects} />

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
   
            <Route path="/estados_tramite" exact component={AllEstados_tramite} />
            <Route path="/estados_tramite/new" exact component={NewEstados_tramite} />
            <Route path="/estados_tramite/edit/:id" exact component={EditEstados_tramite} />

            <Route path="/type_documents" exact component={AllType_documents} />
            <Route path="/type_documents/new" exact component={NewType_documents} />
            <Route path="/type_documents/edit/:id" exact component={EditType_documents} />

            <Route path="/terms_loan" exact component={AllTerms_loan} />
            <Route path="/terms_loan/new" exact component={NewTerms_loan} />
            <Route path="/terms_loan/edit/:id" exact component={EditTerms_loan} />

            <Route path="/entities_f" exact component={AllEntities} />
            <Route path="/entities_f/new" exact component={NewEntities} />
            <Route path="/entities_f/edit/:id" exact component={EditEntities} />

            <Route path="/sector_profesion" exact component={AllSectorProfesion} />
            <Route path="/sector_profesion/new" exact component={NewSectorProfesion} />
            <Route path="/sector_profesion/edit/:id" exact component={EditSectorProfesion} />

            <Route path="/entity_params" exact component={AllEntityParams} />
            <Route path="/entity_params/new" exact component={NewEntityParams} />
            <Route path="/entity_params/edit/:id" exact component={EditEntityParams} />
 
            <Route path="/users" exact component={AllUsers} />
            <Route path="/users/new" exact component={NewUsers} />
            <Route path="/users/edit/:id" exact component={EditUsers} />

            <Route path="/roles" exact component={AllRoles} />
            <Route path="/roles/new" exact component={NewRoles} />
            <Route path="/roles/edit/:id" exact component={EditRoles} />

            <Route path="/entity_f" exact component={ProspectsEntity} />
            <Route path="/entity_f/edit/:id" exact component={EditProspectsEntity} />

            <Route path="/login" exact component={Login} />
            <Route path="/password" exact component={Password} />
            <Route component={MissingRoute} />

          </Switch>
        </div>
      </Router>
  );
}

export default App;
