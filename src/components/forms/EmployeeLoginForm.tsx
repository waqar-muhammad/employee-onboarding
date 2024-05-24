import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EmployeeLoginFormProps } from '../../types/types';

const EmployeeLoginForm: React.FC<EmployeeLoginFormProps> = ({ onNext, onPrevious, data }) => {
    const initialValues = {
        giveLogin: data.giveLogin ? data.giveLogin : false,
        email: data.email ? data.email : ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address')
    });

    const handleSubmit = (values: any) => {
        onNext(values);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-teal-100 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 3: Employee Login</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values }) => (
                    <Form>
                        <div className="flex items-center mb-4"> {/* Use flexbox to align items horizontally */}
                            <label htmlFor="giveLogin" className="block text-gray-700 mr-2">Give Student Their Own Login:</label> {/* Add margin-right to create space */}
                            <Field type="checkbox" id="giveLogin" name="giveLogin" className="form-checkbox" style={{ transform: "scale(1.5)" }} />
                        </div>

                        {values.giveLogin && (
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                                <Field type="text" id="email" name="email" className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                            </div>
                        )}
                        <div className="flex justify-between">
                            <button type="button" onClick={onPrevious} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-gray-600">Previous</button>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-green-600">Next</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EmployeeLoginForm;
