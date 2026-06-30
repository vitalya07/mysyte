document.addEventListener('DOMContentLoaded', ()=> {
    // Подключение слайдера
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
    // modal-open and close start
    const modal = document.querySelector('.modal');
    const modalOpenBtn = document.querySelectorAll('.open-btn');

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
    // modal-open and close end
    // Скользящая шапка начало
    const header = document.querySelector('.header');
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
    })
    // Скользящая шапка конец
    // Отправка формы начало
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        bindPostData(form);
    });

    const message = {
        loading: 'assets/icons/spinner.svg',
        succes: 'Данные успешно отправлены',
        error: 'Ошибка при отправке сообщения'
    };

    const postData = async (url, data) => {
        const res = await fetch (url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', ()=> {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                width: 20px;
                height: 20px;
            `;

            form.append(statusMessage);
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            postData('mail.php', JSON.stringify(object))
            .then(() => {
                showThanksModal(message.succes);
                statusMessage.remove()
            })
            .catch(() => {
                showThanksModal(message.error);
            })
            .finally(()=> {
                form.resset()
            })
        })
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__box');

        prevModalDialog.classList.add('.modalhidden');
        showModa();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__head');
        thanksModal.innerHTML = `
            <div class="modal__box">
                <div class="modal__head">
                    <h2 class="modal__title">${message}</h2>
                    <div class="modal__close"></div>
                </div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.add('modal-open');
            prevModalDialog.classList.remove('modal-hidden');
            closeModal();
        }, 2000)
    }
    //Отправка формы конец
    // Открытие и закрытие меню начало
    const hamburger = document.querySelector('.hamburger');
    function showAndCloseMenu() {
        header.classList.toggle('menu-open');
    }
    hamburger.addEventListener('click', showAndCloseMenu)
})