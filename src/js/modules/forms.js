import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
         
          checkNumInputs('input[name="user_phone"]');
        // Ввод только цифр в input с номером телефона Import
         
        
    // message
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    // отправка сообщения
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };
    // Clear inputs
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };
    // Обработчик событий
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // Блок с сообщением
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
            // Собираем данные
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            // Отправляем данные
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })

                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 9000);
                    
                });


        });
    });

};

export default forms;