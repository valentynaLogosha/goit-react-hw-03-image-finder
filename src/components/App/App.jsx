import { Component } from 'react';
import * as API from '../../services/PixabayApi';
import SearchBar from '../Searchbar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  // Встановлення початкового стану
  state = {
    searchName: '', // зберігає запит для пошуку
    images: [], // зберігає завантажене зображення 
    currentPage: 1, // Зберігає поточний номер сторінки
    error: null, // Зберігає повідомлення про помилку
    isLoading: false, // індикатор завантаження зображення 
    totalPages: 0, // Зберігає загальну кількість сторінок
  };

  // Метод життєвого циклу: викликається під час оновлення компонента
  componentDidUpdate(_, prevState) {
    // Перевіряємо, чи змінився запит чи номер сторінки
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); // Отримуємо і додаємо зображення в стан 
    }
  }

  // Метод для завантаження додаткових зображень шляхом збільшення номера поточної сторінки
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Метод для обробки відправки форм пошуку 
  handleSubmit = query => {
    this.setState({
      searchName: query, // встан. введений запит в стан
      images: [], // Очищаємо масив із зображеннями
      currentPage: 1, // Скидаємо номер поточної сторінки на першу
    });
  };

  // Метод для отримання та додавання зображень у стан
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); 

      // Отримуємо дані за допомогою API запиту до Pixabay
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // Якщо зображення не знайдено, виводимо повідомлення
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      // Нормалізуємо отримані зображення
      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], // Додаємо нові зображення до існуючих
        isLoading: false, 
        error: '', // // Очищаємо повідомлення про помилку
        totalPages: Math.ceil(data.totalHits / 12), // Обчислюємо загальну кількість сторінок
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); // Якщо сталася помилка, виводимо повідомлення
    } finally {
      this.setState({ isLoading: false }); 
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty... 📷
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} /> // Кнопка для завантаження додаткових зображень
        )}
      </div>
    );
  }
}

export default App;