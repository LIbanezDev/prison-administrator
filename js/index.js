const formAgregarReo = document.getElementById('form-agregar-reo');
const ciudadesContainer = document.querySelector('#ciudad-reo');
const reosContainer = document.querySelector('#container-reos');

tinymce.init({
    selector: 'textarea#descripcion-reo',
    language: 'es_MX',
    menubar: false,
    plugins: [
        'emoticons',
    ],
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image | print preview media fullpage | ' +
        'forecolor backcolor emoticons | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:23px }'
});

const gravedadReosIcons = {
    leve: ['fa-wheelchair', 'text-success'],
    grave: ['fa-angry', 'text-gray'],
    peligroso: ['fa-bomb', 'text-warning'],
    enemigo_social: ['fa-skull-crossbones', 'text-danger']
}

const ciudades = {
    1: 'Vina del Mar',
    2: 'Quilpue',
    3: 'Santiago',
    4: 'Otro'
}

// Llenar ciudades
Object.keys(ciudades).forEach((codigoCiudad, index) => {
    const nuevaCiudad = document.createElement('option');
    nuevaCiudad.value = codigoCiudad;
    nuevaCiudad.innerText = ciudades[codigoCiudad];
    if (index === 0) nuevaCiudad.selected = true;
    ciudadesContainer.appendChild(nuevaCiudad);
})

const agregarReoTabla = informacionReo => {
    try {
        const newReo = document.createElement('tr');

        const reoNameTh = document.createElement('th')
        reoNameTh.scope = 'row';
        reoNameTh.innerText = informacionReo.nombre + ' ' + informacionReo.apellido;
        newReo.appendChild(reoNameTh);

        const reoDetailsTd = document.createElement('td');
        reoDetailsTd.innerHTML = informacionReo.detalle;
        newReo.appendChild(reoDetailsTd);

        const reoCityTd = document.createElement('td');
        reoCityTd.innerText = informacionReo.ciudad;
        newReo.appendChild(reoCityTd);

        const reoDangerLevelTd = document.createElement('td');
        const reoDangerLevelIcon = document.createElement('i');
        const cantidadCrimenes = informacionReo.cantidad_crimenes;
        let classListToAdd;
        if (cantidadCrimenes <= 3) classListToAdd = gravedadReosIcons.leve;
        else if (cantidadCrimenes <= 6) classListToAdd = gravedadReosIcons.grave;
        else if (cantidadCrimenes <= 15) classListToAdd = gravedadReosIcons.peligroso;
        else classListToAdd = gravedadReosIcons.enemigo_social;
        reoDangerLevelIcon.classList.add('fas', 'fa-2x', ...classListToAdd);
        reoDangerLevelTd.classList.add('text-center');
        reoDangerLevelTd.appendChild(reoDangerLevelIcon);
        newReo.appendChild(reoDangerLevelTd);

        reosContainer.appendChild(newReo);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

formAgregarReo.addEventListener('submit', e => {
    e.preventDefault();
    const informacionReo = {
        nombre: document.getElementById('nombre-reo').value,
        apellido: document.getElementById('apellido-reo').value,
        cantidad_crimenes: parseInt(document.getElementById('crimenes-reo').value),
        detalle: tinymce.get("descripcion-reo").getContent(),
        ciudad: ciudades[parseInt(ciudadesContainer.value)]
    }
    let alertInfo;
    if (agregarReoTabla(informacionReo)) {
        alertInfo = {icon: 'success', title: 'Felicitaciones!', text: 'Registro de criminal realizado.'};
    } else {
        alertInfo = {icon: 'error', title: 'Algo ocurrio!', text: 'El reo no pudo ser agregado, intente nuevamente.'};
    }
    Swal.fire(alertInfo)
})