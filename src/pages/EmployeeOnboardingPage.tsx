import React, { useState, useEffect } from 'react';
import BasicDetailsForm from '../components/forms/BasicDetailsForm';
import OrganisationSettingsForm from '../components/forms/OrganisationSettingsForm';
import EmployeeLoginForm from '../components/forms/EmployeeLoginForm';
import DailySpendingLimitForm from '../components/forms/DailySpendingLimitForm';
import ConfirmationStep from '../components/forms/ConfirmationStep';
import Modal from '../components/Modals/Confirmation.Modal';

const generateStepId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const steps = [
    { id: generateStepId(), name: 'Basic Details', icon: '1' },
    { id: generateStepId(), name: 'Organisation Settings', icon: '2' },
    { id: generateStepId(), name: 'Employee Login', icon: '3' },
    { id: generateStepId(), name: 'Daily Spending Limit', icon: '4' },
    { id: generateStepId(), name: 'Confirmation Step', icon: '5' }
];

const EmployeeOnboardingWizardPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<any>({});
    const [isDataStored, setIsDataStored] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formFillStatus, setFormFillStatus] = useState<Array<boolean>>([false, false, false, false, false]);
    const [storedFormData, setStoredFormData] = useState<any[]>(new Array(steps.length).fill({}));

    const handleNextStep = (data: any) => {
        setFormData({ ...formData, ...data });
        const updatedFormFillStatus = [...formFillStatus];
        updatedFormFillStatus[currentStep] = true;
        setFormFillStatus(updatedFormFillStatus);
        setStoredFormData((prevStoredFormData) => {
            const updatedData = [...prevStoredFormData];
            updatedData[currentStep] = data;
            return updatedData;
        });
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
        console.log(storedFormData)
    };

    useEffect(() => {
        if (isDataStored) {
            setIsModalOpen(true);
        }
    }, [isDataStored]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmation = () => {
        setIsDataStored(true);
        setCurrentStep(0);
        setFormFillStatus(new Array(steps.length).fill(false));
        setStoredFormData(new Array(steps.length).fill({}));
    };

    return (
        <div className="bg-teal-50 min-h-screen flex flex-col">
            <header className="bg-teal-500 text-white text-center py-4">
                <h1 className="text-2xl font-semibold">Employee Onboarding</h1>
            </header>
            <div className="flex-1 flex items-center justify-center">
                <div className={`w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col max-w-4xl`} style={{ height: '10' }}>
                    <div id="stepper" className="flex justify-between py-6 px-6 bg-teal-200 border-r border-gray-300 overflow-x-auto">
                        <ol className="flex w-full space-x-4">
                            {steps.map((step, index) => (
                                <li key={step.id} className={`flex items-center rounded-lg px-2 cursor-pointer ${!formFillStatus[index] && index !== currentStep ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full shadow-lg ${index <= currentStep ? 'bg-green-500' : 'bg-gray-300'}`}>
                                        <div className="rounded-full flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                                            <span className={`text-sm font-bold flex items-center justify-center ${index <= currentStep ? 'text-white' : 'text-gray-800'}`} style={{ minWidth: '2rem', minHeight: '2rem', display: 'inline-flex', width: '2rem', height: '2rem', verticalAlign: 'middle' }}>{step.icon}</span>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium px-2 py-1 ${index <= currentStep ? 'text-green' : 'text-gray-700'}`}>{step.name}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="flex-1 p-8 overflow-y-auto">
                        {currentStep === 0 && <BasicDetailsForm data={storedFormData[currentStep]} onNext={handleNextStep} />}
                        {currentStep === 1 && <OrganisationSettingsForm data={storedFormData[currentStep]} onNext={handleNextStep} onPrevious={handlePreviousStep} />}
                        {currentStep === 2 && <EmployeeLoginForm data={storedFormData[currentStep]} onNext={handleNextStep} onPrevious={handlePreviousStep} />}
                        {currentStep === 3 && <DailySpendingLimitForm data={storedFormData[currentStep]} onNext={handleNextStep} onPrevious={handlePreviousStep} />}
                        {currentStep === 4 && <ConfirmationStep data={formData} onPrevious={handlePreviousStep} onConfirmation={handleConfirmation} />}
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default EmployeeOnboardingWizardPage;
