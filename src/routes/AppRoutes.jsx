import {
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import { useSelector } from "react-redux";

import AllProspects from "../components/prospects/Show";

import AllAffiliets from "../components/affiliets/Show";

import AllSectors from "../components/sectors/Show";
import NewSector from "../components/sectors/New";
import EditSector from "../components/sectors/Edit";

import AllCivilStatus from "../components/civilStatus/Show";
import NewCivilStatus from "../components/civilStatus/New";
import EditCivilStatus from "../components/civilStatus/Edit";

import AllProfesions from "../components/profesions/Show";
import NewProfesions from "../components/profesions/New";
import EditProfesions from "../components/profesions/Edit";

import AllProfesionsLw from "../components/profesions_lw/Show";
import NewProfesionsLw from "../components/profesions_lw/New";
import EditProfesionsLw from "../components/profesions_lw/Edit";

import AllInstitutions from "../components/institutions/Show";
import NewInstitutions from "../components/institutions/New";
import EditInstitutions from "../components/institutions/Edit";

import AllPlanillasJ from "../components/planillas_j/Show";
import NewPlanillasJ from "../components/planillas_j/New";
import EditPlanillasJ from "../components/planillas_j/Edit";

import AllHousings from "../components/housings/Show";
import NewHousings from "../components/housings/New";
import EditHousings from "../components/housings/Edit";

import AllPurposes from "../components/purposes/Show";
import NewPurposes from "../components/purposes/New";
import EditPurposes from "../components/purposes/Edit";

import AllPayments from "../components/payments/Show";
import NewPayments from "../components/payments/New";
import EditPayments from "../components/payments/Edit";

import AllEstadosTramite from "../components/estadosTramite/Show";
import NewEstadosTramite from "../components/estadosTramite/New";
import EditEstadosTramite from "../components/estadosTramite/Edit";

import AllTypeDocuments from "../components/typeDocuments/Show";
import NewTypeDocuments from "../components/typeDocuments/New";
import EditTypeDocuments from "../components/typeDocuments/Edit";

import AllTermsLoan from "../components/termsLoan/Show";
import NewTermsLoan from "../components/termsLoan/New";
import EditTermsLoan from "../components/termsLoan/Edit";

import AllEntities from "../components/entities_f/Show";

import AllSectorProfesion from "../components/sectorProfesion/Show";
import NewSectorProfesion from "../components/sectorProfesion/New";
import EditSectorProfesion from "../components/sectorProfesion/Edit";

import AllEntityParams from "../components/entityParams/Show";
import NewEntityParams from "../components/entityParams/New";
import EditEntityParams from "../components/entityParams/Edit";

import AllUsers from "../components/users/Show";
import NewUsers from "../components/users/New";
import EditUsers from "../components/users/Edit";

import AllRoles from "../components/roles/Show";
import NewRoles from "../components/roles/New";
import EditRoles from "../components/roles/Edit";

import Login from "../components/login/login";
import Password from "../components/login/password";
import MissingRoute from "../components/AlertMessage";

export const AppRoutes = () => {
  const user = useSelector((state) => state.user.user);

  return (
      <Routes>
     
        <Route path="/" element={user ? <Navigate to="/prospects" /> : <Outlet />} >
          <Route path="" element={<Login />} />
          <Route path="password" element={<Password />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="" element={user ? <Outlet /> : <Navigate to="/login" />} >
      
          <Route path="" element={<AllProspects />} />
          <Route path="/prospects" element={<AllProspects />} />
          
          <Route path="/affiliets" element={<AllAffiliets />} />

          <Route path="/sectors" element={<AllSectors />} />
          <Route path="/sectors/new" element={<NewSector />} />
          <Route path="/sectors/edit/:id" element={<EditSector />} />

          <Route path="/civilstatus" element={<AllCivilStatus />} />
          <Route path="/civilstatus/new" element={<NewCivilStatus />} />
          <Route path="/civilstatus/edit/:id" element={<EditCivilStatus />} />

          <Route path="/profesions" element={<AllProfesions />} />
          <Route path="/profesions/new" element={<NewProfesions />} />
          <Route path="/profesions/edit/:id" element={<EditProfesions />} />

          <Route path="/profesions_lw" element={<AllProfesionsLw />} />
          <Route path="/profesions_lw/new" element={<NewProfesionsLw />} />
          <Route path="/profesions_lw/edit/:id" element={<EditProfesionsLw />} />

          <Route path="/institutions" element={<AllInstitutions />} />
          <Route path="/institutions/new" element={<NewInstitutions />} />
          <Route path="/institutions/edit/:id" element={<EditInstitutions />} />

          <Route path="/planillas_j" element={<AllPlanillasJ />} />
          <Route path="/planillas_j/new" element={<NewPlanillasJ />} />
          <Route path="/planillas_j/edit/:id" element={<EditPlanillasJ />} />

          <Route path="/housings" element={<AllHousings />} />
          <Route path="/housings/new" element={<NewHousings />} />
          <Route path="/housings/edit/:id" element={<EditHousings />} />

          <Route path="/purposes" element={<AllPurposes />} />
          <Route path="/purposes/new" element={<NewPurposes />} />
          <Route path="/purposes/edit/:id" element={<EditPurposes />} />

          <Route path="/payments" element={<AllPayments />} />
          <Route path="/payments/new" element={<NewPayments />} />
          <Route path="/payments/edit/:id" element={<EditPayments />} />

          <Route path="/estados_tramite" element={<AllEstadosTramite />} />
          <Route path="/estados_tramite/new" element={<NewEstadosTramite />} />
          <Route path="/estados_tramite/edit/:id" element={<EditEstadosTramite />} />

          <Route path="/type_documents" element={<AllTypeDocuments />} />
          <Route path="/type_documents/new" element={<NewTypeDocuments />} />
          <Route path="/type_documents/edit/:id" element={<EditTypeDocuments />} />

          <Route path="/terms_loan" element={<AllTermsLoan />} />
          <Route path="/terms_loan/new" element={<NewTermsLoan />} />
          <Route path="/terms_loan/edit/:id" element={<EditTermsLoan />} />

          <Route path="/entities_f" element={<AllEntities />} />

          <Route path="/sector_profesion" element={<AllSectorProfesion />} />
          <Route path="/sector_profesion/new" element={<NewSectorProfesion />} />
          <Route path="/sector_profesion/edit/:id" element={<EditSectorProfesion />} />

          <Route path="/entity_params" element={<AllEntityParams />} />
          <Route path="/entity_params/new" element={<NewEntityParams />} />
          <Route path="/entity_params/edit/:id" element={<EditEntityParams />} />

          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/new" element={<NewUsers />} />
          <Route path="/users/edit/:id" element={<EditUsers />} />

          <Route path="/roles" element={<AllRoles />} />
          <Route path="/roles/new" element={<NewRoles />} />
          <Route path="/roles/edit/:id" element={<EditRoles />} />

          <Route component={<MissingRoute />} /> 
        </Route>
      </Routes>
  )
}