import {defineStore} from "pinia";
import {v4 as uuidv4} from 'uuid';

const createToast = (title: string, text: string, status: ToastType): IToast => ({
    title,
    text,
    type: status,
    id: uuidv4(),
});


export type ToastType = "success" | "warning" | "error" | "info"

//Even if the text is the same, cool to have it universal
interface IToast {
    title: string;
    text: string;
    type: ToastType;
    id: string;
}

type ToastPayload = { timeout?: number; title: string; text: string };

export const useToasterStore = defineStore("toaster-store", {
    state: (): { toasts: IToast [] } => ({
        toasts: []
    }),
    actions: {
        updateState(payload: ToastPayload, type: ToastType) {
            const {title, text, timeout} = payload
            const toast = createToast(title, text, type)

            //For never having more than 5 elements
            if (this.toasts.length >= 5) {
                this.toasts.shift();
            }

            this.toasts.push(toast)
            if (timeout !== undefined) {
                setTimeout(() => {
                    this.toasts = this.toasts.filter((t) => t.id !== toast.id);
                }, timeout);
            }
        },

        create(payload: ToastPayload, type: ToastType) {
            this.updateState(payload, type)
        },

        remove(id: string) {
            this.toasts = this.toasts.filter((toast) => toast.id !== id);
        }
    },
    getters: {
        getById: (state) => {
            return (id: string) => state.toasts.find(t => t.id === id)
        },
        // I did, but never used :)
        list: (state) => state.toasts,
    },
});
