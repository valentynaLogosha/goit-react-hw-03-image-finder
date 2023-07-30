// імпортуємо модуль axios для работи с HTTP-запитами
import axios from 'axios';

// встановлюємо базовий URL для всіх запитів
axios.defaults.baseURL = 'https://pixabay.com/api/';

// Константа с API-ключом
const API_KEY = '37657355-9235c327b453c7d81674f7b17';

// Константа, яка визначає кількість зображень на сторінці
export const perPage = 12;

// Функція отримання зображень з API Pixabay
export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};

// Функція для нормалізації масиву зображень
export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });