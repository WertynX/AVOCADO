let users = {}; // Список пользователей (username > password)
let currentUser = null; // Текущий пользователь
document.getElementById("login").style.display = "none"; // Чтобы не было сразу входа и регистрации

const tests = {
    1: [
        { question: "Скільки буде 2 + 2?", answers: ["3", "4", "5"], correct: 1 },
        { question: "Скільки буде 5 * 3?", answers: ["15", "10", "25"], correct: 0 },
        { question: "Чому дорівнює квадратний корінь з 16?", answers: ["2", "4", "8"], correct: 1 },
        { question: "Скільки буде 10 / 2?", answers: ["4", "5", "6"], correct: 1 },
        { question: "Чому дорівнює 9 * 9?", answers: ["81", "99", "72"], correct: 0 },
        { question: "Скільки буде 100 - 57?", answers: ["33", "43", "53"], correct: 1 },
        { question: "Чому дорівнює периметр квадрата зі стороною 5?", answers: ["15", "20", "25"], correct: 1 },
        { question: "Скільки градусів в прямому куті?", answers: ["90", "180", "360"], correct: 0 },
        { question: "Чому дорівнює 7 * 6?", answers: ["42", "36", "48"], correct: 0 },
        { question: "Чому дорівнює 8^2?", answers: ["16", "32", "64"], correct: 2 }
    ],
    2: [
        { question: "Швидкість світла?", answers: ["300 000 км/с", "150 000 км/с", "1 000 000 км/с"], correct: 0 },
        { question: "Одиниця вимірювання сили?", answers: ["Ньютон", "Джоуль", "Ватт"], correct: 0 },
        { question: "Що вимірюється в паскалях?", answers: ["Тиск", "Потужність", "Енергія"], correct: 0 },
        { question: "Чому дорівнює гравітаційна стала?", answers: ["6.67×10⁻¹¹", "9.8", "3×10⁸"], correct: 0 },
        { question: "Хто сформулював три закони руху?", answers: ["Ньютон", "Галілей", "Ейнштейн"], correct: 0 },
        { question: "Що таке маса?", answers: ["Сила", "Кількість речовини", "Енергія"], correct: 1 },
        { question: "Як позначається електричну напругу?", answers: ["V", "I", "P"], correct: 0 },
        { question: "Яка планета наймасивніша?", answers: ["Юпітер", "Сатурн", "Земля"], correct: 0 },
        { question: "Який агрегатний перехід називають випаровуванням?", answers: ["Рідина -> Газ", "Газ -> Твердий", "Рідина -> Твердий"], correct: 0 },
        { question: "Хто відкрив закон електромагнітної індукції?", answers: ["Фарадей", "Кулон", "Ом"], correct: 0 }
    ],
    3: [
        { question: "Що таке H2O?", answers: ["Вода", "Кислота", "Газ"], correct: 0 },
        { question: "Кислота в лимонах?", answers: ["Оцтова", "Лимонна", "Соляна"], correct: 1 },
        { question: "Що вимірюється в молях?", answers: ["Маса", "Кількість речовини", "Об'єм"], correct: 1 },
        { question: "Який газ переважає в повітрі?", answers: ["Кисень", "Азот", "Вуглекислий газ"], correct: 1 },
        { question: "Символ хімічного елемента вуглецю?", answers: ["C", "Ca", "Co"], correct: 0 },
        { question: "Хто розробив таблицю хімічних елементів?", answers: ["Менделєєв", "Кюрі", "Лавуазьє"], correct: 0 },
        { question: "Яка формула сірчаної кислоти?", answers: ["HCl", "H2SO4", "H2O"], correct: 1 },
        { question: "Який метал найлегший?", answers: ["Літій", "Магній", "Алюміній"], correct: 0 },
        { question: "Який газ є благородним?", answers: ["Гелій", "Кисень", "Метан"], correct: 0 },
        { question: "Який елемент позначається як Na?", answers: ["Натрій", "Нікель", "Неон"], correct: 0 }
    ],
    4: [
        { question: "Хто був першою людиною в космосі?", answers: ["Юрій Гагарін", "Ніл Армстронг", "Алан Шепард"], correct: 0 },
        { question: "У якому році завершилася Друга світова війна?", answers: ["1941", "1945", "1950"], correct: 1 },
        { question: "Яке місто називають 'містом світла'?", answers: ["Париж", "Лондон", "Нью-Йорк"], correct: 0 },
        { question: "Хто винайшов телефон?", answers: ["Александр Белл", "Томас Едісон", "Нікола Тесла"], correct: 0 },
        { question: "Хто написав 'Походження видів'?", answers: ["Чарльз Дарвін", "Грегор Мендель", "Луї Пастер"], correct: 0 },
        { question: "Хто був першим президентом США?", answers: ["Джордж Вашингтон", "Авраам Лінкольн", "Томас Джефферсон"], correct: 0 },
        { question: "Яку подію називають 'великою депресією'?", answers: ["Економічна криза 1929 року", "Друга світова війна", "Громадянська війна в США"], correct: 0 },
        { question: "Коли була підписана Декларація незалежності США?", answers: ["1776", "1789", "1812"], correct: 0 },
        { question: "Хто відомий як 'залізна леді'?", answers: ["Маргарет Тетчер", "Індіра Ганді", "Елеонора Рузвельт"], correct: 0 },
        { question: "Як називався корабель, на якому Колумб відкрив Америку?", answers: ["Санта-Марія", "Вікторія", "Індевор"], correct: 0 }
    ],
    5: [
        { question: "Хто написав 'Війну і мир'?", answers: ["Достоєвський", "Толстой", "Пушкін"], correct: 1 },
        { question: "Хто написав 'Євгенія Онєгіна'?", answers: ["Гоголь", "Пушкін", "Толстой"], correct: 1 },
        { question: "Хто є автором 'Мертвих душ'?", answers: ["Гоголь", "Толстой", "Чехов"], correct: 0 },
        { question: "Яка п'єса належить Шекспіру?", answers: ["Гамлет", "Ревізор", "Брати Карамазови"], correct: 0 },
        { question: "Хто написав 'Горе від розуму'?", answers: ["Грибоєдов", "Гоголь", "Лермонтов"], correct: 0 },
        { question: "Автор роману 'Обломов'?", answers: ["Гончаров", "Достоєвський", "Толстой"], correct: 0 },
        { question: "Хто написав 'Чайку'?", answers: ["Чехов", "Гоголь", "Толстой"], correct: 0 },
        { question: "Хто автор 'Злочину і покарання'?", answers: ["Толстой", "Достоєвський", "Гоголь"], correct: 1 },
        { question: "Хто написав 'Анну Кареніну'?", answers: ["Достоєвський", "Толстой", "Гоголь"], correct: 1 },
        { question: "Автор поеми 'Руслан і Людмила'?", answers: ["Пушкін", "Толстой", "Лермонтов"], correct: 0 }
    ],
    6: [ 
        { question: "Що є основною одиницею життя?", answers: ["Клітина", "Орган", "Тканина"], correct: 0 },
        { question: "Який орган відповідає за фільтрацію крові?", answers: ["Нирки", "Печінка", "Серце"], correct: 0 },
        { question: "Який процес називають фотосинтезом?", answers: ["Перетворення світла в енергію", "Розпад органіки", "Поділ клітин"], correct: 0 },
        { question: "Як називається наука про тварин?", answers: ["Зоологія", "Ботаніка", "Генетика"], correct: 0 },
        { question: "Який генетичний матеріал є у всіх живих організмах?", answers: ["ДНК", "РНК", "Протеїн"], correct: 0 },
        { question: "Як називаються організми, які не можуть виробляти власну їжу?", answers: ["Гетеротрофи", "Автотрофи", "Сапрофіти"], correct: 0 },
        { question: "Який орган є найбільшим у людському тілі?", answers: ["Шкіра", "Печінка", "Мозок"], correct: 0 },
        { question: "Що вивчає генетика?", answers: ["Спадковість", "Розмноження", "Еволюцію"], correct: 0 },
        { question: "Який організм є одноклітинним?", answers: ["Бактерія", "Риба", "Гриб"], correct: 0 },
        { question: "Який газ виробляється рослинами під час фотосинтезу?", answers: ["Кисень", "Вуглекислий газ", "Азот"], correct: 0 }
    ],
    7: [ 
        { question: "Яка найбільша країна світу за площею?", answers: ["Росія", "Канада", "Китай"], correct: 0 },
        { question: "Який океан є найбільшим?", answers: ["Тихий", "Атлантичний", "Індійський"], correct: 0 },
        { question: "Яка найвища гора світу?", answers: ["Еверест", "Кіліманджаро", "Мак-Кінлі"], correct: 0 },
        { question: "Яке місто є столицею Австралії?", answers: ["Канберра", "Сідней", "Мельбурн"], correct: 0 },
        { question: "Яка річка найдовша в світі?", answers: ["Ніл", "Амазонка", "Міссісіпі"], correct: 0 },
        { question: "Яке озеро є найглибшим у світі?", answers: ["Байкал", "Танганьїка", "Вікторія"], correct: 0 },
        { question: "Скільки материків на планеті Земля?", answers: ["7", "5", "6"], correct: 0 },
        { question: "Яка пустеля є найбільшою?", answers: ["Сахара", "Гобі", "Калахарі"], correct: 0 },
        { question: "Який клімат переважає в Арктиці?", answers: ["Холодний", "Тропічний", "Сухий"], correct: 0 },
        { question: "Яка країна має найбільше населення?", answers: ["Китай", "Індія", "США"], correct: 0 }
    ],
    8: [ 
        { question: "Як перекладається слово 'apple'?", answers: ["Яблуко", "Апельсин", "Груша"], correct: 0 },
        { question: "Яке правильне множинне число слова 'child'?", answers: ["Children", "Childs", "Childes"], correct: 0 },
        { question: "Який артикль використовується з одниною, коли слово починається з голосної?", answers: ["An", "A", "The"], correct: 0 },
        { question: "Як перекладається слово 'blue'?", answers: ["Синій", "Червоний", "Зелений"], correct: 0 },
        { question: "Який переклад речення: 'I have a dog'?", answers: ["У мене є собака", "Я бачив собаку", "Мені подобається собака"], correct: 0 },
        { question: "Що означає слово 'run'?", answers: ["Бігти", "Ходити", "Стрибати"], correct: 0 },
        { question: "Який час в реченні: 'He is reading a book'?", answers: ["Present Continuous", "Past Simple", "Future Simple"], correct: 0 },
        { question: "Яке слово є антонімом до 'big'?", answers: ["Small", "Large", "Long"], correct: 0 },
        { question: "Як правильно сказати 'велика машина' англійською?", answers: ["Big car", "Large machine", "Heavy truck"], correct: 0 },
        { question: "Який переклад слова 'teacher'?", answers: ["Вчитель", "Учень", "Директор"], correct: 0 }
    ],
    9: [
        { question: "Яка з цих страв традиційно подається на новорічному святі?", answers: ["Щі", "Олів'є", "Голубці"], correct: 1 },
        { question: "Який колір традиційно асоціюється з новорічними святами в Україні?", answers: ["Жовтий", "Зелений", "Червоний"], correct: 1 },
        { question: "Яке свято святкується 31 грудня?", answers: ["Великдень", "Різдво", "Новий рік"], correct: 2 },
        { question: "Яка пісня часто асоціюється з новорічними святами?", answers: ["Весела зима", "Нова рік", "В лесу родилась елочка"], correct: 2 },
        { question: "У якому місяці святкується Новий рік?", answers: ["Лютий", "Грудень", "Січень"], correct: 1 },
        { question: "Який символ є одним з основних на новорічних святах?", answers: ["Кролик", "Дід Мороз", "Дідусь Санта"], correct: 1 },
        { question: "Яка тварина часто зображена на новорічних листівках?", answers: ["Лисиця", "Ведмідь", "Олень"], correct: 2 },
        { question: "Яке дерево зазвичай прикрашають до новорічних свят?", answers: ["Береза", "Клен", "Ялинка"], correct: 2 },
        { question: "Хто приносить подарунки в ніч на Новий рік в Україні?", answers: ["Фея зими", "Дід Мороз", "Санта Клаус"], correct: 1 },
        { question: "Який символ Нового року в Україні?", answers: ["Ялинка", "Гарбуза", "Олень"], correct: 0 }
    ],
    10: [
        { question: "Як називається традиційний костюм на Хелловін?", answers: ["Цукерка", "Привид", "Відьма"], correct: 2 },
        { question: "Яка фраза зазвичай говориться на Хелловін при просінні цукерок?", answers: ["Сила до нового року", "Пожертвуй або бійся", "Солодощі або смерть"], correct: 2 },
        { question: "Яким символом часто прикрашають будинки на Хелловін?", answers: ["Ялина", "Зірка", "Гарбуз"], correct: 2 },
        { question: "Яка істота асоціюється з Хелловіном?", answers: ["Мумія", "Оборотень", "Відьма"], correct: 2 },
        { question: "Які кольори традиційно використовуються на Хелловін?", answers: ["Чорний і оранжевий", "Синій і жовтий", "Червоний і білий"], correct: 0 },
        { question: "В якому місяці святкується Хелловін?", answers: ["Листопад", "Жовтень", "Вересень"], correct: 1 },
        { question: "Який вигляд має традиційний Хелловінський гарбуз?", answers: ["Виглядає як скелет", "З вирізаними очима і ротом", "Тим, що запалюється зсередини"], correct: 1 },
        { question: "Який фрукт символізує Хелловін?", answers: ["Гарбуз", "Банан", "Яблуко"], correct: 2 },
        { question: "Хто був засновником традиції святкувати Хелловін?", answers: ["Древні римляни", "Древні греки", "Древні кельти"], correct: 2 },
        { question: "Який звичайний метод святкування Хелловіну?", answers: ["Спільні молитви", "Костюмовані вечірки", "Складання піраміди"], correct: 1 }
    ],
    11: [
        { question: "Яка команда є однією з основних у CS:GO 2?", answers: ["Special Forces", "Terrorists", "Counter-Terrorists"], correct: 1 },
        { question: "Який режим гри є найбільш популярним у CS:GO 2?", answers: ["Натискання на кнопку", "Перехоплення прапора", "Знищення бомби"], correct: 2 },
        { question: "Яку зброю можна знайти в CS:GO 2?", answers: ["Desert Eagle", "AK-47", "MP5"], correct: 1 },
        { question: "Яка карта є однією з класичних карт в CS:GO 2?", answers: ["Inferno", "Mirage", "Dust 2"], correct: 2 },
        { question: "Що таке 'eco round' в CS:GO 2?", answers: ["Режим битви на ножах", "Раунд з обмеженими ресурсами", "Турнірний режим"], correct: 1 },
        { question: "Яка стратегія найбільш популярна для команд у CS:GO 2?", answers: ["Тимчасові альянси", "Індивідуальні рейди", "Планування атак"], correct: 2 },
        { question: "Який відомий скілець у CS:GO 2 має спеціалізацію на прицілюванні?", answers: ["AWP", "Deagle", "M4A4"], correct: 0 },
        { question: "Що робить 'smoke grenade' в CS:GO 2?", answers: ["Вибухає при контакті з ворогом", "Освітлює темні зони", "Створює димову завісу"], correct: 2 },
        { question: "Яка з цих мап є найбільш популярною на турнірах CS:GO 2?", answers: ["Cache", "Nuke", "Dust 2"], correct: 2 },
        { question: "Яка зброя є найбільш потужною в CS:GO 2?", answers: ["AK-47", "M4A1-S", "AWP"], correct: 0 }
    ],
    12: [
        { question: "Яка роль в Dota 2 відповідає за підтримку командних зусиль?", answers: ["Offlaner", "Carry", "Support"], correct: 2 },
        { question: "Який об'єкт на карті Dota 2 дозволяє переносити героїв через воду?", answers: ["Creep Wave", "Raft", "Boat"], correct: 2 },
        { question: "Хто з цих героїв є одним з найпопулярніших у Dota 2?", answers: ["Pudge", "Lion", "Invoker"], correct: 2 },
        { question: "Яка команда є суперниками в Dota 2 на міжнародних турнірах?", answers: ["Neutral", "Dire", "Radiant"], correct: 1 },
        { question: "Який з цих артефактів дає бонус до швидкості атаки?", answers: ["Abyssal Blade", "Monkey King Bar", "Manta Style"], correct: 1 },
        { question: "Яка героїня має здібність 'Laguna Blade'?", answers: ["Crystal Maiden", "Storm Spirit", "Lina"], correct: 2 },
        { question: "Яка максимальна кількість героїв у Dota 2?", answers: ["120", "100", "80"], correct: 0 },
        { question: "Які з цих героїв належать до категорії 'Carry'?", answers: ["Crystal Maiden", "Anti-Mage", "Shadow Shaman"], correct: 1 },
        { question: "Яка артефакт в Dota 2 дозволяє герою відновлювати ману?", answers: ["Manta Style", "Arcane Boots", "Butterfly"], correct: 1 },
        { question: "Яка героїня є майстринею блискавок у Dota 2?", answers: ["Lina", "Zeus", "Pugna"], correct: 1 }
    ]
};


