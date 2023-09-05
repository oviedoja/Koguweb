const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnBebidas = document.querySelector('.bebidas');
const btnSushi = document.querySelector('.sushi');
const btnRamen = document.querySelector('.ramen');
const btnOtros = document.querySelector('.otros');
const contenedorPlatillos = document.querySelector('.platillos');

document.addEventListener('DOMContentLoaded',()=>{
    Eventos();
    platillos();
});

//scroll-up boton 
document.getElementById("boton-arriba").addEventListener("click", scrollup);

function scrollup(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if(currentScroll > 0){
        window.requestAnimationFrame(scrollup);
        window.scrollTo(0, currentScroll-(currentScroll / 10));
    }
}
//aparezca y desaparezca el boton
buttonUp = document.getElementById("boton-arriba");
window.onscroll = function(){
    var scroll = document.documentElement.scrollTop;
    if(scroll > 500){
        buttonUp.style.transform = "scale(1)";
    }
    else if(scroll < 500){
        buttonUp.style.transform = "scale(0)";

    }
}

const Eventos = () => {
    menu.addEventListener('click',AbrirMenu);
}
const AbrirMenu = () => {
        navegacion.classList.remove('ocultar');
        btnCerrar();
}

const btnCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');

    if(document.querySelectorAll('.pantalla-completa').length > 0) return;   

    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-Cerrar');

    while(navegacion.children[4]){
        navegacion.removeChild(navegacion.children[4]);
    }
    navegacion.appendChild(btnCerrar);
    CerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    })
});

imagenes.forEach(imagen=>{
    
    observer.observe(imagen);
});

const CerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click', () => {
            navegacion.classList.add('ocultar');
            overlay.remove();
    });
    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
    }
}
//funcion del menu
const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo, platillo])

    const Bebidas = platillosArreglo.filter(bebida=> bebida.getAttribute('data-platillo') === 'bebida')
    const Sushis = platillosArreglo.filter(sushi=> sushi.getAttribute('data-platillo') === 'sushi')
    const Ramens = platillosArreglo.filter(ramen=> ramen.getAttribute('data-platillo') === 'ramen')
    const Otro = platillosArreglo.filter(otros=> otros.getAttribute('data-platillo') === 'otros')

    mostrarPlatillos(Bebidas, Sushis, Ramens, Otro, platillosArreglo);
}
//funcion para botones del menu
const mostrarPlatillos = (Bebidas, Sushis, Ramens, Otro, todos) =>{
    btnBebidas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        Bebidas.forEach(bebida=> contenedorPlatillos.appendChild(bebida));
    });
    btnSushi.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        Sushis.forEach(sushi=> contenedorPlatillos.appendChild(sushi));
    });
    btnRamen.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        Ramens.forEach(ramen=> contenedorPlatillos.appendChild(ramen));
    });
    btnOtros.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        Otro.forEach(otros=> contenedorPlatillos.appendChild(otros));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor)=>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}
