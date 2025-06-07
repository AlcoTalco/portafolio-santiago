// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // Lógica para el menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Cambiar icono de hamburguesa a X y viceversa
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }

    // Cerrar menú móvil al hacer clic en un enlace
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenuButton) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Lógica para copiar email
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailLink = document.getElementById('emailLink');
    const copyFeedback = document.getElementById('copyFeedback');

    if (copyEmailBtn && emailLink && copyFeedback) {
        copyEmailBtn.addEventListener('click', () => {
            const email = emailLink.innerText;
            // Crear un elemento de texto temporal para copiar
            const tempInput = document.createElement('input');
            tempInput.style.position = 'absolute';
            tempInput.style.left = '-9999px';
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy'); // Usar execCommand por compatibilidad en iframes
                copyFeedback.textContent = '¡Email copiado!';
            } catch (err) {
                copyFeedback.textContent = 'Error al copiar.';
                console.error('Error al copiar email: ', err);
            }
            document.body.removeChild(tempInput);
            
            setTimeout(() => {
                copyFeedback.textContent = '';
            }, 2000);
        });
    }

    // Año actual para el footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Efecto Typewriter con borrado y múltiples frases
    const typewriterTarget = document.getElementById('typewriter-target');
    const phrases = [
        "Desarrollador Frontend",
        "Creador de Experiencias Web",
        "Desarrollador FullStack",
        "Apasionado por el Código",
        "Solucionador de Problemas"
        // Añade más frases aquí si lo deseas
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 120; // Milisegundos por caracter al escribir
    const deletingSpeed = 60; // Milisegundos por caracter al borrar
    const delayBetweenPhrases = 1500; // Milisegundos de espera antes de borrar/escribir nueva frase

    function typeEffect() {
        if (!typewriterTarget) return; // Salir si el elemento no existe

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Borrando
            typewriterTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length; // Pasa a la siguiente frase, o vuelve al inicio
                setTimeout(typeEffect, typingSpeed); // Pequeña pausa antes de escribir la nueva frase
            } else {
                setTimeout(typeEffect, deletingSpeed);
            }
        } else {
            // Escribiendo
            typewriterTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenPhrases); // Espera antes de empezar a borrar
            } else {
                setTimeout(typeEffect, typingSpeed);
            }
        }
    }
    
    // Iniciar typewriter
    if (typewriterTarget) {
        setTimeout(typeEffect, delayBetweenPhrases / 2); // Inicia después de una pequeña pausa
    }

    // Navegación activa resaltada al hacer scroll
    const sections = document.querySelectorAll('section[id]'); // Seleccionar solo secciones con ID
    const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');
    const headerHeight = document.querySelector('header')?.offsetHeight || 80; // Obtener altura del header o usar un fallback

    function highlightNavLink() {
        let index = sections.length;

        while(--index && window.scrollY + headerHeight + 50 < sections[index].offsetTop) {} // El 50 es un offset para mejorar la precisión
        
        navLinks.forEach((link) => link.classList.remove('active', 'text-blue-400', 'font-semibold'));
        // Es posible que el enlace correspondiente no exista si hay más secciones que enlaces de navegación
        const activeLink = document.querySelector(`header nav a[href*="${sections[index].id}"], #mobile-menu a[href*="${sections[index].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active', 'text-blue-400', 'font-semibold');
            activeLink.classList.remove('text-gray-300');
        }
    }

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', highlightNavLink);
        highlightNavLink(); // Llamada inicial para resaltar el enlace correcto al cargar la página
    }
});