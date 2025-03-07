// Script para la página web de Fede Ibarra Estudio Creativo

document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año del copyright automáticamente
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Reemplazar el logo de texto con la imagen IMG7 como fondo
    const logoContainer = document.querySelector('.logo');
    if (logoContainer) {
        // Limpiar el contenido actual del logo
        logoContainer.innerHTML = '';
        
        // Precargar la imagen del logo para asegurar que se cargue correctamente
        const preloadLogoImg = new Image();
        preloadLogoImg.src = 'IMG7.jpg';
        
        preloadLogoImg.onload = function() {
            console.log('Imagen del logo cargada correctamente');
        };
        
        preloadLogoImg.onerror = function() {
            console.error('Error al cargar la imagen del logo (IMG7.jpg)');
            // Restaurar el logo de texto como respaldo
            logoContainer.style.backgroundImage = 'none';
            logoContainer.innerHTML = '<h1>Fede Ibarra</h1><p>Estudio Creativo</p>';
            logoContainer.querySelector('h1').style.display = 'block';
            logoContainer.querySelector('p').style.display = 'block';
        };
    }

    // Precargar la imagen de fondo principal
    const mainBgImg = new Image();
    mainBgImg.src = 'IMG2.jpg';
    
    mainBgImg.onload = function() {
        document.body.classList.add('bg-loaded');
        console.log('Imagen de fondo principal cargada correctamente');
        
        // Crear un overlay para toda la página
        if (!document.querySelector('.overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }
    };
    
    mainBgImg.onerror = function() {
        console.error('Error al cargar la imagen de fondo principal');
        document.body.style.backgroundColor = 'var(--color-parchment)';
        document.body.classList.add('bg-fallback');
        
        // Notificar al usuario si hay problemas con la carga de la imagen
        console.warn('Revisa que el archivo IMG2.jpg esté en la misma carpeta que el archivo HTML');
    };

    // Efecto de scroll para el header
    const header = document.querySelector('header');
    const scrollThreshold = 10; // Umbral muy pequeño para detectar cualquier scroll

    // Función para manejar el scroll - optimizada para rendimiento
    const handleScroll = debounce(function() {
        const logo = document.querySelector('.logo');
        
        if (window.scrollY > scrollThreshold) {
            // Cuando hacemos scroll, el header se fija y se vuelve semitransparente
            header.classList.add('fixed');
            header.style.padding = '0.8rem 5%';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            
            if (logo) {
                logo.style.opacity = '0.4';
            }
        } else {
            // Cuando estamos en la parte superior, el header es absoluto y completamente opaco
            header.classList.remove('fixed');
            header.style.padding = '1.5rem 5%';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            
            if (logo) {
                logo.style.opacity = '1';
            }
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
    
    // Inicializar el estado del header al cargar la página
    if (window.scrollY <= scrollThreshold) {
        header.classList.remove('fixed');
    } else {
        header.classList.add('fixed');
    }
    
    if (logoContainer) {
        logoContainer.style.opacity = '1';
    }

    // Hacer que las imágenes del portfolio estén siempre visibles
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item) => {
        // Eliminar las propiedades que hacen que las imágenes aparezcan con scroll
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
    });

    // Efecto de hover mejorado para portfolio con imagen de fondo IMG5
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        const bgImage = item.getAttribute('data-bg');
        
        if (bgImage) {
            // Precargar la imagen para evitar retrasos
            const img = new Image();
            img.src = bgImage;
            
            img.onload = function() {
                overlay.style.backgroundImage = `url(${bgImage})`;
            };
        }
        
        // Detectar si es un dispositivo táctil
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        
        if (isTouchDevice) {
            // Para dispositivos táctiles, usar clic en lugar de hover
            item.addEventListener('click', function(e) {
                // Encontrar si hay algún elemento activo y desactivarlo
                const activeItems = document.querySelectorAll('.portfolio-item.active');
                activeItems.forEach(activeItem => {
                    if (activeItem !== item) {
                        activeItem.classList.remove('active');
                        const activeOverlay = activeItem.querySelector('.portfolio-overlay');
                        const activeTitle = activeOverlay.querySelector('h3');
                        const activeDesc = activeOverlay.querySelector('p');
                        
                        activeTitle.style.transform = 'translateY(20px)';
                        activeTitle.style.opacity = '0';
                        activeDesc.style.transform = 'translateY(20px)';
                        activeDesc.style.opacity = '0';
                        
                        // Retardar la desaparición del overlay para la animación
                        setTimeout(() => {
                            activeOverlay.style.opacity = '0';
                            activeOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }, 200);
                    }
                });
                
                // Alternar el estado activo del elemento actual
                if (item.classList.contains('active')) {
                    // Desactivar el elemento actual
                    item.classList.remove('active');
                    const title = overlay.querySelector('h3');
                    const desc = overlay.querySelector('p');
                    
                    title.style.transform = 'translateY(20px)';
                    title.style.opacity = '0';
                    desc.style.transform = 'translateY(20px)';
                    desc.style.opacity = '0';
                    
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    }, 200);
                } else {
                    // Activar el elemento actual
                    item.classList.add('active');
                    overlay.style.opacity = '0.95';
                    overlay.style.backgroundColor = 'rgba(245, 240, 225, 0.9)';
                    
                    const title = overlay.querySelector('h3');
                    const desc = overlay.querySelector('p');
                    
                    title.style.transform = 'translateY(0)';
                    title.style.opacity = '1';
                    desc.style.transform = 'translateY(0)';
                    desc.style.opacity = '1';
                }
                
                // Prevenir la propagación del evento para evitar problemas con scrolling
                e.stopPropagation();
            });
            
            // Cerrar el overlay al hacer clic fuera de los elementos
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.portfolio-item')) {
                    const activeItems = document.querySelectorAll('.portfolio-item.active');
                    activeItems.forEach(activeItem => {
                        activeItem.classList.remove('active');
                        const activeOverlay = activeItem.querySelector('.portfolio-overlay');
                        const activeTitle = activeOverlay.querySelector('h3');
                        const activeDesc = activeOverlay.querySelector('p');
                        
                        activeTitle.style.transform = 'translateY(20px)';
                        activeTitle.style.opacity = '0';
                        activeDesc.style.transform = 'translateY(20px)';
                        activeDesc.style.opacity = '0';
                        
                        setTimeout(() => {
                            activeOverlay.style.opacity = '0';
                            activeOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }, 200);
                    });
                }
            });
        } else {
            // Para dispositivos no táctiles, mantener el hover
            item.addEventListener('mouseenter', function() {
                const title = overlay.querySelector('h3');
                const desc = overlay.querySelector('p');
                
                overlay.style.opacity = '0.95';
                overlay.style.backgroundColor = 'rgba(245, 240, 225, 0.9)';
                
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
                
                desc.style.transform = 'translateY(0)';
                desc.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', function() {
                const title = overlay.querySelector('h3');
                const desc = overlay.querySelector('p');
                
                title.style.transform = 'translateY(20px)';
                title.style.opacity = '0';
                
                desc.style.transform = 'translateY(20px)';
                desc.style.opacity = '0';
                
                // Retardar la desaparición del overlay para la animación
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                }, 200);
            });
        }
    });

    // Navegación suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Actualizar la URL sin recargar la página para SEO
                history.pushState(null, null, targetId);
            }
        });
    });

    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Validación simple
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Por favor, ingresa tu nombre');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Por favor, ingresa tu email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Por favor, ingresa un email válido');
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Por favor, ingresa tu mensaje');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Aquí iría el código para enviar el formulario
                // Por ahora, solo mostramos un mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = 'var(--color-red)';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = 'var(--color-sepia)';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Efecto de paralaje para la sección hero
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', debounce(function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition <= window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
        }
    }, 10));

    // Efecto de dibujo para la sección "Sobre Mí" y precarga de imagen de fondo
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        // Precargar la imagen de fondo de manera explícita
        const bgImg = new Image();
        bgImg.src = 'IMG6.jpg';
        
        // Aplicar la imagen de fondo directamente
        bgImg.onload = function() {
            // Asegurar que la imagen de fondo se muestre correctamente
            aboutSection.style.backgroundImage = `url('IMG6.jpg')`;
            aboutSection.style.opacity = 1;
            
            // Efecto de aparición para el texto
            const paragraphs = aboutSection.querySelectorAll('.about-text p');
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = 'translateY(0)';
                }, 300 * index);
            });
            
            console.log('Imagen de fondo cargada correctamente');
        };
        
        bgImg.onerror = function() {
            console.error('Error al cargar la imagen de fondo');
            // Mostrar el contenido aunque la imagen no se cargue
            aboutSection.style.backgroundColor = 'var(--color-sepia)';
            aboutSection.style.opacity = 1;
            
            const paragraphs = aboutSection.querySelectorAll('.about-text p');
            paragraphs.forEach(p => {
                p.style.opacity = 1;
                p.style.transform = 'translateY(0)';
            });
        };
        
        const aboutImage = aboutSection.querySelector('.about-image');
        
        if (aboutImage) {
            // Usar Intersection Observer para efectos de aparición
            const drawingObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutImage.classList.add('drawing-effect');
                        drawingObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            drawingObserver.observe(aboutSection);
        }
    }

    // Añadir estilos CSS para el efecto de dibujo
    const style = document.createElement('style');
    style.textContent = `
        .drawing-effect::before {
            animation: drawBorder 1.5s ease forwards;
        }
        
        @keyframes drawBorder {
            0% {
                width: 0;
                height: 0;
            }
            50% {
                width: 100%;
                height: 0;
            }
            100% {
                width: 100%;
                height: 100%;
            }
        }
        
        .error-message {
            color: var(--color-red);
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        
        .success-message {
            color: #2e7d32;
            font-size: 1.2rem;
            text-align: center;
            padding: 2rem;
            border: 1px solid #2e7d32;
            background-color: rgba(46, 125, 50, 0.1);
        }
    `;
    
    document.head.appendChild(style);

    // Añadir clases específicas para las secciones con fondo
    const sections = document.querySelectorAll('.portfolio, .about, .contact');
    sections.forEach(section => {
        section.classList.add('section-with-bg');
    });

    // Optimizar carga de imágenes con lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading nativo
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Función para mejorar el rendimiento con debounce
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    // Funcionalidad del menú desplegable para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    // Crear overlay para el fondo cuando el menú está abierto
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Accesibilidad: cambiar estado de aria-expanded
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Prevenir scroll del body cuando el menú está abierto
        if (mainNav.classList.contains('active')) {
            body.style.overflow = 'hidden';
            
            // Asegurar que los enlaces sean visibles
            const navLinks = document.querySelectorAll('.main-nav ul li');
            navLinks.forEach((link, index) => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            });
        } else {
            body.style.overflow = '';
        }
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Ajustar menú en resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
}); 