import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

export const useResponse = (responseId: string | undefined) => {
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {isError} = useQuery({
        queryKey: ['response', responseId],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:3000/response/getResponse/${responseId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch responses: ${res.status}`);
                }
                const responseData = await res.json();
                setResponse(responseData);
                return responseData;
            } catch (error) {
                console.error('An error occurred while fetching forms:', error);
            } finally {
                setIsLoading(false);
            }
        }
    })


    return [response, isLoading, isError];
}