// Archivo de configuración para el entorno de desarrollo
export const environment = {
production: false,// Indica si la app está en modo producción (false para desarrollo)
// Configuración del proyecto Firebase
 firebaseConfig: {
  apiKey: "AIzaSyCXCEwxXq7C25kxSCaYPU75wN275C7XIiM",// Clave de API de Firebase
  authDomain: "santaana-18129.firebaseapp.com",// Dominio de autenticación
  projectId: "santaana-18129",// ID del proyecto de Firebase
  storageBucket: "santaana-18129.firebasestorage.app",// Bucket de almacenamiento
  messagingSenderId: "923998032603",// ID del emisor para mensajes push
  appId: "1:923998032603:web:83cb5d005ca40819a732fe",// ID único de la app
  measurementId: "G-N7NZTZLV12"// ID de medición para Analytics
}
};