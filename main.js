(function () {
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
})();

(function () {
  // Conexión con Supabase. La clave publishable es pública por diseño: la seguridad la da RLS en la tabla.
  var SUPABASE_URL = 'https://qtwlhpimrozszlawbxcr.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_LGb_ZXwGOj4ZGOzGn4GwTA_fcEPulYh';
  var EMAIL_FALLBACK = 'lara.marketing@gmail.com';

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');

  function say(msg, kind) { status.textContent = msg; status.className = 'status ' + (kind || ''); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements.sitio_web && form.elements.sitio_web.value) { say('Mensaje enviado. Gracias, te respondo pronto.', 'ok'); form.reset(); return; }
    if (!form.checkValidity()) {
      form.reportValidity();
      say('Revisa los campos marcados: nombre, email, mensaje (mínimo 10 caracteres) y la casilla de privacidad.', 'err');
      return;
    }
    var f = form.elements;
    var payload = {
      nombre: f.nombre.value.trim(),
      email: f.email.value.trim(),
      empresa: f.empresa.value.trim() || null,
      servicio: f.servicio.value || null,
      mensaje: f.mensaje.value.trim(),
      acepta_privacidad: f.acepta_privacidad.checked,
      origen: (location.pathname || '/').slice(0, 200)
    };
    btn.disabled = true; say('Enviando...', '');
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, 12000);
    fetch(SUPABASE_URL + '/rest/v1/contactos', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify(payload),
      signal: ctrl.signal
    }).then(function (res) {
      clearTimeout(timer);
      if (res.status === 201) { form.reset(); say('Mensaje enviado. Gracias, te respondo personalmente en breve.', 'ok'); }
      else { throw new Error('status ' + res.status); }
    }).catch(function () {
      clearTimeout(timer);
      say('No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme a ' + EMAIL_FALLBACK + '.', 'err');
    }).then(function () { btn.disabled = false; });
  });
})();
