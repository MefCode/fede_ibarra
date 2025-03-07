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
        
        item.addEventListener('mouseenter', function() {
            const title = overlay.querySelector('h3');
            const desc = overlay.querySelector('p');
            
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
        });
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
        bgImg.src = 'IMG8.jpg';
        
        // Aplicar la imagen de fondo directamente
        bgImg.onload = function() {
            // Asegurar que la imagen de fondo se muestre correctamente
            aboutSection.style.backgroundImage = `url('IMG8.jpg')`;
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
        
        // Nuevo efecto para la imagen de "Sobre Mí"
        const aboutImage = aboutSection.querySelector('.about-image');
        
        if (aboutImage) {
            // Usar Intersection Observer para activar la animación cuando la imagen sea visible
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutImage.classList.add('animated');
                        setTimeout(() => {
                            aboutImage.classList.add('parallax');
                        }, 1500);
                        imageObserver.unobserve(entry.target);
                        
                        // Iniciar efecto de paralaje 3D
                        initParallax3D(aboutImage);
                    }
                });
            }, { threshold: 0.2 });
            
            imageObserver.observe(aboutImage);
            
            // Función para inicializar el efecto de paralaje 3D
            function initParallax3D(element) {
                if (window.matchMedia('(hover: hover)').matches) {
                    const img = element.querySelector('img');
                    
                    // Efecto de movimiento suave al mover el ratón
                    element.addEventListener('mousemove', e => {
                        const rect = element.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        // Calcular rotación basada en la posición del ratón - INTENSIFICADO
                        const rotateY = ((x / rect.width) - 0.5) * 25; // Aumentado de 10 a 25 grados
                        const rotateX = ((y / rect.height) - 0.5) * -25; // Aumentado de 10 a 25 grados
                        const translateZ = Math.abs((x / rect.width - 0.5) * (y / rect.height - 0.5)) * 50; // Añadir movimiento en Z
                        
                        element.style.setProperty('--rotateX', rotateX + 'deg');
                        element.style.setProperty('--rotateY', rotateY + 'deg');
                        element.style.setProperty('--translateZ', translateZ + 'px');
                        
                        // Efecto de iluminación basado en la posición del ratón - INTENSIFICADO
                        const centerX = (x / rect.width) * 200 - 100; // -100% a 100%
                        const centerY = (y / rect.height) * 200 - 100; // -100% a 100%
                        
                        // Sombra de luz más intensa que sigue al cursor
                        if (img) {
                            // Aumentar la intensidad de la sombra
                            img.style.boxShadow = `
                                0 20px 40px rgba(0, 0, 0, 0.4),
                                ${centerX * 0.1}px ${centerY * 0.1}px 30px rgba(255, 215, 0, 0.35)
                            `;
                            
                            // Añadir un sutil efecto de iluminación direccional
                            const lightIntensity = Math.max(0.85, 1 - (Math.abs(centerX) + Math.abs(centerY)) / 200);
                            img.style.filter = `sepia(0.15) contrast(1.15) brightness(${lightIntensity})`;
                            
                            // Movimiento adicional para la imagen dentro del contenedor
                            img.style.transform = `
                                translateZ(40px)
                                translateX(${centerX * 0.03}px)
                                translateY(${centerY * 0.03}px)
                            `;
                        }
                    });
                    
                    // Restaurar al estado original cuando el ratón sale
                    element.addEventListener('mouseleave', () => {
                        element.style.setProperty('--rotateX', '0deg');
                        element.style.setProperty('--rotateY', '0deg');
                        element.style.setProperty('--translateZ', '0px');
                        
                        if (img) {
                            img.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
                            img.style.filter = 'sepia(0.2) contrast(1.05)';
                            img.style.transform = 'translateZ(0)';
                        }
                    });
                    
                    // Efecto de transición inicial
                    setTimeout(() => {
                        if (img) {
                            img.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            img.style.transform = 'translateZ(20px)';
                            
                            setTimeout(() => {
                                img.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            }, 800);
                        }
                    }, 1000);
                }
            }
            
            // Efecto de paralaje al hacer scroll - INTENSIFICADO
            window.addEventListener('scroll', debounce(function() {
                if (aboutImage.classList.contains('animated')) {
                    // Calcular la posición relativa de la sección en la ventana
                    const rect = aboutSection.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const scrollFactor = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        const limitedFactor = Math.max(0, Math.min(1, scrollFactor));
                        
                        // Movimiento más dinámico al hacer scroll
                        const img = aboutImage.querySelector('img');
                        if (img) {
                            // Movimiento vertical más pronunciado
                            const verticalMove = limitedFactor * -25; // Aumentado de -15 a -25px
                            
                            // Añadir ligera rotación basada en scroll
                            const scrollRotateX = limitedFactor * 5 - 2.5; // -2.5° a 2.5°
                            const scrollRotateY = (limitedFactor - 0.5) * 10; // -5° a 5°
                            
                            // Aplicar transformaciones combinadas
                            img.style.transform = `
                                translateY(${verticalMove}px) 
                                scale(${1 + limitedFactor * 0.08}) 
                                rotateX(${scrollRotateX}deg) 
                                rotateY(${scrollRotateY}deg)
                            `;
                            
                            // Ajustar sombra según la posición de scroll
                            img.style.boxShadow = `0 ${10 + limitedFactor * 20}px ${20 + limitedFactor * 20}px rgba(0, 0, 0, ${0.2 + limitedFactor * 0.2})`;
                        }
                    }
                }
            }, 10));
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

    // Efecto de movimiento para la imagen en la sección "Sobre Mí"
    const aboutImage = document.querySelector('.about-image img');
    
    if (aboutSection && aboutImage) {
        const maxMovement = 30; // Cantidad máxima de píxeles que se moverá la imagen
        
        window.addEventListener('scroll', function() {
            // Verificar si la sección está visible en la pantalla
            const rect = aboutSection.getBoundingClientRect();
            const isVisible = 
                rect.top < window.innerHeight && 
                rect.bottom > 0;
                
            if (isVisible) {
                // Calcular la posición relativa de la sección en la ventana
                const sectionProgress = 1 - (rect.top / window.innerHeight);
                // Limitar el progreso entre 0 y 1
                const limitedProgress = Math.max(0, Math.min(1, sectionProgress * 1.5));
                
                // Calcular la transformación en X e Y basada en el progreso
                const moveX = maxMovement * (limitedProgress - 0.5) * 0.7;
                const moveY = maxMovement * (limitedProgress - 0.5);
                
                // Aplicar la transformación con animación suave
                aboutImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        // Disparar el evento de scroll inicialmente para establecer la posición
        window.dispatchEvent(new Event('scroll'));
    }
}); 