document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const messageElement = document.getElementById("register-message");

    messageElement.textContent = "";

    if (password !== confirmPassword) {
        messageElement.textContent = "Паролі не співпадають!";
        showNotification("Паролі не співпадають!");
        return;
    }

    if (username.length > 18) {  // Чтобы нельзя было вести больше 18 символов в нике
        messageElement.textContent = "Ім'я користувача не може бути довшим за 18 символів!";
        showNotification("Ім'я користувача не може бути довшим за 18 символів!");
        return;
    }

    if (users[username]) {
        messageElement.textContent = "Користувач вже існує!";
        showNotification("Користувач вже існує!");
        return;
    }

    users[username] = {
        password: password,
        premium: false // Статус premium по умолчанию
    };
    messageElement.textContent = "Реєстрація успішна! Увійдіть у систему.";
    showNotification("Реєстрація успішна! Увійдіть у систему.");
    toggleForms();
});

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const messageElement = document.getElementById("login-message");

    messageElement.textContent = "";

    if (!users[username]) {
        messageElement.textContent = "Користувача не знайдено!";
        showNotification("Користувача не знайдено!");
        return;
    }

    if (users[username].password !== password) {
        messageElement.textContent = "Неправильний пароль!";
        showNotification("Неправильний пароль!");
        return;
    }

    currentUser = username;

    // Проверка на Premium
    if (users[currentUser].premium) {
        showNotification("Ви увійшли як Premium користувач!");
    }

    updateUserPanel();
    showHome();
});


