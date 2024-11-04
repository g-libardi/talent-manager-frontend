import { ExternalToast, toast } from "sonner"


const toastOptions = {
    position: "top-center",
    richColors: true,
} as ExternalToast


export default function useToast() {
    function success(message: string) {
        toast.success(message, toastOptions)
    }

    function error(message: string) {
        toast.error(message, toastOptions)
    }

    function promise(promise: Promise<any>, successMessage: string = "Success!", errorMessage: string = "Error!") {
        toast.promise(promise, {
            ...toastOptions,
            loading: "Loading...",
            success: successMessage,
            error: errorMessage,
        });
    }
    
    return {
        success,
        error,
        promise,
    }
}
