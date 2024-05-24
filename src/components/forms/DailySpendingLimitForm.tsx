import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DailySpendingLimitFormProps } from '../../types/types';

const DailySpendingLimitForm: React.FC<DailySpendingLimitFormProps> = ({ onNext, onPrevious, data }) => {
    const initialValues = {
        dailySpendingLimit: data.dailySpendingLimit ? data.dailySpendingLimit : 0
    };

    const validationSchema = Yup.object({
        dailySpendingLimit: Yup.number()
            .positive('Daily spending limit must be a positive number')
            .required('Daily spending limit is required')
    });

    const handleSubmit = (values: any) => {
        onNext(values);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-teal-100 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 4: Daily Spending Limit</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="mb-4">
                        <label htmlFor="dailySpendingLimit" className="block text-gray-700 mb-2">Daily Spending Limit:</label>
                        <Field type="number" id="dailySpendingLimit" name="dailySpendingLimit" className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        <ErrorMessage name="dailySpendingLimit" component="div" className="text-red-500 mt-1" />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={onPrevious} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-gray-600">Previous</button>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md focus:outline-none focus:bg-green-600">Next</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default DailySpendingLimitForm;
