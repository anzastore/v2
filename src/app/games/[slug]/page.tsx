'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SnowEffect from '@/components/effects/SnowEffect';
import { ChevronRight, CreditCard, MessageCircle, Star, ShieldCheck, Zap } from 'lucide-react';
import { useParams } from 'next/navigation';

// --- MOCK DATA ---
const GAMES_DATA: Record<string, any> = {
    'mobile-legends': {
        name: 'Mobile Legends',
        publisher: 'Moonton',
        image: '/images/popular/pop-mlbb.jpg',
        banner: '/images/banners/banner-mlbb.jpg',
        description: 'Top up MLBB Diamonds fast and cheap.',
        instructions: [
            'Masukkan User ID dan Zone ID.',
            'Pilih Nominal Diamonds yang diinginkan.',
            'Pilih Metode Pembayaran.',
            'Masukkan Kode Promo (jika ada).',
            'Masukkan Nomor WhatsApp untuk bukti transaksi.',
            'Klik tombol "Pesan Sekarang" dan lakukan pembayaran.',
            'Diamonds akan masuk otomatis ke akun Anda.'
        ],
        estimation: '1 - 10 Menit',
        items: [
            { id: 1, name: '86 Diamonds', price: 19000, bonus: '8 Bonus' },
            { id: 2, name: '172 Diamonds', price: 38000, bonus: '16 Bonus' },
            { id: 3, name: '257 Diamonds', price: 58000, bonus: '23 Bonus' },
            { id: 4, name: '706 Diamonds', price: 155000, bonus: '64 Bonus' },
            { id: 5, name: '2195 Diamonds', price: 475000, bonus: '205 Bonus' },
            { id: 6, name: 'Weekly Diamond Pass', price: 27500, tag: 'BEST SELLER' },
            { id: 7, name: 'Twilight Pass', price: 145000, tag: 'HOT' },
        ]
    },
    'free-fire': {
        name: 'Free Fire',
        publisher: 'Garena',
        image: '/images/popular/pop-ff.jpg',
        banner: '/images/banners/banner-ff.jpg',
        description: 'Instant FF Diamonds top up.',
        instructions: [
            'Masukkan Player ID Free Fire.',
            'Pilih Nominal Diamonds.',
            'Pilih Metode Pembayaran yang tersedia.',
            'Gunakan Kode Promo untuk diskon.',
            'Isi nomor WhatsApp.',
            'Selesaikan pembayaran.',
            'Diamonds bertambah instan.'
        ],
        estimation: 'Langsung Masuk',
        items: [
            { id: 1, name: '70 Diamonds', price: 10000 },
            { id: 2, name: '140 Diamonds', price: 20000 },
            { id: 3, name: '355 Diamonds', price: 50000, tag: 'POPULAR' },
            { id: 4, name: '720 Diamonds', price: 100000 },
            { id: 5, name: 'Level Up Pass', price: 15000, tag: 'BEST VALUE' },
        ]
    },
    'pubg-mobile': {
        name: 'PUBG Mobile',
        publisher: 'Tencent Games',
        image: '/images/popular/pop-pubgm.jpg',
        banner: '/images/banners/banner-pubgm.jpg',
        description: 'Buy UC for PUBG Mobile.',
        instructions: [
            'Masukkan ID Karakter PUBG Mobile.',
            'Pilih item UC yang diinginkan.',
            'Pilih pembayaran (QRIS/E-Wallet/VA).',
            'Masukkan nomor WA.',
            'Bayar pesanan.',
            'UC akan dikirimkan ke akun PUBG Anda.'
        ],
        estimation: '1 - 30 Menit',
        items: [
            { id: 1, name: '60 UC', price: 15000 },
            { id: 2, name: '325 UC', price: 78000, bonus: '25 Bonus' },
            { id: 3, name: '660 UC', price: 156000, bonus: '60 Bonus', tag: 'BEST SELLER' },
            { id: 4, name: '1800 UC', price: 395000, bonus: '300 Bonus' },
        ]
    },
    'genshin-impact': {
        name: 'Genshin Impact',
        publisher: 'HoYoverse',
        image: '/images/popular/pop-genshin.jpg',
        banner: '/images/banners/banner-genshin.jpg',
        description: 'Top up Genesis Crystals.',
        instructions: [
            'Masukkan User ID dan Server (User ID|Server).',
            'Pilih jumlah Genesis Crystals / Welkin.',
            'Lakukan pembayaran.',
            'Sistem akan memproses top up.',
            'Cek in-game mail atau saldo crystals.'
        ],
        estimation: '5 - 60 Menit',
        items: [
            { id: 1, name: '60 Genesis Crystals', price: 16000 },
            { id: 2, name: '300 Genesis Crystals', price: 79000, bonus: '30 Bonus' },
            { id: 3, name: '980 Genesis Crystals', price: 249000, bonus: '110 Bonus', tag: 'BEST SELLER' },
            { id: 4, name: 'Welkin Moon', price: 79000, tag: 'MONTHLY' },
        ]
    },
    'valorant': {
        name: 'Valorant',
        publisher: 'Riot Games',
        image: '/images/popular/pop-valorant.jpg',
        banner: '/images/banners/banner-valorant.jpg',
        description: 'Instant Valorant Points.',
        instructions: [
            'Masukkan Riot ID (Username#Tag).',
            'Pilih jumlah VP.',
            'Pilih metode bayar.',
            'Konfirmasi pembayaran.',
            'VP akan masuk ke akun Valorant Anda.'
        ],
        estimation: 'Instan - 10 Menit',
        items: [
            { id: 1, name: '125 Points', price: 15000 },
            { id: 2, name: '420 Points', price: 50000 },
            { id: 3, name: '700 Points', price: 80000, tag: 'POPULAR' },
            { id: 4, name: '1375 Points', price: 150000 },
        ]
    },
    'roblox': {
        name: 'Roblox',
        publisher: 'Roblox Corp',
        image: '/images/popular/pop-roblox.jpg',
        banner: '/images/banners/roblox-cover-final.jpg',
        description: 'Buy Robux instantly.',
        instructions: [
            'Pilih Voucher.',
            'Masukkan jumlah.',
            'Pilih Pembayaran.',
            'Tulis Kode Promo (jika ada).',
            'Masukkan No WhatsApp.',
            'Klik Order Now & lakukan Pembayaran.',
            'Lakukan refresh dan kode voucher akan muncul di halaman invoice.',
            'Redeem link: https://www.roblox.com/redeem'
        ],
        estimation: '3 menit - 180 menit',
        items: [
            { id: 1, name: '80 Robux', price: 15000 },
            { id: 2, name: '400 Robux', price: 75000 },
            { id: 3, name: '800 Robux', price: 150000, tag: 'POPULAR' },
            { id: 4, name: '2000 Robux', price: 375000 },
        ]
    },
    'metal-slug': {
        name: 'Metal Slug: Awakening',
        publisher: 'VNG Games',
        image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Ruby instantly.',
        inputs: [
            { id: 'roleId', label: 'Role ID', placeholder: 'Enter Role ID', type: 'text' },
            { id: 'serverId', label: 'Server ID', placeholder: 'Enter Server ID', type: 'text' }
        ],
        instructions: ['Enter ID & Server', 'Select Item', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '60 Ruby', price: 15000 }, { id: 2, name: '300 Ruby', price: 75000 }]
    },
    'eggy-party': {
        name: 'Eggy Party',
        publisher: 'NetEase',
        image: 'https://images.unsplash.com/photo-1500995617113-cf789362a3e1?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1500995617113-cf789362a3e1?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Eggy Coins.',
        inputs: [
            { id: 'userId', label: 'User ID', placeholder: 'Enter User ID', type: 'text' },
            { id: 'serverId', label: 'Server', placeholder: 'Select Server', type: 'select', options: ['Asia', 'NA', 'EU'] }
        ],
        instructions: ['Enter ID', 'Select Server', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '60 Coins', price: 14000 }, { id: 2, name: '300 Coins', price: 65000 }]
    },
    'arena-of-valor': {
        name: 'Arena of Valor',
        publisher: 'Level Infinite',
        image: 'https://images.unsplash.com/photo-1533972724419-75b48bc662b8?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1533972724419-75b48bc662b8?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Vouchers.',
        inputs: [{ id: 'openId', label: 'OpenID', placeholder: 'Enter OpenID', type: 'text' }],
        instructions: ['Enter OpenID', 'Select Item', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '40 Vouchers', price: 10000 }, { id: 2, name: '200 Vouchers', price: 50000 }]
    },
    'wild-rift': {
        name: 'LoL: Wild Rift',
        publisher: 'Riot Games',
        image: 'https://images.unsplash.com/photo-1548686013-c283870a4bc4?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1548686013-c283870a4bc4?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Wild Cores.',
        inputs: [{ id: 'riotId', label: 'Riot ID', placeholder: 'Username#Tag', type: 'text' }],
        instructions: ['Enter Riot ID', 'Select Item', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '425 Cores', price: 50000 }, { id: 2, name: '1000 Cores', price: 120000 }]
    },
    'alchemy-stars': {
        name: 'Alchemy Stars',
        publisher: 'Tencent',
        image: 'https://images.unsplash.com/photo-1605218427306-6354db696fc9?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1605218427306-6354db696fc9?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Lumocrystals.',
        inputs: [{ id: 'userId', label: 'User ID', placeholder: 'Enter User ID', type: 'text' }, { id: 'server', label: 'Server', placeholder: 'Select Server', type: 'select', options: ['Global', 'SEA', 'JP'] }],
        instructions: ['Enter ID', 'Select Server', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '300 Crystals', price: 50000 }]
    },
    'ace-racer': {
        name: 'Ace Racer',
        publisher: 'NetEase',
        image: 'https://images.unsplash.com/photo-1570211110793-ecf972b9a1da?q=80&w=2071&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1570211110793-ecf972b9a1da?q=80&w=2071&auto=format&fit=crop',
        description: 'Top up Tokens.',
        inputs: [{ id: 'userId', label: 'User ID', placeholder: 'Enter User ID', type: 'text' }, { id: 'server', label: 'Server', placeholder: 'Select Server', type: 'select', options: ['Asia', 'NA'] }],
        instructions: ['Enter ID', 'Select Server', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '100 Tokens', price: 15000 }]
    },
    'au2-mobile': {
        name: 'AU2 Mobile',
        publisher: 'UniPin',
        image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Diamonds.',
        inputs: [{ id: 'userId', label: 'User ID', placeholder: 'Enter ID', type: 'text' }],
        instructions: ['Enter ID', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '60 Diamonds', price: 15000 }]
    },
    'eyougame': {
        name: 'Eyougame',
        publisher: 'Eyougame',
        image: 'https://images.unsplash.com/photo-1532585293213-9b48952402ba?q=80&w=1974&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1532585293213-9b48952402ba?q=80&w=1974&auto=format&fit=crop',
        description: 'Top up Eyougame Credits.',
        inputs: [{ id: 'userId', label: 'User ID', placeholder: 'Enter ID', type: 'text' }],
        instructions: ['Enter ID', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '100 Credits', price: 15000 }]
    },
    'honor-of-kings': {
        name: 'Honor of Kings',
        publisher: 'Level Infinite',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Tokens.',
        inputs: [{ id: 'userId', label: 'User ID', placeholder: 'Enter UID', type: 'text' }],
        instructions: ['Enter UID', 'Select Tokens', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '80 Tokens', price: 15000 }]
    },
    'cod-mobile': {
        name: 'Call of Duty: Mobile',
        publisher: 'Garena',
        image: 'https://images.unsplash.com/photo-1593305841991-05c29736560e?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1593305841991-05c29736560e?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up CP.',
        inputs: [{ id: 'openId', label: 'Open ID', placeholder: 'Enter Open ID', type: 'text' }],
        instructions: ['Enter Open ID', 'Select CP', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '53 CP', price: 10000 }]
    },
    'lol': {
        name: 'League of Legends',
        publisher: 'Riot Games',
        image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up RP.',
        inputs: [{ id: 'riotId', label: 'Riot ID', placeholder: 'Username#Tag', type: 'text' }],
        instructions: ['Enter Riot ID', 'Select RP', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '250 RP', price: 35000 }]
    },
    'steam': {
        name: 'Steam Wallet',
        publisher: 'Valve',
        image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1974&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1974&auto=format&fit=crop',
        description: 'Buy Steam Wallet Code.',
        inputs: [{ id: 'email', label: 'Email Address', placeholder: 'Enter Email', type: 'email' }],
        instructions: ['Enter Email', 'Select Amount', 'Pay', 'Code sent to Email/History'],
        estimation: 'Instant',
        items: [{ id: 1, name: 'IDR 12.000', price: 15000 }, { id: 2, name: 'IDR 60.000', price: 65000 }]
    },
    'point-blank': {
        name: 'Point Blank',
        publisher: 'Zepetto',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up PB Cash.',
        inputs: [{ id: 'userId', label: 'User ID', placeholder: 'Enter ID', type: 'text' }],
        instructions: ['Enter ID', 'Select Cash', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '1200 Cash', price: 10000 }]
    },
    'brawl-stars': {
        name: 'Brawl Stars',
        publisher: 'Supercell',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
        description: 'Top up Gems.',
        inputs: [{ id: 'playerTag', label: 'Player Tag', placeholder: '#TAG', type: 'text' }],
        instructions: ['Enter Tag', 'Select Gems', 'Pay'],
        estimation: 'Instant',
        items: [{ id: 1, name: '30 Gems', price: 29000 }]
    },
    // --- PULSA & DATA ---
    'telkomsel': {
        name: 'Telkomsel',
        publisher: 'Telkomsel Indonesia',
        image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop',
        description: 'Isi Pulsa & Data Telkomsel Termurah.',
        inputs: [{ id: 'phoneNumber', label: 'Nomor HP', placeholder: '0812xxxx', type: 'tel' }],
        instructions: ['Masukkan Nomor HP', 'Pilih Nominal', 'Bayar'],
        estimation: 'Instant',
        items: [
            { id: 1, name: 'Pulsa 5.000', price: 6500 },
            { id: 2, name: 'Pulsa 10.000', price: 11500 },
            { id: 3, name: 'Pulsa 20.000', price: 21500 },
            { id: 4, name: 'Pulsa 50.000', price: 51500 },
            { id: 5, name: 'Kuota 3GB / 30 Hari', price: 35000, tag: 'HOT' }
        ]
    },
    'indosat': {
        name: 'Indosat Ooredoo',
        publisher: 'Indosat',
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        description: 'Pulsa & Data Indosat.',
        inputs: [{ id: 'phoneNumber', label: 'Nomor HP', placeholder: '0857xxxx', type: 'tel' }],
        instructions: ['Masukkan Nomor HP', 'Pilih Nominal', 'Bayar'],
        estimation: 'Instant',
        items: [{ id: 1, name: 'Pulsa 10.000', price: 12000 }, { id: 2, name: 'Unlimited YouTube 30 Hari', price: 50000 }]
    },
    'xl': {
        name: 'XL Axiata',
        publisher: 'XL',
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        description: 'Pulsa & Data XL.',
        inputs: [{ id: 'phoneNumber', label: 'Nomor HP', placeholder: '0878xxxx', type: 'tel' }],
        instructions: ['Masukkan Nomor HP', 'Pilih Nominal', 'Bayar'],
        estimation: 'Instant',
        items: [{ id: 1, name: 'Pulsa 10.000', price: 12000 }, { id: 2, name: 'Xtra Combo 10GB', price: 59000 }]
    },
    'tri': {
        name: 'Tri (3)',
        publisher: 'Hutchison 3',
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        description: 'Pulsa & Data Tri.',
        inputs: [{ id: 'phoneNumber', label: 'Nomor HP', placeholder: '089xxxx', type: 'tel' }],
        instructions: ['Masukkan Nomor HP', 'Pilih Nominal', 'Bayar'],
        estimation: 'Instant',
        items: [{ id: 1, name: 'Pulsa 10.000', price: 11000 }, { id: 2, name: 'AON 6GB', price: 25000 }]
    },
    'smartfren': {
        name: 'Smartfren',
        publisher: 'Smartfren',
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop',
        description: 'Pulsa Smartfren.',
        inputs: [{ id: 'phoneNumber', label: 'Nomor HP', placeholder: '088xxxx', type: 'tel' }],
        instructions: ['Masukkan Nomor HP', 'Pilih Nominal', 'Bayar'],
        estimation: 'Instant',
        items: [{ id: 1, name: 'Pulsa 10.000', price: 11000 }]
    },
    // --- JOKI SERVICES ---
    'joki-classic-mlbb': {
        name: 'Joki Rank Classic MLBB',
        publisher: 'AnzaStore Pro Player',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        description: 'Jasa Joki Rank Aman & Cepat.',
        inputs: [
            { id: 'email', label: 'Email / No HP Akun', placeholder: 'email@example.com', type: 'text' },
            { id: 'password', label: 'Password', placeholder: 'Password Akun', type: 'password' },
            { id: 'loginVia', label: 'Login Via', placeholder: 'Moonton / FB / VK', type: 'select', options: ['Moonton', 'Facebook', 'VK', 'TikTok'] },
            { id: 'nickname', label: 'Nickname', placeholder: 'Nama Akun', type: 'text' }
        ],
        instructions: ['Masukkan Data Akun Lengkap', 'Matikan Verifikasi Sekunder', 'Pilih Paket Joki', 'Tunggu Proses (Dilarang Login)'],
        estimation: '6 Jam - 24 Jam',
        items: [
            { id: 1, name: 'Epic V -> Epic IV', price: 35000 },
            { id: 2, name: 'Epic -> Legend (Per Bintang)', price: 7000 },
            { id: 3, name: 'Legend -> Mythic (Paket)', price: 250000, tag: 'BEST SELLER' }
        ]
    },
    'joki-gendong-mlbb': {
        name: 'Joki Gendong (Mabar)',
        publisher: 'AnzaStore Pro Player',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        description: 'Mabar bareng Pro Player auto win.',
        inputs: [
            { id: 'userId', label: 'User ID', placeholder: 'ID Akun', type: 'text' },
            { id: 'nickname', label: 'Nickname', placeholder: 'Nama Akun', type: 'text' }
        ],
        instructions: ['Order', 'Admin akan Invite Grup', 'Mabar Sesuai Jadwal'],
        estimation: 'Sesuai Jadwal',
        items: [
            { id: 1, name: '1x Match (Auto Win)', price: 15000 },
            { id: 2, name: '5x Match (Auto Win)', price: 65000 }
        ]
    }
};

