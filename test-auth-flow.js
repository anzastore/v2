const axios = require('axios');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://anzastore.test/public';
const FRONTEND_ORIGIN = 'http://localhost:3000';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin123';

// Create Axios Instance with Cookie Jar simulation
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Origin': FRONTEND_ORIGIN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    validateStatus: () => true // Don't throw on error status
});

// Cookie management simulation
let cookies = [];

client.interceptors.response.use(response => {
    if (response.headers['set-cookie']) {
        response.headers['set-cookie'].forEach(c => cookies.push(c.split(';')[0]));
    }
    return response;
});

client.interceptors.request.use(config => {
    if (cookies.length > 0) {
        config.headers['Cookie'] = cookies.join('; ');
    }
    const xsrfToken = cookies.find(c => c.startsWith('XSRF-TOKEN'));
    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken.split('=')[1]);
    }
    return config;
});

async function runTest() {
    console.log('--- STARTING FRONTEND AUTH SIMULATION ---');

    try {
        // 1. CSRF Handshake
        console.log(`\n[1] GET ${BASE_URL}/sanctum/csrf-cookie`);
        const csrfResp = await client.get('/sanctum/csrf-cookie');
        console.log(`    Status: ${csrfResp.status}`);

        if (csrfResp.status !== 204 && csrfResp.status !== 200) {
            throw new Error(`CSRF Handshake Failed with status ${csrfResp.status}`);
        }

        // 2. Login
        console.log(`\n[2] POST ${BASE_URL}/login`);
        const loginResp = await client.post('/login', {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });
        console.log(`    Status: ${loginResp.status}`);

        if (loginResp.status !== 200 && loginResp.status !== 204) {
            // ... error handling
        }

        console.log('    Login Successful');
        console.log('    Cookies Received:', cookies);

        // 3. User & Role Check
        console.log(`\n[3] GET ${BASE_URL}/api/user`);
        const userResp = await client.get('/api/user');
        console.log(`    Status: ${userResp.status}`);
        console.log(`    Role: ${userResp.data.role}`);

        if (userResp.data.role !== 'admin') {
            const roleError = `Expected role 'admin', got '${userResp.data.role}'\nUser Data: ${JSON.stringify(userResp.data, null, 2)}`;
            fs.writeFileSync('auth_error.log', roleError);
            throw new Error('Role Validation Failed');
        }

        console.log('\n--- VERIFICATION SUCCESSFUL ---');
        fs.writeFileSync('auth_success.log', 'Login and Role Verification Successful');

    } catch (error) {
        console.error(`\n!!! TEST FAILED: ${error.message}`);
        process.exit(1);
    }
}

runTest();
