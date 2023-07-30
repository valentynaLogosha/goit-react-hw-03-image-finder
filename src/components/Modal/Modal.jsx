import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

// Об'єкт модального вікна в DOM-дереве
const modalRoot = document.querySelector('#modal-root');

// Класовий компонент Modal
class Modal extends Component {
  // Метод життєвого циклу: викликається після монтування компонента
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown); // Додаємо обробник події натискання клавіші
    document.body.style.overflow = 'hidden';
  }

  // Спосіб життєвого циклу: викликається перед розмонтуванням компонента
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown); // видаляємо обрабник події натискання клавіші
    document.body.style.overflow = 'visible';
  }

  // Обробник події натискання клавіші
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); // Закриваємо модальне вікно при натисненні Escape
    }
  };

  // Обробник кліка модального вікна
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); // Закриваємо модальне вікно під час кліку
    }
  };

  render() {
    const { largeImageURL, tags } = this.props; // Отримуємо значення пропсів

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot // Рендерим модальне вікно в об'єкт modalRoot в DOM-дереві
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;