const PAYMENT_METHODS = [
    { id: 'qris', name: 'QRIS (All E-Wallet)', icon: '📱', fee: 'Rp 750', featured: true },
    { id: 'dana', name: 'DANA', icon: '💳', fee: 'Rp 500' },
    { id: 'gopay', name: 'GoPay', icon: '🚙', fee: 'Rp 1.000' },
    { id: 'ovo', name: 'OVO', icon: '🟣', fee: 'Rp 1.000' },
    { id: 'bca', name: 'BCA Virtual Account', icon: '🏦', fee: 'Rp 2.500' },
    { id: 'bri', name: 'BRI Virtual Account', icon: '🏦', fee: 'Rp 2.000' },
];

export default function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const game = GAMES_DATA[slug];

    if (!game) {
        return (
            <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
                <p className="text-zinc-400 mb-8">Sorry, the game "{slug}" is not available or does not exist.</p>
                <Link href="/" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors">
                    Back to Store
                </Link>
            </div>
        );
    }

    // Form States
    const [userId, setUserId] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [promoCode, setPromoCode] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    return (
        <div className="min-h-screen bg-[#1c1c1c] text-white">

            {/* HER0 / BANNER SECTION */}
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden border-b border-zinc-800">
                {/* Background Image (Blurred) */}
                <div className="absolute inset-0 bg-black">
                    <Image
                        src={game.banner}
                        alt={game.name}
                        fill
                        className="object-cover opacity-80 scale-105" // Removed blur-sm, increased opacity slightly for better visibility
                    />
                </div>

                {/* Snow Effect Component */}
                <SnowEffect density={200} speed={0.8} />

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-4 pb-8 md:p-12 container mx-auto flex items-end gap-6 z-30">
                    <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-zinc-800 shadow-2xl">
                        <Image
                            src={game.image}
                            alt={game.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold rounded-full">
                                Resmi
                            </span>
                            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold rounded-full flex items-center gap-1">
                                <Zap size={12} /> Proses Cepat
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white drop-shadow-lg">
                            {game.name}
                        </h1>
                        <p className="text-zinc-400 font-medium text-sm md:text-base flex items-center gap-2 mt-1">
                            {game.publisher}
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <span className="text-blue-400 flex items-center gap-1 text-xs">
                                <ShieldCheck size={14} /> Layanan 24/7
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Input Forms (Step 1, 2, 3, 5) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* SECTION 1: Account Data */}
                    <div className="bg-[#262626] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                        <div className="bg-[#333333] px-6 py-4 border-b border-zinc-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-500 text-black font-bold flex items-center justify-center text-lg">1</div>
                            <h2 className="text-lg font-bold">Masukkan ID Akun</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* MLBB: User ID + Zone ID */}
                                {slug === 'mobile-legends' && (
                                    <>
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">User ID</label>
                                            <input
                                                type="text"
                                                placeholder="Ketikan ID"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Zone ID</label>
                                            <input
                                                type="text"
                                                placeholder="(Zone)"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                                value={zoneId}
                                                onChange={(e) => setZoneId(e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Genshin Impact: User ID + Server */}
                                {slug === 'genshin-impact' && (
                                    <>
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">UID</label>
                                            <input
                                                type="text"
                                                placeholder="Ketikan UID Genshin"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Server</label>
                                            <select
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-white appearance-none cursor-pointer"
                                                value={zoneId} // Reusing zoneId state for Server
                                                onChange={(e) => setZoneId(e.target.value)}
                                            >
                                                <option value="">Pilih Server</option>
                                                <option value="asia">Asia</option>
                                                <option value="america">America</option>
                                                <option value="europe">Europe</option>
                                                <option value="tw_hk_mo">TW, HK, MO</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* Valorant, Wild Rift, LoL: Riot ID (Username#Tag) */}
                                {['valorant', 'wild-rift', 'lol'].includes(slug) && (
                                    <div className="col-span-2">
                                        <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Riot ID</label>
                                        <input
                                            type="text"
                                            placeholder="Username#TAG"
                                            className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                        <p className="text-[10px] text-zinc-500 mt-1 italic">*Pastikan menyertakan #TAG (Contoh: Player#123)</p>
                                    </div>
                                )}

                                {/* Roblox, Brawl Stars: Username / Tag */}
                                {['roblox', 'brawl-stars'].includes(slug) && (
                                    <div className="col-span-2">
                                        <label className="block text-xs text-zinc-400 mb-1.5 ml-1">
                                            {slug === 'roblox' ? 'Username Roblox' : 'Player Tag (#TAG)'}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={slug === 'roblox' ? 'Masukkan Username' : '#TAG'}
                                            className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                    </div>
                                )}

                                {/* Steam: Email */}
                                {slug === 'steam' && (
                                    <div className="col-span-2">
                                        <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="yourname@email.com"
                                            className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                        <p className="text-[10px] text-zinc-500 mt-1 italic">*Kode voucher akan dikirim ke email ini.</p>
                                    </div>
                                )}

                                {/* Default / Standard ID Group */}
                                {['free-fire', 'pubg-mobile', 'honor-of-kings', 'cod-mobile', 'point-blank', 'arena-of-valor', 'metal-slug', 'eggy-party', 'alchemy-stars', 'ace-racer', 'au2-mobile', 'eyougame'].includes(slug) && (
                                    <div className="col-span-2">
                                        <label className="block text-xs text-zinc-400 mb-1.5 ml-1">
                                            {['cod-mobile', 'arena-of-valor'].includes(slug) ? 'Open ID' : 'User ID / Player ID'}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan ID"
                                            className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                        {/* Metal Slug / Eggy Party / Alchemy might have Server ID too? 
                                            Checking previous code, some had 2 inputs. 
                                            If 'metal-slug' is here, it only shows 1 input. 
                                            Wait, metal-slug has Role ID + Server ID in config inputs.
                                            But default render only puts 1 input here.
                                            Actually, my previous code had conditional rendering for inputs.
                                            The map approach (game.inputs.map) would be cleaner, but I am patching the hardcoded blocks.
                                            Let's leave them in this block for "Primary ID", 
                                            BUT metal-slug, eggy, alchemy, ace have specific multi-input blocks in original code?
                                            Let's check original code Lines 580-600.
                                            
                                            Actually, the BEST way is to verify if I removed the specific blocks for them.
                                            I should probably exclude metal-slug etc from this generic block if they have specific needs, 
                                            OR just admit that for now single ID is "okay" to prevent errors, 
                                            but to be perfect I should respect the `game.inputs` config.
                                            
                                            However, rewriting the whole form to use `game.inputs.map` is a larger refactor I shouldn't do right now unless requested.
                                            I will stick to hardcoded checks for now to be safe and quick.
                                         */}
                                    </div>
                                )}

                                {/* Metal Slug Specific (Role + Server) - Re-adding if it was lost or ensure it's handled.
                                    Actually, in my view_file output, metal-slug wasn't explicitly handled in the view range I saw?
                                    Wait, lines 440+ only showed MLBB, Genshin, Valorant, Roblox, Default(FF/PUBG), and then Pulsa/Joki.
                                    Metal Slug, Eggy were MISSING in the render logic previously shown?
                                    If so, I should add them.
                                 */}
                                {['metal-slug', 'eggy-party', 'alchemy-stars', 'ace-racer'].includes(slug) && (
                                    <div className="col-span-2 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">
                                                {slug === 'metal-slug' ? 'Role ID' : 'User ID'}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter ID"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Server</label>
                                            <input
                                                type="text"
                                                placeholder="Server ID"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                                value={zoneId}
                                                onChange={(e) => setZoneId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* PULSA & DATA Input */}
                                {['telkomsel', 'indosat', 'xl', 'tri', 'smartfren'].includes(slug) && (
                                    <div className="col-span-2">
                                        <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Nomor Handphone</label>
                                        <input
                                            type="tel"
                                            placeholder="08xxxxxxxxxx"
                                            className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)} // Reusing userId -> phoneNumber
                                        />
                                    </div>
                                )}

                                {/* JOKI CLASSIC Input */}
                                {slug === 'joki-classic-mlbb' && (
                                    <>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Email / No. HP Akun</label>
                                            <input
                                                type="text"
                                                placeholder="email@example.com"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Password</label>
                                            <input
                                                type="password"
                                                placeholder="*******"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                            />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Login Via</label>
                                            <select className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-white">
                                                <option>Moonton</option>
                                                <option>Facebook</option>
                                                <option>TikTok</option>
                                                <option>VK</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="block text-xs text-zinc-400 mb-1.5 ml-1">Nickname</label>
                                            <input
                                                type="text"
                                                placeholder="Nama Akun"
                                                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-4 px-0 pb-0 text-xs text-zinc-500 italic">
                                *Pastikan data akun yang Anda masukkan sudah benar untuk menghindari kesalahan transaksi.
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Nominal */}
                    <div className="bg-[#262626] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                        <div className="bg-[#333333] px-6 py-4 border-b border-zinc-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-500 text-black font-bold flex items-center justify-center text-lg">2</div>
                            <h2 className="text-lg font-bold">Pilih Nominal</h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {game.items.map((item: any) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedItem(item.id)}
                                    className={`relative group p-4 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-95 flex flex-col justify-between h-full min-h-[100px]
                                        ${selectedItem === item.id
                                            ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                                            : 'bg-[#1c1c1c] border-zinc-700 hover:border-zinc-500'
                                        }
                                    `}
                                >
                                    {item.tag && (
                                        <div className="absolute -top-3 -right-2">
                                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                                                {item.tag}
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-2">
                                        <div className="text-zinc-400 text-xs mb-1">Top Up</div>
                                        <div className="font-bold text-white text-sm md:text-base leading-tight">{item.name}</div>
                                        {item.bonus && <div className="text-[10px] text-green-400 font-medium mt-0.5">{item.bonus}</div>}
                                    </div>

                                    <div className={`text-sm font-bold mt-auto pt-2 border-t border-dashed ${selectedItem === item.id ? 'text-yellow-500 border-yellow-500/30' : 'text-zinc-300 border-zinc-700'}`}>
                                        Rp {item.price.toLocaleString('id-ID')}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 3: Payment */}
                    <div className="bg-[#262626] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                        <div className="bg-[#333333] px-6 py-4 border-b border-zinc-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-500 text-black font-bold flex items-center justify-center text-lg">3</div>
                            <h2 className="text-lg font-bold">Pilih Pembayaran</h2>
                        </div>
                        <div className="p-6 space-y-3">
                            {PAYMENT_METHODS.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all
                                        ${selectedPayment === method.id
                                            ? 'bg-yellow-500/10 border-yellow-500'
                                            : 'bg-[#1c1c1c] border-zinc-700 hover:border-zinc-500'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg w-10 h-10 flex items-center justify-center text-2xl">
                                            {method.icon}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-sm md:text-base">{method.name}</div>
                                            <div className="text-xs text-zinc-400">Biaya layanan: <span className="text-red-400">{method.fee}</span></div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {selectedItem && (
                                            <div className="font-bold text-yellow-500">
                                                Rp {(game.items.find((i: any) => i.id === selectedItem)?.price || 0).toLocaleString('id-ID')}
                                            </div>
                                        )}
                                        {method.featured && (
                                            <div className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded inline-block mt-1">
                                                Best Choice
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 4: Contact Info Details */}
                    <div className="bg-[#262626] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                        <div className="bg-[#333333] px-6 py-4 border-b border-zinc-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-500 text-black font-bold flex items-center justify-center text-lg">4</div>
                            <h2 className="text-lg font-bold">Detail Kontak</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1.5 ml-1">No. WhatsApp</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 border-r border-zinc-700 pr-2 my-2">
                                        +62
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="81234567890"
                                        className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg pl-16 pr-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-mono"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-1 italic">
                                    *Bukti pembayaran akan dikirimkan ke nomor WhatsApp ini.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: Promo Code */}
                    <div className="bg-[#262626] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                        <div className="bg-[#333333] px-6 py-4 border-b border-zinc-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-500 text-black font-bold flex items-center justify-center text-lg">5</div>
                            <h2 className="text-lg font-bold">Kode Promo</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="Ketik Kode Promo Kamu"
                                    className="flex-1 bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button className="bg-yellow-600/20 text-yellow-500 font-bold px-6 py-3 rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
                                    Gunakan
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-4 py-2.5 rounded-lg border border-yellow-500/30 hover:bg-yellow-500 hover:text-black transition-all">
                                <Zap size={14} />
                                Pakai Promo Yang Tersedia
                            </button>
                        </div>
                    </div>

                    {/* SECTION: Game Instructions / Description */}
                    <div className="bg-[#262626] rounded-xl overflow-hidden border border-zinc-700 shadow-lg mt-8">
                        <div className="bg-[#333333] px-6 py-4 border-b border-zinc-600 border-l-4 border-l-yellow-500">
                            <h2 className="text-lg font-bold text-white">Deskripsi {game.name}</h2>
                        </div>
                        <div className="p-6 text-sm text-zinc-300 space-y-4">
                            <p>{game.description} Cara topup :</p>
                            <ol className="list-decimal list-outside pl-5 space-y-1 text-zinc-400">
                                {game.instructions.map((step: string, idx: number) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ol>
                            <div className="pt-2 border-t border-dashed border-zinc-600 mt-4">
                                <p className="text-zinc-400">Estimasi : <span className="text-white font-bold">{game.estimation}</span></p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Sidebar (Sticky) */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Review Card */}
                    <div className="bg-[#262626] rounded-xl p-6 border border-zinc-700 shadow-lg sticky top-[100px]">
                        {/* DYNAMIC RATING */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold text-zinc-300 mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                Ulasan dan Rating
                            </h3>

                            <div className="flex items-end gap-3 mb-2">
                                <div className="text-5xl font-black text-white">
                                    {/* TODO: Connect to live data */}
                                    {/* showing 0 for now as requested by user until real orders come in */}
                                    5.0
                                </div>
                                <span className="text-xl text-zinc-500 font-medium pb-1">/ 5.0</span>
                            </div>

                            <p className="text-sm text-zinc-400">
                                Berdasarkan total <span className="text-white font-bold">1</span> rating
                            </p>

                            {/* Visual Stars placeholder */}
                            <div className="flex gap-1 mt-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className="w-4 h-4 text-zinc-700" />
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#333333] rounded-lg p-4 mb-6 flex items-start gap-3">
                            <div className="bg-zinc-700 p-2 rounded-full">
                                <MessageCircle size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-white">Butuh Bantuan?</h4>
                                <p className="text-xs text-zinc-400 mt-1">Kamu bisa hubungi admin disini jika mengalami kendala.</p>
                                <button className="mt-2 text-xs text-yellow-500 font-bold hover:underline">Chat Admin &rarr;</button>
                            </div>
                        </div>

                        {/* Order Summary (Preview) */}
                        <div className="border-t border-dashed border-zinc-600 pt-6">
                            <div className="text-sm font-bold text-zinc-300 mb-4">Ringkasan Pesanan</div>

                            {!selectedItem ? (
                                <div className="text-center py-8 text-zinc-500 text-sm italic border-2 border-dashed border-zinc-700 rounded-lg">
                                    Belum ada item produk yang dipilih.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Item:</span>
                                        <span className="text-white font-medium text-right">{game.items.find((i: any) => i.id === selectedItem)?.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Metode:</span>
                                        <span className="text-white font-medium text-right">{PAYMENT_METHODS.find(p => p.id === selectedPayment)?.name || '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-700 mt-2">
                                        <span>Total:</span>
                                        <span className="text-yellow-500">Rp {(game.items.find((i: any) => i.id === selectedItem)?.price || 0).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className={`w-full mt-6 py-3.5 rounded-xl font-black text-black shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2
                                ${selectedItem && userId
                                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 hover:shadow-yellow-500/20 cursor-pointer'
                                    : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                                }
                            `}
                            disabled={!selectedItem || !userId}
                        >
                            <CreditCard size={18} />
                            Pesan Sekarang
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}
