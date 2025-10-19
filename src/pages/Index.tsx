import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Question = {
  question: string;
  options: { label: string; text: string }[];
  correct: string;
};

type Round = {
  title: string;
  questions: Question[];
};

const QUIZ_DATA: Round[] = [
  {
    title: "Общее про игры",
    questions: [
      {
        question: "Как называется игра, в которой нужно собирать блоки и строить башни?",
        options: [
          { label: "A", text: "Тетрис" },
          { label: "B", text: "Майнкрафт" },
          { label: "C", text: "Супер Марио" },
          { label: "D", text: "Фортнайт" }
        ],
        correct: "B"
      },
      {
        question: "Какая игра учит управлять животными на ферме?",
        options: [
          { label: "A", text: "Ферма Мечты" },
          { label: "B", text: "Ферма Сим" },
          { label: "C", text: "Симс" },
          { label: "D", text: "Курочки-Рябы" }
        ],
        correct: "B"
      },
      {
        question: "В какой игре герой собирает кольца и спешит к выходу?",
        options: [
          { label: "A", text: "Соник" },
          { label: "B", text: "Марио" },
          { label: "C", text: "Пакмен" },
          { label: "D", text: "Лего Ниндзя Го" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре можно строить замки из кубиков?",
        options: [
          { label: "A", text: "Лего" },
          { label: "B", text: "Майнкрафт" },
          { label: "C", text: "Симс" },
          { label: "D", text: "Дарк Соулс" }
        ],
        correct: "B"
      },
      {
        question: "Какая игра про путешествия по вселенной и сбор ракет?",
        options: [
          { label: "A", text: "Космос Марк" },
          { label: "B", text: "Астерикс" },
          { label: "C", text: "Космическая Одиссея" },
          { label: "D", text: "Патрульный корабль" }
        ],
        correct: "C"
      },
      {
        question: "Что такое онлайн-игра?",
        options: [
          { label: "A", text: "Игра без интернета" },
          { label: "B", text: "Игра, в которую можно играть через интернет" },
          { label: "C", text: "Игрушка-плюшка" },
          { label: "D", text: "Карта памяти" }
        ],
        correct: "B"
      },
      {
        question: "Как называется игру, где герой прыгает по плавающим платформам?",
        options: [
          { label: "A", text: "Марио Платформер" },
          { label: "B", text: "Футбол на улице" },
          { label: "C", text: "Смотрящий кот" },
          { label: "D", text: "Шахматы" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре игрок может заниматься рыбалкой и готовить блюда?",
        options: [
          { label: "A", text: "Рыбак и котята" },
          { label: "B", text: "Фермер Джон" },
          { label: "C", text: "Рыбалка и пироги" },
          { label: "D", text: "Виртуальная кухня" }
        ],
        correct: "B"
      },
      {
        question: "Что общего у игр \"платформеры\"?",
        options: [
          { label: "A", text: "Нужно прыгать между уровнями" },
          { label: "B", text: "Нужно только стрелять" },
          { label: "C", text: "Нужна скорость чтения" },
          { label: "D", text: "Нужна музыкальная школа" }
        ],
        correct: "A"
      },
      {
        question: "Какая игра чаще всего требует внимательности и быстрой реакции?",
        options: [
          { label: "A", text: "Пазлы" },
          { label: "B", text: "Письмо" },
          { label: "C", text: "Шахматы онлайн" },
          { label: "D", text: "Все вышеперечисленное" }
        ],
        correct: "A"
      }
    ]
  },
  {
    title: "Животные и природа в играх",
    questions: [
      {
        question: "В какой игре можно ухаживать за виртуальным котом по имени Манго?",
        options: [
          { label: "A", text: "Нянечка" },
          { label: "B", text: "Няша-игра" },
          { label: "C", text: "Neko Atsume" },
          { label: "D", text: "Котики и пироги" }
        ],
        correct: "C"
      },
      {
        question: "Какую игру часто используют для обучения заботе о питомцах?",
        options: [
          { label: "A", text: "Симс" },
          { label: "B", text: "Хранители леса" },
          { label: "C", text: "Питомцы Вудленд" },
          { label: "D", text: "Лего город" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре встречаются милые существа по имени этофаны?",
        options: [
          { label: "A", text: "Солитер" },
          { label: "B", text: "Фермеры и зверята" },
          { label: "C", text: "Пастушки и звери" },
          { label: "D", text: "Майнкрафт" }
        ],
        correct: "B"
      },
      {
        question: "Как называется игра, где можно выращивать цветы и деревья?",
        options: [
          { label: "A", text: "Цветочный сад" },
          { label: "B", text: "Садоводство сим" },
          { label: "C", text: "Фермерская история" },
          { label: "D", text: "Мир природы" }
        ],
        correct: "B"
      },
      {
        question: "В какой игре главный персонаж спасает лес от злого дерева?",
        options: [
          { label: "A", text: "Ультра Лесной рыцарь" },
          { label: "B", text: "Тролль и лес" },
          { label: "C", text: "Лесная защита" },
          { label: "D", text: "Потребность в деревьях" }
        ],
        correct: "C"
      },
      {
        question: "Где можно наблюдать за смешными животными на ферме?",
        options: [
          { label: "A", text: "Ниндзя ферма" },
          { label: "B", text: "Фермер и звери" },
          { label: "C", text: "Животные онлайн" },
          { label: "D", text: "Питомцы и ферма" }
        ],
        correct: "B"
      },
      {
        question: "Какая игра учит заботиться о растениях в саду?",
        options: [
          { label: "A", text: "Цветочный сад" },
          { label: "B", text: "Растения онлайн" },
          { label: "C", text: "Вегетакрафт" },
          { label: "D", text: "Огородники" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре герой превращается в пингвина?",
        options: [
          { label: "A", text: "Пингвин и снежок" },
          { label: "B", text: "Антарктида" },
          { label: "C", text: "Микс зверей" },
          { label: "D", text: "Герой-пингвин" }
        ],
        correct: "A"
      },
      {
        question: "Что нельзя делать в игре про природу?",
        options: [
          { label: "A", text: "Поливать цветы" },
          { label: "B", text: "Ездить на верблюде" },
          { label: "C", text: "Лазать по деревьям" },
          { label: "D", text: "Летать на орле" }
        ],
        correct: "B"
      },
      {
        question: "Какой жанр игр учит бережному отношению к природе?",
        options: [
          { label: "A", text: "Пазлы" },
          { label: "B", text: "Симуляторы жизни" },
          { label: "C", text: "РПГ" },
          { label: "D", text: "Шутеры" }
        ],
        correct: "B"
      }
    ]
  },
  {
    title: "Спорт и движение",
    questions: [
      {
        question: "В какой игре можно играть в футбол?",
        options: [
          { label: "A", text: "ФутБолита" },
          { label: "B", text: "Футбол Магия" },
          { label: "C", text: "Футбол Мания" },
          { label: "D", text: "Футболная лига" }
        ],
        correct: "B"
      },
      {
        question: "Что нужно сделать в игре «бадминтон»?",
        options: [
          { label: "A", text: "Бить мяч по воздуху через сетку" },
          { label: "B", text: "Ехать на велосипеде" },
          { label: "C", text: "Плавать" },
          { label: "D", text: "Готовить еду" }
        ],
        correct: "A"
      },
      {
        question: "Какая игра посвящена боулингу?",
        options: [
          { label: "A", text: "Шарики и удача" },
          { label: "B", text: "Боулинг-онлайн" },
          { label: "C", text: "Шарики на столе" },
          { label: "D", text: "Шарики и корги" }
        ],
        correct: "B"
      },
      {
        question: "В какой игре есть гонки на велосипедах?",
        options: [
          { label: "A", text: "Велогонки" },
          { label: "B", text: "Мото-приключения" },
          { label: "C", text: "Гонки на велосипедах" },
          { label: "D", text: "Суперспорт" }
        ],
        correct: "C"
      },
      {
        question: "Как называется игра, где дети соревнуются в беге на дистанцию?",
        options: [
          { label: "A", text: "Спринт-детство" },
          { label: "B", text: "Быстрый шаг" },
          { label: "C", text: "Забегайте" },
          { label: "D", text: "Бегунок" }
        ],
        correct: "B"
      },
      {
        question: "В какой игре нужно ловить мяч и подавать его сопернику?",
        options: [
          { label: "A", text: "Баскетбол" },
          { label: "B", text: "Пинг-понг" },
          { label: "C", text: "Волейбол" },
          { label: "D", text: "Гандбол" }
        ],
        correct: "C"
      },
      {
        question: "В какой игре можно строить паркур-улицы и прыгать через препятствия?",
        options: [
          { label: "A", text: "Паркур-мир" },
          { label: "B", text: "Биорд" },
          { label: "C", text: "Ниндзя-улица" },
          { label: "D", text: "Вылет" }
        ],
        correct: "A"
      },
      {
        question: "Что обычно требуется для игры в хоккей на льду?",
        options: [
          { label: "A", text: "Шапка и перчатки" },
          { label: "B", text: "Лыжи" },
          { label: "C", text: "Ракетки" },
          { label: "D", text: "Крылья" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре можно кататься на коньках и делать фигуры?",
        options: [
          { label: "A", text: "Коньки и балет" },
          { label: "B", text: "Фигуры на льду" },
          { label: "C", text: "Каток-квест" },
          { label: "D", text: "Ледяной цирк" }
        ],
        correct: "B"
      },
      {
        question: "Какой жанр игр чаще всего связан со спортом?",
        options: [
          { label: "A", text: "РПГ" },
          { label: "B", text: "Шутеры" },
          { label: "C", text: "Спортивные симуляторы" },
          { label: "D", text: "Пазлы" }
        ],
        correct: "C"
      }
    ]
  },
  {
    title: "Приключения и тайны",
    questions: [
      {
        question: "Как называется игра, где герой отправляется в задний двор, чтобы найти спрятанные сокровища?",
        options: [
          { label: "A", text: "Сокровища двора" },
          { label: "B", text: "Приключения дома" },
          { label: "C", text: "Тайны двора" },
          { label: "D", text: "Поиск сокровищ" }
        ],
        correct: "D"
      },
      {
        question: "В какой игре главный герой ищет потерянные ключи из cupboards?",
        options: [
          { label: "A", text: "Ключи и замки" },
          { label: "B", text: "Хранители дверей" },
          { label: "C", text: "Приключение в доме" },
          { label: "D", text: "Тайны шкафа" }
        ],
        correct: "A"
      },
      {
        question: "Какая игра учит ловкости и внимательности, когда нужно проходить лабиринты?",
        options: [
          { label: "A", text: "Лабиринты и тайны" },
          { label: "B", text: "Пазлы в пути" },
          { label: "C", text: "Квесты в коридоре" },
          { label: "D", text: "Следопыт" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре герой спасает королевство от злого волшебника?",
        options: [
          { label: "A", text: "Замок волшебства" },
          { label: "B", text: "Королевство героев" },
          { label: "C", text: "Волшебные приключения" },
          { label: "D", text: "Спасение короны" }
        ],
        correct: "C"
      },
      {
        question: "Что такое «квест» в играх?",
        options: [
          { label: "A", text: "Неправильный путь" },
          { label: "B", text: "Выполнение задачи или серии задач" },
          { label: "C", text: "Игрушка" },
          { label: "D", text: "Хитрый враг" }
        ],
        correct: "B"
      },
      {
        question: "Какая игра чаще всех происходит в джунглях?",
        options: [
          { label: "A", text: "Джунгли зовут" },
          { label: "B", text: "Вечно зеленый остров" },
          { label: "C", text: "Тайны тропиков" },
          { label: "D", text: "Джавелины и обезьяны" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре главный герой носит рюкзак и ищет загадочные артефакты?",
        options: [
          { label: "A", text: "Путешественник" },
          { label: "B", text: "Архив артефактов" },
          { label: "C", text: "Приключения с рюкзаком" },
          { label: "D", text: "Остров загадок" }
        ],
        correct: "C"
      },
      {
        question: "Как называется игра, где нужно угадывать, кто ты, пряча лицо за маской?",
        options: [
          { label: "A", text: "Мистерия масок" },
          { label: "B", text: "Тайная личина" },
          { label: "C", text: "Непохожий герой" },
          { label: "D", text: "Аноним" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре есть карта сокровищ и карта подземелий?",
        options: [
          { label: "A", text: "Подземелья и карта" },
          { label: "B", text: "Остров сокровищ" },
          { label: "C", text: "Карты приключений" },
          { label: "D", text: "Затерянные пути" }
        ],
        correct: "B"
      },
      {
        question: "Что ассоциируется с приключениями?",
        options: [
          { label: "A", text: "Скучно" },
          { label: "B", text: "Энергия и любопытство" },
          { label: "C", text: "Только сидеть" },
          { label: "D", text: "Никаких головоломок" }
        ],
        correct: "B"
      }
    ]
  },
  {
    title: "Мультфильмы и сказочные миры в играх",
    questions: [
      {
        question: "В какой игре можно построить волшебный замок из волшебных кубиков?",
        options: [
          { label: "A", text: "Волшебный мир Блоков" },
          { label: "B", text: "Майнкрафт" },
          { label: "C", text: "Замок из песка" },
          { label: "D", text: "Паспорт волшебства" }
        ],
        correct: "B"
      },
      {
        question: "Как называют стиль графики в играх, который напоминает мультфильмы?",
        options: [
          { label: "A", text: "Реализм" },
          { label: "B", text: "Карикатура" },
          { label: "C", text: "Мультяшная графика" },
          { label: "D", text: "Нереализм" }
        ],
        correct: "C"
      },
      {
        question: "В какой игре можно встретить говорящих зверей и фей?",
        options: [
          { label: "A", text: "Пещеры и звери" },
          { label: "B", text: "Мир сказок" },
          { label: "C", text: "Феи и звери" },
          { label: "D", text: "Говорящие животные" }
        ],
        correct: "B"
      },
      {
        question: "Какая игра учит дружбе и командной работе?",
        options: [
          { label: "A", text: "Соло-приключение" },
          { label: "B", text: "Командная история" },
          { label: "C", text: "Команда друзей" },
          { label: "D", text: "Казуальная игра" }
        ],
        correct: "B"
      },
      {
        question: "В какой игре можно увидеть сказочного дракона?",
        options: [
          { label: "A", text: "Дракон и огонь" },
          { label: "B", text: "Мир драконов" },
          { label: "C", text: "Драконы и приключения" },
          { label: "D", text: "Все вышеупомянутые" }
        ],
        correct: "D"
      },
      {
        question: "Что такое «кубики-мишени» в играх?",
        options: [
          { label: "A", text: "Игрушечные кубики" },
          { label: "B", text: "Блоки, с помощью которых можно строить" },
          { label: "C", text: "Мишени для стрельбы" },
          { label: "D", text: "Невидимые блоки" }
        ],
        correct: "B"
      },
      {
        question: "Как называется игра, где герой превращается в маленького котёнка?",
        options: [
          { label: "A", text: "Котенок в городе" },
          { label: "B", text: "Мультяшный котёнок" },
          { label: "C", text: "Котик в стране чудес" },
          { label: "D", text: "Крошка-кот" }
        ],
        correct: "A"
      },
      {
        question: "В какой игре можно нарисовать свой мир и персонажей?",
        options: [
          { label: "A", text: "Рисуй мир" },
          { label: "B", text: "Творческая вселенная" },
          { label: "C", text: "Мастерская художника" },
          { label: "D", text: "Мой рисунок" }
        ],
        correct: "B"
      },
      {
        question: "Какая игра часто основана на классических сказках?",
        options: [
          { label: "A", text: "Легенды и сказки" },
          { label: "B", text: "Сказочный мир" },
          { label: "C", text: "Бродилки по сказкам" },
          { label: "D", text: "Все перечисленные" }
        ],
        correct: "D"
      },
      {
        question: "Что чаще всего делают в мультяшных играх для детей?",
        options: [
          { label: "A", text: "Решают головоломки и бегают по уровням" },
          { label: "B", text: "Грызут камни" },
          { label: "C", text: "Пишут книги" },
          { label: "D", text: "Учатся писать стихи" }
        ],
        correct: "A"
      }
    ]
  },
  {
    title: "Цитаты и язык игр",
    questions: [
      {
        question: "Что такое «моды» в играх?",
        options: [
          { label: "A", text: "Новые музыкальные треки" },
          { label: "B", text: "Неофициальные дополнения, которые меняют игру" },
          { label: "C", text: "Новый компьютер" },
          { label: "D", text: "Вид транспорта" }
        ],
        correct: "B"
      },
      {
        question: "Как называется ежедневное обновление в некоторых играх?",
        options: [
          { label: "A", text: "Патч" },
          { label: "B", text: "Взлом" },
          { label: "C", text: "Ремонт" },
          { label: "D", text: "Крафт" }
        ],
        correct: "A"
      },
      {
        question: "Что означает термин «кооп» в играх?",
        options: [
          { label: "A", text: "Кооперативная игра для совместной игры" },
          { label: "B", text: "Копирование персонажей" },
          { label: "C", text: "Коэффициент удачи" },
          { label: "D", text: "Комбинация клавиш" }
        ],
        correct: "A"
      },
      {
        question: "Какая часть игры отвечает за сюжет и персонажей?",
        options: [
          { label: "A", text: "Графика" },
          { label: "B", text: "Звук" },
          { label: "C", text: "Режим кампании" },
          { label: "D", text: "Меню" }
        ],
        correct: "C"
      },
      {
        question: "Что такое «кейсы» и «скин» в играх?",
        options: [
          { label: "A", text: "Разделы меню" },
          { label: "B", text: "Внутриигровые предметы для персонализации" },
          { label: "C", text: "Типы контроллеров" },
          { label: "D", text: "Локации боя" }
        ],
        correct: "B"
      },
      {
        question: "Как называется процесс улучшения персонажа за счет опыта?",
        options: [
          { label: "A", text: "Навыки" },
          { label: "B", text: "Прокачка" },
          { label: "C", text: "Карма" },
          { label: "D", text: "Блокировка" }
        ],
        correct: "B"
      },
      {
        question: "Что такое «PvP»?",
        options: [
          { label: "A", text: "Игрок против ИИ" },
          { label: "B", text: "Игрок против игрока" },
          { label: "C", text: "Приседания и прыжки" },
          { label: "D", text: "Прокачка и сбор" }
        ],
        correct: "B"
      },
      {
        question: "В какой жанр обычно входят игры с элементами головоломок и поисков предметов?",
        options: [
          { label: "A", text: "Пазлы" },
          { label: "B", text: "Шутеры" },
          { label: "C", text: "Ролевые игры" },
          { label: "D", text: "Спортивные симуляторы" }
        ],
        correct: "A"
      },
      {
        question: "Какой термин описывает игру, в которой можно играть по сети с друзьями?",
        options: [
          { label: "A", text: "Оффлайн-игра" },
          { label: "B", text: "Онлайн-игра" },
          { label: "C", text: "Локальная игра" },
          { label: "D", text: "Нейросеть" }
        ],
        correct: "B"
      },
      {
        question: "Что означает «геймдизайн»?",
        options: [
          { label: "A", text: "Программирование графики" },
          { label: "B", text: "Планирование и создание игрового опыта" },
          { label: "C", text: "Редактура звука" },
          { label: "D", text: "Продажа игр" }
        ],
        correct: "B"
      }
    ]
  }
];

type Screen = 'start' | 'rules' | 'quiz' | 'results';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const totalQuestions = QUIZ_DATA.reduce((sum, round) => sum + round.questions.length, 0);
  const answeredQuestions = currentRound * 10 + currentQuestion;

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === QUIZ_DATA[currentRound].questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentRound < 5) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
      } else {
        setScreen('results');
      }
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1500);
  };

  const resetQuiz = () => {
    setScreen('start');
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getButtonStyle = (optionLabel: string) => {
    if (!showFeedback) return 'bg-card hover:bg-muted border-4 border-primary hover:scale-105';
    
    const correctAnswer = QUIZ_DATA[currentRound].questions[currentQuestion].correct;
    if (optionLabel === correctAnswer) {
      return 'bg-green-600 border-4 border-green-400';
    }
    if (optionLabel === selectedAnswer && optionLabel !== correctAnswer) {
      return 'bg-red-600 border-4 border-red-400';
    }
    return 'bg-card border-4 border-muted opacity-50';
  };

  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-8 border-primary bg-card shadow-2xl">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-4 text-6xl mb-4">
              <span className="animate-bounce">🎮</span>
              <span className="animate-bounce delay-100">🕹️</span>
              <span className="animate-bounce delay-200">👾</span>
            </div>
            <h1 className="text-5xl font-bold text-accent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              ИГРОВОЙ
              <br />
              КВИЗ
            </h1>
            <p className="text-xl text-muted-foreground font-roboto">
              Проверь свои знания о видеоиграх!
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => setScreen('rules')} 
                className="w-full h-16 text-xl border-4 border-primary hover:scale-105 transition-transform font-bold"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                <Icon name="Play" className="mr-2" size={24} />
                СТАРТ
              </Button>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted border-4 border-accent">
                  <div className="text-3xl font-bold text-accent">6</div>
                  <div className="text-sm text-muted-foreground">Раундов</div>
                </div>
                <div className="p-4 bg-muted border-4 border-primary">
                  <div className="text-3xl font-bold text-primary">60</div>
                  <div className="text-sm text-muted-foreground">Вопросов</div>
                </div>
                <div className="p-4 bg-muted border-4 border-secondary">
                  <div className="text-3xl font-bold text-secondary">4</div>
                  <div className="text-sm text-muted-foreground">Варианта</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (screen === 'rules') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-8 border-primary bg-card">
          <h2 className="text-3xl font-bold text-center mb-6 text-accent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            ПРАВИЛА
          </h2>
          <div className="space-y-4 text-foreground font-roboto">
            <div className="flex items-start gap-4 p-4 bg-muted border-4 border-primary">
              <span className="text-3xl">📝</span>
              <div>
                <h3 className="font-bold text-lg mb-2">Формат квиза</h3>
                <p>6 раундов по 10 вопросов в каждом. Всего 60 вопросов на разные темы об играх.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted border-4 border-secondary">
              <span className="text-3xl">✅</span>
              <div>
                <h3 className="font-bold text-lg mb-2">Как отвечать</h3>
                <p>Выбирайте один из четырёх вариантов (A, B, C, D). Правильный ответ даёт 1 балл.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted border-4 border-accent">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="font-bold text-lg mb-2">Подсчёт баллов</h3>
                <p>В конце вы увидите свой результат и сможете начать заново.</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setScreen('quiz')} 
            className="w-full h-16 text-xl mt-6 border-4 border-primary hover:scale-105 transition-transform font-bold"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            НАЧАТЬ КВИЗ
          </Button>
        </Card>
      </div>
    );
  }

  if (screen === 'results') {
    const percentage = Math.round((score / totalQuestions) * 100);
    let grade = '';
    let emoji = '';
    
    if (percentage >= 90) {
      grade = 'ЛЕГЕНДА!';
      emoji = '👑';
    } else if (percentage >= 75) {
      grade = 'ПРО-ГЕЙМЕР!';
      emoji = '🎮';
    } else if (percentage >= 60) {
      grade = 'ХОРОШО!';
      emoji = '⭐';
    } else if (percentage >= 40) {
      grade = 'НЕПЛОХО!';
      emoji = '👍';
    } else {
      grade = 'ПОПРОБУЙ ЕЩЁ!';
      emoji = '💪';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-8 border-primary bg-card">
          <div className="text-center space-y-6">
            <div className="text-8xl mb-4 animate-bounce">{emoji}</div>
            <h2 className="text-4xl font-bold text-accent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              {grade}
            </h2>
            <div className="p-8 bg-muted border-4 border-accent">
              <div className="text-6xl font-bold text-primary mb-2">{score}/{totalQuestions}</div>
              <div className="text-2xl text-muted-foreground">баллов</div>
              <div className="text-3xl font-bold text-accent mt-4">{percentage}%</div>
            </div>
            <div className="space-y-4">
              {QUIZ_DATA.map((round, idx) => (
                <div key={idx} className="p-4 bg-card border-4 border-muted">
                  <div className="font-bold text-left mb-2">{round.title}</div>
                  <div className="text-sm text-muted-foreground text-left">
                    Раунд {idx + 1} пройден
                  </div>
                </div>
              ))}
            </div>
            <Button 
              onClick={resetQuiz} 
              className="w-full h-16 text-xl border-4 border-primary hover:scale-105 transition-transform font-bold"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              <Icon name="RotateCcw" className="mr-2" size={24} />
              ЗАНОВО
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = QUIZ_DATA[currentRound].questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))] p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-muted-foreground">
              РАУНД {currentRound + 1}/6: {QUIZ_DATA[currentRound].title.toUpperCase()}
            </div>
            <div className="text-2xl font-bold text-primary" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              {score} 🏆
            </div>
          </div>
          <Progress value={(answeredQuestions / totalQuestions) * 100} className="h-4 border-2 border-primary" />
          <div className="text-center text-sm text-muted-foreground">
            Вопрос {answeredQuestions + 1} из {totalQuestions}
          </div>
        </div>

        <Card className="p-8 border-8 border-primary bg-card mb-6">
          <div className="mb-6">
            <div className="text-sm text-accent font-bold mb-2">ВОПРОС {currentQuestion + 1}/10</div>
            <h3 className="text-2xl font-bold text-foreground">{currentQ.question}</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswerClick(option.label)}
                disabled={showFeedback}
                className={`p-6 text-left transition-all duration-200 ${getButtonStyle(option.label)} font-roboto`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-primary w-12 h-12 flex items-center justify-center border-4 border-primary bg-background">
                    {option.label}
                  </div>
                  <div className="text-lg font-semibold">{option.text}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>Раунд {currentRound + 1} / 6</div>
          <div>Вопрос {currentQuestion + 1} / 10</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
