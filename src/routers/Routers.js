import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchProvider } from "../contexts/SearchContext";
import { ClassProvider } from "../contexts/ClassContext";

import LayoutAuthen from "../layouts/LayoutAuthentification/LayoutAuthen.layout";
import LayoutHome from "../layouts/LayoutHome/LayoutHome.layout";
import LayoutQuestion from "../layouts/LayoutQuestion/LayoutQuestion.layout";
import LayoutDashboard from "../layouts/LayoutDashboard/LayoutDashboard.layout";

import Login from "../pages/auth/Login/Login.container";
import Register from "../pages/auth/Register/Register";
import Page404 from "../pages/404/Page404.container";
import Users from "../pages/Users/Users.container";
import Classes from "../pages/Classes/Classes.container";
import Dashboard from "../pages/Classes/details/Dashboard/Dashboard.container";
import Members from "../pages/Classes/details/Members/Members.container";
import Materials from "../pages/Classes/details/Materials/Materials.container";
import QuestionBanks from "../pages/QuestionBanks/QuestionBanks.container";
import Question from "../pages/QuestionBanks/Questions/Question.container";

import ProtectedHome from "./ProtectedHome";
import Certificate from "../pages/Classes/details/Certificate/Certificate.container";
import DetailMaterial from "../pages/Classes/details/Materials/DetailMaterial/DetailMaterial.container";
import Profile from "../pages/Classes/details/Profile/Profile.container";
import ProtectedAuth from "./ProtectedAuth";
import ProtectedUser from "./ProtectedUser";

const Routers = (props) => {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedAuth>
                <LayoutAuthen />
              </ProtectedAuth>
            }
          >
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            path="/classes"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutHome>
                    <Classes />
                  </LayoutHome>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/classes/:idClass/dashboard"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutDashboard>
                    <Dashboard />
                  </LayoutDashboard>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/classes/:idClass/member"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutDashboard>
                    <Members />
                  </LayoutDashboard>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/classes/:idClass/material"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutDashboard>
                    <Materials />
                  </LayoutDashboard>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/classes/:idClass/material/:idMaterial"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutHome>
                    <DetailMaterial />
                  </LayoutHome>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/classes/:idClass/certificate"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutDashboard>
                    <Certificate />
                  </LayoutDashboard>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/classes/:idClass/profile"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutDashboard>
                    <Profile />
                  </LayoutDashboard>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedHome>
                <ProtectedUser>
                  <ClassProvider>
                    <LayoutHome>
                      <Users />
                    </LayoutHome>
                  </ClassProvider>
                </ProtectedUser>
              </ProtectedHome>
            }
          />

          <Route
            path="/question-bank"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutHome>
                    <QuestionBanks />
                  </LayoutHome>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route
            path="/question-banks/:idBank/questions"
            element={
              <ProtectedHome>
                <ClassProvider>
                  <LayoutQuestion>
                    <Question />
                  </LayoutQuestion>
                </ClassProvider>
              </ProtectedHome>
            }
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
};

export default Routers;