function updateUserPanel() {
    const userPanel = document.getElementById("user-panel");
    const currentUserElement = document.getElementById("current-user");
    const welcomeMessage = document.getElementById("welcome-message");

    if (currentUser) {
        userPanel.style.display = "block";
        currentUserElement.textContent = `Ви увійшли як: ${currentUser}`;
        showNotification(`Ви увійшли як: ${currentUser}`);
        document.getElementById("tipo-test").style.display = "none";
        document.getElementById("login-register-button").style.display = "none";
        welcomeMessage.textContent = `Привіт, ${currentUser}! Оберіть тест:`;

        // Проверка есть ли пользователь и его статус премиум
        if (users[currentUser]?.premium) {
            document.getElementById("Premium").style.display = "block";
        } else {
            document.getElementById("Premium").style.display = "none";
        }
    } else {
        userPanel.style.display = "none";
        welcomeMessage.textContent = "";
        document.getElementById("Premium").style.display = "none"; // Скрытие Premium если пользователь не авторизован
    }
}


function logout() {
    currentUser = null;
    updateUserPanel();
    showNotification("Ви успішно вийшли з аккаунту.");
    document.getElementById("tipo-test").style.display = "block";
    document.getElementById("login-register-button").style.display = "block";
    showHome();
}

function changeAccount() {
    showEntrance();
}

