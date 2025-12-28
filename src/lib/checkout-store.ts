import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/catalog';

interface ContractUserInputs {
    user_id: string;
    zone_id?: string;
    username?: string;
}

interface ContactInfo {
    email: string;
    phoneNumber: string;
}

interface CheckoutState {
    // Session Data
    game: { id: number; name: string; thumbnails: string } | null; // UI Only
    product: Product | null;
    userInputs: ContractUserInputs | null; // Strict Contract Shape
    contactInfo: ContactInfo;

    // Actions
    initCheckout: (
        game: { id: number; name: string; thumbnails: string },
        product: Product,
        userInputs: ContractUserInputs
    ) => void;

    updateContactInfo: (info: Partial<ContactInfo>) => void;
    clearSession: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            game: null,
            product: null,
            userInputs: null,
            contactInfo: { email: '', phoneNumber: '' },

            initCheckout: (game, product, userInputs) => set({
                game,
                product,
                userInputs,
                contactInfo: { email: '', phoneNumber: '' }
            }),

            updateContactInfo: (info) => set((state) => ({
                contactInfo: { ...state.contactInfo, ...info }
            })),

            clearSession: () => set({
                game: null,
                product: null,
                userInputs: null,
                contactInfo: { email: '', phoneNumber: '' }
            })
        }),
        {
            name: 'checkout-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
