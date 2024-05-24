import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeOnboardingWizardPage from './pages/EmployeeOnboardingPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeOnboardingWizardPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

