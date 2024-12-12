import { LocalStorage } from './localStorageService';

const STORAGE_KEY = 'advent-calendar';

const storage = new LocalStorage();

const giftsPool = [
  'cookie',
  'cookie',
  'cookie',
  'candy-cane',
  'candy-cane',
  'candy-cane',
  'dice-d20',
  'gift',
  'gift',
  'gifts',
  'hat-wizard',
  'mitten',
  'mitten',
  'socks',
  'socks'
];

const getRandomArrayItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const generateCell = (index, isOpen, gift) => {
  const cell = document.createElement('li');
  cell.classList.add('calendar-item');

  const number = document.createElement('p');
  number.innerHTML = `${index}`;

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.name = `${index}`;
  checkBox.value = `${index}`;
  checkBox.id = `${index}`;
  checkBox.checked = isOpen;

  const label= document.createElement('label');
  label.setAttribute('for', index.toString())

  const doorElement = document.createElement('div');
  doorElement.className = 'calendar-item__door';

  const contentElement = document.createElement('div');
  contentElement.className = 'calendar-item__content';

  const giftElement = document.createElement('i');
  giftElement.className = `fa fa-${gift}`;

  doorElement.appendChild(number);
  contentElement.appendChild(giftElement);
  label.appendChild(contentElement);
  label.appendChild(doorElement);
  cell.appendChild(checkBox);
  cell.appendChild(label);

  return cell;
}

const generateCalendar = () => {
  let newCalendar;
  const savedCalendar = storage.get(STORAGE_KEY);

  if (!savedCalendar) newCalendar = [];

  const calendarElement = document.createElement('ol');
  calendarElement.className = 'calendar';

  for (let i = 1; i <= 25; i++) {
    let cell;

    if (savedCalendar) {
      const gift = savedCalendar[i - 1]?.gift;
      const isOpen = savedCalendar[i - 1]?.isOpen;

      cell = generateCell(i, isOpen, gift);
    } else {
      const newGift = getRandomArrayItem(giftsPool);
      newCalendar.push({ isOpen: false, gift: newGift });

      cell = generateCell(i, false, newGift);
    }

    calendarElement.appendChild(cell);
  }

  if (!savedCalendar) storage.set(STORAGE_KEY, newCalendar);

  return calendarElement;
}

const renderCalendar = () => {
  const calendarContainer = document.getElementById('calendar-container');
  const calendarElement = generateCalendar();

  calendarElement.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
      const calendar = storage.get(STORAGE_KEY);
      const index = parseInt(e.target.id);
      calendar[index - 1].isOpen = e.target.checked;

      storage.set(STORAGE_KEY, calendar)
    }
  })

  calendarContainer.appendChild(calendarElement);
}

renderCalendar();
