import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BasicDetailsFormProps } from '../../types/types';

const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({ data, onNext }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

    const initialValues = {
        firstName: data ? data.firstName : '',
        lastName: data ? data.lastName : ''
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required')
    });

    const handleSubmit = (values: any) => {
        onNext({ ...values, photo: selectedFile });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) {
            setSelectedFile(file);
            previewFile(file);
        } else {
            setSelectedFile(null);
            setPreviewImage(null);
        }
    };

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-teal-100 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-black-800">Step 1: Basic Details</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name:</label>
                        <Field type="text" id="firstName" name="firstName" className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name:</label>
                        <Field type="text" id="lastName" name="lastName" className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="photo" className="block text-gray-700 mb-2">Photo:</label>
                        <div className="flex flex-col items-center justify-center bg-gray-100 border-dashed border-2 border-gray-400 rounded-md">
                            {previewImage ? (
                                <img src={previewImage.toString()} alt="Preview" className="w-full rounded-md" />
                            ) : (
                                <label htmlFor="photo" className="cursor-pointer text-gray-500 px-4 py-2">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Upload Photo
                                </label>
                            )}
                            <Field type="file" id="photo" name="photo" className="hidden" onChange={handleFileChange} />
                        </div>
                        <ErrorMessage name="photo" component="div" className="text-red-500 mt-1" />
                    </div>

                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-green-600">Next</button>
                </Form>
            </Formik>
        </div>
    );
};

export default BasicDetailsForm;
