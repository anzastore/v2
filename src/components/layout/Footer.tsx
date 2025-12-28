export default function Footer() {
    return (
        <footer className="bg-black text-zinc-500 text-sm border-t border-zinc-900 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            {/* Logo Image */}
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700">
                                <img
                                    src="/images/logo-new.jpg"
                                    alt="Anza Store"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                Anza <span className="text-yellow-500">Store</span>
                            </span>
                        </div>
                        <p className="leading-relaxed mb-6 text-zinc-400">
                            Anza Store adalah platform top up games termurah, aman, dan terpercaya. Proses instan 1-3 detik, layanan 24 Jam nonstop dengan metode pembayaran terlengkap.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/rafilzaaa?igsh=MWJ3MHZicHJrYXQ5bA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all">
                                📷
                            </a>
                            <a href="https://wa.me/6282175552087" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                                💬
                            </a>
                            <a href="mailto:anektahambol2@gmail.com" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                📧
                            </a>
                        </div>
                    </div>

                    {/* Site Map */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Peta Situs</h3>
                        <ul className="space-y-3">
                            <li><a href="/" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> Beranda</a></li>
                            <li><a href="/check-transaction" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> Cek Transaksi</a></li>
                            <li><a href="/contact" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> Hubungi Kami</a></li>
                            <li><a href="/reviews" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> Ulasan Pelanggan</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://wa.me/6282175552087" target="_blank" className="group flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                                        📱
                                    </div>
                                    <span className="text-zinc-400 group-hover:text-yellow-500 transition-colors">WhatsApp Admin</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/rafilzaaa?igsh=MWJ3MHZicHJrYXQ5bA%3D%3D&utm_source=qr" target="_blank" className="group flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                        📸
                                    </div>
                                    <span className="text-zinc-400 group-hover:text-yellow-500 transition-colors">Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:anektahambol2@gmail.com" className="group flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                        ✉️
                                    </div>
                                    <span className="text-zinc-400 group-hover:text-yellow-500 transition-colors">anektahambol2@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Legalitas</h3>
                        <ul className="space-y-3">
                            <li><a href="/privacy" className="hover:text-yellow-500 transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="/terms" className="hover:text-yellow-500 transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="/faq" className="hover:text-yellow-500 transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">&copy; 2025 <strong className="text-white">Anza Store</strong>. All Rights Reserved.</p>
                    <div className="opacity-50 grayscale flex gap-4">
                        {/* Payment Logos Placeholder */}
                        <span>BCA</span>
                        <span>QRIS</span>
                        <span>DANA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
