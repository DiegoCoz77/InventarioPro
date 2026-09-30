// InventarioPro (versión estática) - los datos se guardan en el navegador (localStorage)
const leer = k => JSON.parse(localStorage.getItem(k) || '[]');
const guardar = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const sesion = () => JSON.parse(localStorage.getItem('sesion') || sessionStorage.getItem('sesion') || 'null');
const param = n => new URLSearchParams(location.search).get(n);
const BADGE = { 'En Stock': 'success', 'Agotado': 'warning text-dark', 'Descontinuado': 'secondary' };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
if (!localStorage.getItem('productos')) {
  guardar('productos', [
    { sku: 'PROD-001', nombre: 'Teclado Mecánico RGB', categorias: 'Periféricos', etiqueta: '#0d6efd', estado: 'En Stock', publicado: true },
    { sku: 'PROD-002', nombre: 'Mouse Inalámbrico', categorias: 'Periféricos', etiqueta: '#198754', estado: 'Agotado', publicado: true }]);
  guardar('usuarios', [{ nombres: 'Admin', apellidos: 'Demo', correo: 'admin@demo.com', clave: btoa('123456') }]);
}
function exigirSesion() {
  const s = sesion(); if (!s) location.href = 'login.html?t=warning&m=' + encodeURIComponent('Inicie sesión para continuar');
  else document.getElementById('usuario').innerHTML = esc(s.nombres) + ' · <a class="text-white" href="#" onclick="salir()">Salir</a>';
}
function salir() { localStorage.removeItem('sesion'); sessionStorage.removeItem('sesion'); location.href = 'login.html?m=' + encodeURIComponent('Sesión cerrada'); }
function mostrarAlerta(m, t = 'info') {
  document.getElementById('alerta').innerHTML = m ? `<div class="alert alert-${t} alert-dismissible fade show">${esc(m)}<button class="btn-close" data-bs-dismiss="alert"></button></div>` : '';
}
// Validación de Bootstrap; al ser válido ejecuta la función "ok"
function enviar(id, ok) {
  const f = document.getElementById(id);
  f.addEventListener('submit', e => {
    e.preventDefault();
    const p = f.querySelector('[name=clave]'), c = f.querySelector('[name=clave2]');
    if (p && c) c.setCustomValidity(p.value === c.value ? '' : 'no coinciden');
    f.classList.add('was-validated');
    if (f.checkValidity()) ok(Object.fromEntries(new FormData(f)), f);
  });
}
