import {useState} from "react";
import {useQuery} from "@tanstack/react-query";


export const useForms = (email: string,) => {
    const [forms, setForms] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {error} = useQuery({
        queryKey: ['forms', email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:3000/form/forms/${email}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch forms: ${res.statusText}`);
                }
                const formsData = await res.json();
                setForms(formsData);
                return formsData;
            } catch (error) {
                console.error('An error occurred while fetching forms:', error);
            } finally {
                setIsLoading(false);
            }
        }
    })

    const deleteForm = async (formId: string) => {
        try {
            const res = await fetch(`http://localhost:3000/form/delete/${formId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                setForms(prevForms => {
                    const updatedForms = {...prevForms};
                    updatedForms.data = updatedForms.data.filter((form: { formId: string; }) => form.formId !== formId);
                    return updatedForms;
                })

            } else {
                console.error('Failed to delete form:', res.statusText);
            }
        } catch (error) {
            console.error('An error occurred while deleting the form:', error);
        }
    }

    return [forms, deleteForm, isLoading, error];
};