// Script de prueba para verificar la API
const axios = require('axios');

async function testRegister() {
    try {
        console.log('🧪 Probando registro...');
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            name: 'Usuario Prueba',
            email: 'test@test.com',
            password: '123456'
        });
        console.log('✅ Registro exitoso:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Error en registro:', error.response?.data || error.message);
        return null;
    }
}

async function testLogin() {
    try {
        console.log('🧪 Probando login...');
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'test@test.com',
            password: '123456'
        });
        console.log('✅ Login exitoso:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Error en login:', error.response?.data || error.message);
        return null;
    }
}

async function runTests() {
    console.log('🚀 Iniciando tests de API...\n');
    
    // Probar registro
    await testRegister();
    
    console.log('\n---\n');
    
    // Probar login
    await testLogin();
    
    console.log('\n🏁 Tests completados');
}

runTests();