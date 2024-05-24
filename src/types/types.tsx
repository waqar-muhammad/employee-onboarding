export interface OrganisationSettingsFormProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any
}

export interface FieldElementProps {
    fieldName: string;
    options: string[];
}

export interface EmployeeLoginFormProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any
}

export interface OrganisationSettingsFormProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any
}

export interface DailySpendingLimitFormProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    data: any
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void
}

export interface ConfirmationStepProps {
    data: any;
    onPrevious: () => void;
    onConfirmation: () => void;
}

export interface BasicDetailsFormProps {
    onNext: (data: any) => void;
    data: any
}
