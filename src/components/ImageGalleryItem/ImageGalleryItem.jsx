import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Класовий компонент ImageItem
class ImageItem extends Component {
  state = {
    showModal: false, // Зберігає стан модального вікна (відкрито чи закрито)
  };

  //Метод перемикання стану модального вікна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, // Інвертує значення showModal
    }));
  };

  render() {
    const { showModal } = this.state; // Отримуємо поточне значення showModal зі стану
    const { image } = this.props; // Отримуємо переданий пропс image

    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} // URL маленького зображення
            alt={image.tags} // Теги зображення
            onClick={this.toggleModal} // Обробник кліка для відкриття модального вікна
          />
          {showModal && ( // Якщо showModal дорівнює true, відображаємо модальне вікно
            <Modal
              largeImageURL={image.largeImageURL} // URL великого зображення
              tags={image.tags} // Теги зображення
              onClose={this.toggleModal} //Обробник для закриття модального вікна
            />
          )}
        </Item>
      </>
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;