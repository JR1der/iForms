import {useQuery} from "@tanstack/react-query";

export const useQuestionsResponses = (formId: string) => {
    const {isLoading, isError, data} = useQuery({
        queryKey: ['responses', formId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/response/getQuestionResponses/${formId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch responses: ${res.status}`);
            }
            const questionResponsesData = await res.json();
            console.log(questionResponsesData);
            return questionResponsesData;
        }
    });

    return [data, isLoading, isError];
}