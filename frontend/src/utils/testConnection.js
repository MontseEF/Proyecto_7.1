// Test de conexión con el backend
export async function testBackendConnection() {
  try {
    console.log('🔍 Probando conexión con el backend...');
    console.log('🌐 API URL:', import.meta.env.VITE_API_URL);
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
    const data = await response.json();
    
    console.log('✅ Respuesta del backend:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error conectando con el backend:', error);
    return { success: false, error: error.message };
  }
}

export async function testLogin() {
  try {
    console.log('🔍 Probando login...');
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: '123456'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login exitoso:', data);
      return { success: true, data };
    } else {
      console.error('❌ Error en login:', data);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('❌ Error en petición de login:', error);
    return { success: false, error: error.message };
  }
}