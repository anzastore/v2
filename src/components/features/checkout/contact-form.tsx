interface ContactFormProps {
    email: string;
    phoneNumber: string;
    onChange: (field: 'email' | 'phoneNumber', value: string) => void;
}

export const ContactForm = ({ email, phoneNumber, onChange }: ContactFormProps) => {
    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="bg-yellow-500 text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    3
                </span>
                Contact Details
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address (Optional)</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => onChange('email', e.target.value)}
                        placeholder="receipt@example.com"
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send the receipt here.</p>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">WhatsApp Number (Optional)</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => onChange('phoneNumber', e.target.value)}
                        placeholder="0812..."
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 outline-none"
                    />
                </div>
            </div>
        </div>
    );
};
