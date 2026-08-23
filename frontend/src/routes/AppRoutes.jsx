import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import ScrollToTop from '../components/common/ScrollToTop';

import { ThemeProvider } from '../context/ThemeContext';

import { AuthProvider } from '../context/AuthContext';

import { AdminAuthProvider } from '../context/AdminAuthContext';

import ProtectedRoute from '../components/common/ProtectedRoute';

import Navbar from '../components/layout/Navbar';

import DashboardLayout from '../layouts/DashboardLayout';

import AdminRoutes from './AdminRoutes';

import Landing from '../pages/Landing';

import Dashboard from '../pages/Dashboard';

import Login from '../features/auth/Login';

import Register from '../features/auth/Register';

import Profile from '../pages/Profile';

import AssessmentIntro from '../features/assessment/AssessmentIntro';

import Assessment from '../features/assessment/Assessment';

import LearningPath from '../features/learningPath/LearningPath';

import Certifications from '../features/certifications/Certifications';

import CertificationDetail from '../features/certifications/CertificationDetail';

import CertificationActivityWorkspace from '../features/certifications/CertificationActivityWorkspace';

import KnowledgeCenter from '../features/knowledgeCenter/KnowledgeCenter';

import Simulations from '../pages/Simulations';

import PhishingSimulation from '../features/simulations/PhishingSimulation';

import RansomwareSimulation from '../features/simulations/RansomwareSimulation';
import TheLastRequestSimulation from '../features/simulations/TheLastRequestSimulation';
import TheBreachRedirect from '../features/simulations/TheBreachRedirect';

import Statistics from '../pages/Statistics';

import Settings from '../pages/Settings';

import Quizzes from '../features/quizzes/Quizzes';

import QuizWorkspace from '../features/quizzes/QuizWorkspace';

import ResourcePage from '../features/resources/ResourcePage';

import NotFoundPage from '../pages/NotFoundPage';

import PageShell from '../components/common/PageShell';



const AppShellRoutes = () => {

  const { pathname } = useLocation();

  const isDashboard = pathname.startsWith('/dashboard');

  const isAdmin = pathname.startsWith('/admin');



  if (isAdmin) {

    return (

      <div className="app-shell h-dvh max-h-dvh overflow-hidden">

        <AdminRoutes />

      </div>

    );

  }



  return (

    <div className={`app-shell flex flex-col ${isDashboard ? 'h-dvh max-h-dvh overflow-hidden' : 'min-h-dvh'}`}>

      {!isDashboard && <Navbar />}

      <div className={`app-shell__body flex flex-1 min-h-0 w-full ${isDashboard ? 'overflow-hidden' : ''}`}>

        <Routes>

          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route

            path="/assessment-intro"

            element={

              <ProtectedRoute>

                <AssessmentIntro />

              </ProtectedRoute>

            }

          />

          <Route

            path="/assessment"

            element={

              <ProtectedRoute>

                <Assessment />

              </ProtectedRoute>

            }

          />

          <Route

            path="/dashboard"

            element={

              <ProtectedRoute>

                <DashboardLayout />

              </ProtectedRoute>

            }

          >

            <Route index element={<Dashboard />} />

            <Route path="learning-path" element={<LearningPath />} />

            <Route path="certifications" element={<Certifications />} />

            <Route path="certifications/:certificationId" element={<CertificationDetail />} />

            <Route path="certifications/:certificationId/activity" element={<CertificationActivityWorkspace />} />

            <Route path="knowledge-center" element={<KnowledgeCenter />} />

            <Route path="resources/:resourceId" element={<ResourcePage />} />

            <Route path="statistics" element={<Statistics />} />

            <Route path="settings" element={<Settings />} />

            <Route path="profile" element={<Profile />} />

            <Route path="simulations" element={<Simulations />} />

            <Route path="simulations/phishing/:level" element={<PhishingSimulation />} />

            <Route path="simulations/ransomware/:level" element={<RansomwareSimulation />} />
            <Route path="simulations/the-last-request" element={<TheLastRequestSimulation />} />
            <Route path="simulations/the-breach" element={<TheBreachRedirect />} />

            <Route path="quizzes" element={<Quizzes />} />

            <Route path="quizzes/:quizId" element={<QuizWorkspace />} />

          </Route>

          <Route

            path="/profile"

            element={

              <ProtectedRoute>

                <PageShell variant="dashboard" className="flex-1 min-h-0 w-full">

                  <Profile />

                </PageShell>

              </ProtectedRoute>

            }

          />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>

      </div>

    </div>

  );

};



const AppRoutes = () => (

  <BrowserRouter>

    <ThemeProvider>

      <ScrollToTop />

      <AuthProvider>

      <AdminAuthProvider>

        <AppShellRoutes />

      </AdminAuthProvider>

      </AuthProvider>

    </ThemeProvider>

  </BrowserRouter>

);



export default AppRoutes;

