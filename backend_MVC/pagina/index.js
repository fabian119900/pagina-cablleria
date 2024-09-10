// WARNING: For GET requests, body is set to null by browsers.
function CargarDatos(codigo) {
  // WARNING: For POST requests, body is set to null by browsers.
  var data = "codigo=" + codigo;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      let misdatos = JSON.parse(this.responseText) // se pasa a JSON para recorrerlo con el for 
        let micontenido = document.getElementById("micontenido")

        for (let a = 0; a < misdatos.length; a++) {

          micontenido.innerHTML += `<div class="item">
                                    <div class="mititulo">${misdatos[a].titulo}</div>
                                    <div class="midescripcion">${misdatos[a].descripcion}</div>
                                    </div>`;
        }
    }
  });

  xhr.open("POST", "http://localhost:3000/cargardatos");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);
}
