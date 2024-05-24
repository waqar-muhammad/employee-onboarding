import { useState } from 'react';
import API_ENDPOINTS from '../constants/constats';

export const useOrganisationData = (organisationName: string | null) => {

    const [departments, setDepartments] = useState<any[]>([]);
    const [divisions, setDivisions] = useState<any[]>([]);
    const [organisationOptions, setOrganisationOptions] = useState<string[]>([]);


    const handleOrganisationSearch = async (orgKey: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.ORGANISATION}?q=${orgKey}`);
            if (response.ok) {
                const data = await response.json();
                setOrganisationOptions(data);
            } else {
                throw new Error('Failed to fetch organisation');
            }
        } catch (error) {
            console.error('Error fetching organisation:', error);
        }
    };

    const fetchDepartments = async (orgKey: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.DEPARTMENTS}?orgKey=${orgKey}`);
            if (response.ok) {
                const data = await response.json();
                setDepartments(data);
            } else {
                throw new Error('Failed to fetch departments');
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchDivisions = async (depKey: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.DIVISIONS}?departmentKey=${depKey}`);
            if (response.ok) {
                const data = await response.json();
                setDivisions(data);
            } else {
                throw new Error('Failed to fetch divisions');
            }
        } catch (error) {
            console.error('Error fetching divisions:', error);
        }
    };

    return {
        organisationOptions,
        departments,
        divisions,

        
        handleOrganisationSearch,
        fetchDepartments,
        fetchDivisions,

        setDepartments,
        setDivisions
      
    };
};
