import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback, options = {}) => {
    return useMutation({
        mutationFn: fnCallback,
        ...options,
    });
};
