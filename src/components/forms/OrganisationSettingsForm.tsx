import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useOrganisationData } from '../../hooks/useOrganisationData.hooks';
import { OrganisationSettingsFormProps } from '../../types/types';

const OrganisationSettingsForm: React.FC<OrganisationSettingsFormProps> = ({ onNext, onPrevious, data }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState(false);
    const { organisationOptions, departments, divisions, handleOrganisationSearch, fetchDepartments, fetchDivisions } = useOrganisationData(searchQuery);
    
    const initialValues = {
        organisationName: data.organisationName ? data.organisationName : '',
        department: data.department ? data.department : '',
        division: data.division ? data.division : ''
    };

    const validationSchema = Yup.object({
        organisationName: Yup.string().required('Organisation name is required'),
        department: Yup.string().required('Department is required'),
        division: Yup.string().required('Division is required')
    });

    useEffect(() => {
        if (data.organisationName) {
            fetchDepartments(data.organisationName);
            fetchDivisions(data.department)
        }
    }, [data.organisationName, fetchDepartments]);

    const handleSubmit = (values: any) => {
        onNext(values);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const { value } = e.target;
        setSearchQuery(value);
        setFieldValue('organisationName', value);
        if (value.trim() !== '') {
            setShowDropdown(true);
            handleOrganisationSearch(value);
        } else {
            setShowDropdown(false);
        }
    };

    const handleOrganisationChange = (organisation: { organisationKey: string, organisationName: string, }, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const { organisationName } = organisation;
        setFieldValue('organisationName', organisationName);
        // Fetch departments based on the selected organisation
        fetchDepartments(organisationName);
        setShowDropdown(false);
    };

    const handleDepartmentChange = (department: { departmentKey: string, departmentName: string }, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const { departmentName } = department;
        setFieldValue('department', departmentName);
        // Fetch divisions based on the selected department
        fetchDivisions(department.departmentKey);
    };

    const handleDivisionChange = (division: { divisionKey: string, divisionName: string }, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const { divisionName } = division;
        setFieldValue('division', divisionName);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-teal-100 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 2: Organisation Settings</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, setFieldValue }) => (
                    < Form >
                        <div className="mb-4">
                            <label htmlFor="organisationName" className="block text-gray-700 mb-2">Organisation Name:</label>
                            <div className="relative">
                                <Field
                                    type="text"
                                    id="organisationName"
                                    name="organisationName"
                                    placeholder="Search Organisation"
                                    className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={values.organisationName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e, setFieldValue)}
                                />
                                <div className="absolute top-full left-0 w-full bg-white border rounded-b-md border-gray-300">
                                    {showDropdown && organisationOptions.map((org: any, index) => (
                                        <div key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => { handleOrganisationChange(org, setFieldValue); }}>
                                            {org.organisationName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ErrorMessage name="organisationName" component="div" className="text-red-500 mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="department" className="block text-gray-700 mb-2">Department:</label>
                            <Field as="select" id="department"
                                name="department"
                                value={values.department}
                                onChange={(e: any) => handleDepartmentChange(departments[e.target.selectedIndex], setFieldValue)}
                                className="form-select w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                                <option value="">Select Department</option>
                                {departments.map((department, index) => (
                                    <option key={index} value={department.departmentName}>{department.departmentName}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="department" component="div" className="text-red-500 mt-1" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="division" className="block text-gray-700 mb-2">Division:</label>
                            <Field as="select" id="division" name="division"
                                value={values.division}
                                className="form-select w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                onChange={(e: any) => handleDivisionChange(divisions[e.target.selectedIndex], setFieldValue)}>
                                <option value="">Select Division</option>
                                {divisions.map((division, index) => (
                                    <option key={index} value={division.divisionName}>{division.divisionName}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="division" component="div" className="text-red-500 mt-1" />
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={onPrevious} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-gray-600">Previous</button>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-green-600">Next</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default OrganisationSettingsForm
