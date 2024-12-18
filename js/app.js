document.addEventListener('DOMContentLoaded', function() {

    const email = {
        nombre: '',
        apellido: '',
        email: '',
        asunto: '',
        mensaje: ''
    }
    // console.log(email)


    // Seleccionamos los elementos de la interfaz
    const inputNombre = document.querySelector('#nombre')
    const inputApellido = document.querySelector('#apellido')
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    // Asignamos eventos
    inputNombre.addEventListener('input', validar)
    inputApellido.addEventListener('input', validar)
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    formulario.addEventListener('submit', enviarEmail)
    
    btnReset.addEventListener('click', (e) => {
        // console.log(e.target)
        e.preventDefault()

        // Reiniciamos el objeto, por que sino queda grabado en el 'const email'
        resetFormulario()
    })

    function enviarEmail(e){
        e.preventDefault()
        // console.log(e)
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')
        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            // Reiniciamos el objeto después de enviar el formulario
            resetFormulario()

            // Mensaje de confirmación
            const mensajeConfirmacion = document.createElement('P')
            mensajeConfirmacion.classList.add(
                'bg-green-500',
                'text-white',
                'p-2',
                'text-center',
                'rounded-lg',
                'mt-10',
                'font-bold',
                'text-sm',
                'uppercase'
            )
            mensajeConfirmacion.textContent = '¡Mensaje enviado!'
            formulario.appendChild(mensajeConfirmacion)

            setInterval(() => {
                mensajeConfirmacion.remove()
            }, 3000);
            
        }, 3000);
    }

    // Funciones
    function validar(e){

        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo de ${e.target.id} es obligatorio`, e.target.parentElement)
            // Reiniciamos la propiedad antes de comprobar
            email[e.target.name] = ''
            comprobarCampos()
            
            return  
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement)
            // Reiniciamos la propiedad antes de comprobar
            email[e.target.name] = ''
            comprobarCampos()
            
            return
        }

        // console.log('despues del IF')
        limpiarAlerta(e.target.parentElement)

        // Asignar valores al objeto
        email[e.target.name] = e.target.value.trim().toLowerCase()
        // console.log(email)

        // Comprobar campos del formulario
        comprobarCampos()
    }

    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia)

        // Generamos HTML con mensaje de error
        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600','text-sm', 'p-2', 'text-white', 'text-center', 'rounded-lg', 'alerta-on')

        referencia.appendChild(error)

    }

    function limpiarAlerta(referencia) {
       // Comprueba si ya existe un alerta
       const alerta = referencia.querySelector('.alerta-on')
       if(alerta) {
           alerta.remove()
       }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        // console.log(resultado)
        return resultado
    }

    function comprobarCampos() {
        
        // console.log(email)

        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        } 
        
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }

    function resetFormulario() {
        email.nombre = ''
        email.apellido = ''
        email.email = ''
        email.asunto = ''
        email.mensaje = ''

        formulario.reset()
        comprobarCampos()
    }

})