function startTest(testId) {
    if (!currentUser) {
        showNotification("Будь ласка, увійдіть у систему, щоб пройти тест.");
        return;
    }

    const test = tests[testId];

    if (testId > 8 && (!users[currentUser] || !users[currentUser].premium)) {
        showNotification("Цей тест доступний лише для Premium користувачів.");
        return;
    }

    currentTest = test;
    currentQuestionIndex = 0;
    correctAnswers = 0;

    document.getElementById("main-menu").style.display = "none";
    document.getElementById("test-container").style.display = "block";

    showQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentTest.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showQuestion() {
    const questionData = currentTest[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => {
            if (index === questionData.correct) correctAnswers++;
            nextQuestion();
        };
        answersContainer.appendChild(button);
    });
}

function showResults() {
    const totalQuestions = currentTest.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "block";

    document.getElementById("score").textContent = `Ви відповіли правильно на ${correctAnswers} з ${totalQuestions} питань (${percentage}%).`;
}

function showHome() {
    document.getElementById("giftik").style.display = "none";
    document.getElementById("main-news").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("Entrance").style.display = "none";
    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("newsN1").style.display = "none";
    document.getElementById("newsN2").style.display = "none";
}

function showAbout() {
    document.getElementById("giftik").style.display = "none";
    document.getElementById("main-news").style.display = "none";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("about").style.display = "block";
    document.getElementById("Entrance").style.display = "none";
    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("newsN1").style.display = "none";
    document.getElementById("newsN2").style.display = "none";
}

