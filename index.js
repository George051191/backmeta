const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(bodyParser.json());

// Обработчик POST-запроса
app.post('/incoming', async (req, res) => {
    const { name, utm, utm_source } = req.body;
   console.log(req.body)
    // Проверка наличия поля name
    if (!name) {
        return res.status(400).json({ message: 'Field "name" is required.' });
    }

    // Создание объекта для отправки
    const data = [{
        name: name, // Здесь вы передаете имя, полученное от клиента
        custom_fields_values: [
            {
                field_id: 2133307,
                values: [
                    {value: utm}
                ]
            },
            {
                field_id: 2133309,
                values: [
                    {value: utm_source }
                ]
            }
        ]
    }]

    try {
        // Настройка заголовков
        const headers = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ3NTczYTI4OTA4NTlkNTMwN2RkODllZTFiNjhjZWZlZjFmMzY5NThhZGFjODMzYTE5OGI4NWE5Y2ZkYjQxMGM0N2ZhNDFjMDJmOTMxNzI4In0.eyJhdWQiOiI0YmFiYzUxOC1mNWM1LTQ2YjAtOWYyZC05Y2JkZjg5NmE1OWMiLCJqdGkiOiJkNzU3M2EyODkwODU5ZDUzMDdkZDg5ZWUxYjY4Y2VmZWYxZjM2OTU4YWRhYzgzM2ExOThiODVhOWNmZGI0MTBjNDdmYTQxYzAyZjkzMTcyOCIsImlhdCI6MTczMTE2MjQ0MywibmJmIjoxNzMxMTYyNDQzLCJleHAiOjE3NzA1MDg4MDAsInN1YiI6IjExNzU0ODYyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyMDU2ODM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZmFmZGU2ZDctYjZhMC00YTU2LTg2MjQtMTgzZmVlMWM1YWY0IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.mr5p8jt7x_sM3h7h6JrRSOEkv54yij7so7yWaL-yHWVE-hid3k0AwiuT0rBmrrr2t3_VSQ1KVaV7l3MtN7TCdSIVVLA98ozl1gpgUAAAvsDeVuxcer--GvQ1eDjR-a-zjqIgoHJFbMPpvZzyiXAC9CKkZzNv2TjIEjTA5frZde_a4PWTZzs22aVcWl9CLVFVrOnCQzUMSJ3ZyQQ-uxbOUPoL3e86MQyHMcXU2mvj1ijyX1hcenCiXNYMqOCGEyyDJvfLp43T3p9QfiQp6j4_5hm-TIZXTvm2ftPweY7vgR5s4PlPkzzBqB8LdBh9ng_GWoaXIcViG8-BN5j9m5NyqQ'
        };

        // Отправка данных на API AmoCRM
        const response = await axios.post('https://trubachevg.amocrm.ru/api/v4/leads', data, { headers });

        // Возврат успешного ответа
        res.status(response.status).json(response.data);
    } catch (error) {
        // Обработка ошибок
        
        res.status(error.response ? error.response.status : 500).json({ message: 'Failed to send data.' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});