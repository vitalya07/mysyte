document.addEventListener('DOMContentLoaded', ()=> {
    // Подключение слайдера
    const reviewsSlider = document.querySelector('.reviews__slider');
    if(reviewsSlider) {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
            // Navigation arrows
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev',
            },

        });
    }
    
    // modal-open and close start
    const modal = document.querySelector('.modal');
    const modalOpenBtn = document.querySelectorAll('.open-btn');
    if(modal) {
        function closeModal() {
            modal.classList.remove('modal-open');
            modal.classList.add('modal-hidden');
            document.body.style.overflow = '';
        }

        function showModal() {
            modal.classList.remove('modal-hidden');
            modal.classList.add('modal-open');
            document.body.style.overflow = 'hidden';
        }
        modalOpenBtn.forEach(btn => {
            btn.addEventListener('click', ()=> {
                showModal();
            })
        });
        modal.addEventListener('click', (e)=> {
            if(e.target.classList.contains('modal__close') || e.target === modal) {
                closeModal();
            }
        });
        window.addEventListener('keydown', (e)=> {
            if(e.code === 'Escape' && modal.classList.contains('modal-open')) {
                closeModal();
            }
        });
    }
   
    // modal-open and close end
    // Скользящая шапка начало
    const header = document.querySelector('.header');
    if(header) {
        const hero = document.querySelector('.hero');
        const arrowTop = document.querySelector('.arrow__top');
        let mainOfsetPx = hero.offsetHeight;
        let topFixed = 60;
        window.addEventListener('scroll', ()=> {
            if (window.scrollY <= mainOfsetPx) {
                header.style.cssText = 'top: 0';
                arrowTop.style.cssText = `display: none;`
            }
            if(window.scrollY >= topFixed) {
                header.style.cssText = 'position: fixed; top: -150px;';
            }
            if(window.scrollY >= mainOfsetPx) {
                header.style.cssText = 'position: fixed; top: 0;';
                arrowTop.style.cssText = `display: flex;`
            } 
        });
        // Открытие и закрытие меню начало
        const hamburger = document.querySelector('.hamburger');
        function showAndCloseMenu() {
            header.classList.toggle('menu-open');
        }
        hamburger.addEventListener('click', showAndCloseMenu);
        // Открытие и закрытие меню конец
    }
    // Скользящая шапка конец
    
})