function showEntrance() {
    document.getElementById("giftik").style.display = "none";
    document.getElementById("main-news").style.display = "none";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("Entrance").style.display = "block";
    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("newsN1").style.display = "none";
    document.getElementById("newsN2").style.display = "none";
}

function returnToMenu() {
    document.getElementById("results").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
}

function startNews1() {
    document.getElementById("main-news").style.display = "none";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("Entrance").style.display = "none";
    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("newsN1").style.display = "block";
    document.getElementById("newsN2").style.display = "none";
}

function showNews() {
    document.getElementById("giftik").style.display = "none";
    document.getElementById("main-news").style.display = "block";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("Entrance").style.display = "none";
    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("newsN1").style.display = "none";
    document.getElementById("newsN2").style.display = "none";
}

function startNews2() {
    document.getElementById("main-news").style.display = "none";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("Entrance").style.display = "none";
    document.getElementById("test-container").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("newsN1").style.display = "none";
    document.getElementById("newsN2").style.display = "block";
}

function startGift() {
    if (currentUser && users[currentUser]) {  // Проверка на существование пользователя
        users[currentUser].premium = true; // Изменяем статус на Premium
        showNotification("Ви стали Premium користувачем!");
        document.getElementById("gift-b").style.display = "none";
        document.getElementById("giftik").style.display = "block";
        document.getElementById("main-news").style.display = "none";
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("about").style.display = "none";
        document.getElementById("Entrance").style.display = "none";
        document.getElementById("test-container").style.display = "none";
        document.getElementById("results").style.display = "none";
        document.getElementById("newsN1").style.display = "none";
        document.getElementById("newsN2").style.display = "block";
        updateUserPanel();
    } else {
        showNotification("Ви не увійшли в систему!");
    }
}


function toggleForms() {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    if (registerForm.style.display === "none") {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        document.getElementById("form-title").style.display = "block";
        document.getElementById("login").style.display = "none";
    } else {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        document.getElementById("form-title").style.display = "none";
        document.getElementById("login").style.display = "block";
    }

    document.getElementById("register-message").textContent = "";
    document.getElementById("login-message").textContent = "";
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    notification.style.opacity = "1";

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.style.display = "none";
        }, 500);
    }, 2000);
}

