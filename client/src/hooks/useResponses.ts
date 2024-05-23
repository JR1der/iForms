import {useQuery} from "@tanstack/react-query";

export const useResponses = (formId: string) => {
    const {isLoading, isError, data} = useQuery({
        queryKey: ['responses', formId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/response/getResponses/${formId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch responses: ${res.status}`);
            }
            const responseData = await res.json();
            return responseData;
        }
    });

    return [data, isLoading, isError];
}
