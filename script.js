
const catalogoVehiculos = [
    { tipo: "Auto", marca: "Fiat", modelo: "Cronos", anio: 2023, precio: "$25.000.000" },
    {tipo: "Auto", marca: "Toyota", modelo: "Corolla", anio: 2024, precio: "$34.000.000" },
    {tipo: "Auto", marca: "Honda", modelo: "Civic", anio: 2023, precio: "$30.000.000" },
    {tipo: "Auto", marca: "Chevrolet", modelo: "Onix", anio: 2026, precio: "$33.000.000" },
    { tipo: "Camioneta", marca: "Toyota", modelo: " Hilux", anio: 2024, precio: "$43.771.000" },
    { tipo: "Camioneta", marca: "Ford", modelo: "Raptor", anio: 2025 , precio: "$117.780.000" },
    { tipo: "Camioneta", marca: "Nissan", modelo: "Frontier", anio: "2026" , precio: "$50.000.000" },
    { tipo: "Camioneta", marca: "Ford", modelo: "Ranger", anio: 2022, precio: "$54.000.000" }
];

let categoriaActual = "";
const tablaCuerpo = document.querySelector("#catalogo tbody");

function renderizarTabla(lista) {
    if (!tablaCuerpo) return;
    tablaCuerpo.innerHTML = "";

    if (lista.length === 0) {
        tablaCuerpo.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay vehículos registrados en esta categoría.</td></tr>';
        return;
    }

    lista.forEach((vehiculo) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${vehiculo.tipo}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anio}</td>
            <td>${vehiculo.precio}</td>
        `;
        tablaCuerpo.appendChild(fila);
    });
}

// 4. Selección de Categoría (Autos / Camionetas)
function seleccionarCategoria(tipo) {
    categoriaActual = tipo;
    
    const tituloCategoria = document.getElementById("titulo-categoria-seleccionada");
    if (tituloCategoria) {
        tituloCategoria.textContent = `Catálogo de ${tipo}s`;
    }

    const contenedorCategorias = document.getElementById("contenedor-categorias");
    const contenedorTabla = document.getElementById("contenedor-tabla-catalogo");

    if (contenedorCategorias && contenedorTabla) {
        contenedorCategorias.classList.add("d-none");
        contenedorTabla.classList.remove("d-none");
    }

    const inputBusqueda = document.getElementById("buscar-catalogo");
    if (inputBusqueda) {
        inputBusqueda.value = "";
    }

    filtrarYRenderizar();
}

// 5. Volver a las tarjetas de categorías
function volverACategorias() {
    categoriaActual = "";
    
    const contenedorCategorias = document.getElementById("contenedor-categorias");
    const contenedorTabla = document.getElementById("contenedor-tabla-catalogo");

    if (contenedorCategorias && contenedorTabla) {
        contenedorTabla.classList.add("d-none");
        contenedorCategorias.classList.remove("d-none");
    }
}

// 6. Filtrado combinado (Categoría + Texto de Búsqueda)
function filtrarYRenderizar() {
    const textoBusqueda = document.getElementById("buscar-catalogo")?.value.toLowerCase().trim() || "";

    const vehiculosFiltrados = catalogoVehiculos.filter((vehiculo) => {
        const coincideCategoria = vehiculo.tipo.toLowerCase() === categoriaActual.toLowerCase();
        const coincideTexto = (
            vehiculo.marca.toLowerCase().includes(textoBusqueda) ||
            vehiculo.modelo.toLowerCase().includes(textoBusqueda) ||
            vehiculo.anio.toString().includes(textoBusqueda) 
        );

        return coincideCategoria && coincideTexto;
    });

    renderizarTabla(vehiculosFiltrados);
}

// 7. Event Listener del Formulario (Guardar nuevo vehículo)
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipoInput = document.getElementById("tipo").value;
        const marcaInput = document.getElementById("marca").value;
        const modeloInput = document.getElementById("modelo").value;
        const anioInput = document.getElementById("anio").value;
        const precioNumerico = Number(document.getElementById("precio").value);
        const precioFormateado = '$' + precioNumerico.toLocaleString('es-AR');

        const nuevoVehiculo = {
            tipo: tipoInput,
            marca: marcaInput,
            modelo: modeloInput,
            anio: anioInput,
            precio: precioFormateado
        };

        catalogoVehiculos.push(nuevoVehiculo);
        formRegistro.reset();

        // Si la tabla de esa categoría está abierta, la actualiza inmediatamente
        if (categoriaActual && tipoInput.toLowerCase() === categoriaActual.toLowerCase()) {
            filtrarYRenderizar();
        }
    });
}

// 8. Event Listener del buscador en tiempo real
const inputBusqueda = document.getElementById("buscar-catalogo");
if (inputBusqueda) {
    inputBusqueda.addEventListener("input", filtrarYRenderizar);
}

// Función para filtrar los vehículos según Tipo y Marca al presionar Buscar
function filtrarVehiculos() {
    const tipoSeleccionado = document.getElementById("filtro-tipo")?.value || "";
    const marcaSeleccionada = document.getElementById("filtro-marca")?.value || "";

    const resultados = catalogoVehiculos.filter(vehiculo => {
        // Coincidencia por Tipo
        const coincideTipo = tipoSeleccionado === "" || vehiculo.tipo.toLowerCase() === tipoSeleccionado.toLowerCase();
        
        // Coincidencia por Marca
        const coincideMarca = marcaSeleccionada === "" || vehiculo.marca.toLowerCase() === marcaSeleccionada.toLowerCase();

        return coincideTipo && coincideMarca;
    });

    // Cambiar título del catálogo para indicar la búsqueda
    const tituloCategoria = document.getElementById("titulo-categoria-seleccionada");
    if (tituloCategoria) {
        tituloCategoria.textContent = "Resultados de la Búsqueda";
    }

    // Ocultar categorías y MOSTRAR la tabla con los resultados
    const contenedorCategorias = document.getElementById("contenedor-categorias");
    const contenedorTabla = document.getElementById("contenedor-tabla-catalogo");

    if (contenedorCategorias && contenedorTabla) {
        contenedorCategorias.classList.add("d-none");
        contenedorTabla.classList.remove("d-none");
    }

    // Dibujar los resultados en tu tabla existente
    renderizarTabla(resultados);
}
function mostrarVehiculos(lista) {
    const tabla = document.getElementById("tabla-vehiculos"); // Asegurate que tu <tbody> en HTML tenga este id
    if (!tabla) return;

    tabla.innerHTML = ""; // Limpiamos la tabla antes de cargar los datos

    lista.forEach(vehiculo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${vehiculo.tipo}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anio}</td>
            <td>${vehiculo.precio}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para reiniciar los filtros a su estado original
function limpiarFiltros() {
    if (document.getElementById("filtro-tipo")) document.getElementById("filtro-tipo").value = "";
    if (document.getElementById("filtro-marca")) document.getElementById("filtro-marca").value = "";
    
    mostrarVehiculos(catalogoVehiculos);
}

// Lógica de Login y control de acceso al formulario
const USUARIO_CORRECTO = "cibr@gmail.com";
const CLAVE_CORRECTA = "1234";

const formLogin = document.getElementById("form-login");
const btnLoginNav = document.getElementById("btn-login-nav");
const seccionRegistro = document.getElementById("registro");
const itemRegistroNav = document.getElementById("item-registro");
const seccionFiltros = document.getElementById("filtros");
const itemFiltrosNav = document.getElementById("item-buscar");
const seccionPortada = document.getElementById("seccion-portada");
if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = document.getElementById("email-login")?.value.trim();
        const pass = document.getElementById("password-login")?.value.trim();

        if (user === USUARIO_CORRECTO && pass === CLAVE_CORRECTA) {
            // Muestra la sección de cargar vehículo
            seccionRegistro?.classList.remove("d-none");
            itemRegistroNav?.classList.remove("d-none");
            seccionFiltros?.classList.remove("d-none");
            itemFiltrosNav?.classList.remove("d-none");
             seccionPortada?.classList.add("d-none");
            // Cierra el modal de login
            const modalEl = document.getElementById("modalLogin");
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();

            // Cambia el botón a Cerrar Sesión
            if (btnLoginNav) {
                btnLoginNav.textContent = "Cerrar sesión";
                btnLoginNav.removeAttribute("data-bs-toggle");
                btnLoginNav.removeAttribute("data-bs-target");
                btnLoginNav.onclick = cerrarSesion;
            }

            formLogin.reset();
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
}

function cerrarSesion() {
    // Oculta el formulario de nuevo vehículo
    seccionRegistro?.classList.add("d-none");
    itemRegistroNav?.classList.add("d-none");
    seccionFiltros?.classList.add("d-none");
    itemFiltrosNav?.classList.add("d-none");

    // Restaura el botón a Iniciar Sesión
    seccionPortada?.classList.remove("d-none");
    if (btnLoginNav) {
        btnLoginNav.textContent = "iniciar sesión";
        btnLoginNav.setAttribute("data-bs-toggle", "modal");
        btnLoginNav.setAttribute("data-bs-target", "#modalLogin");
        btnLoginNav.onclick = null;
    }
}