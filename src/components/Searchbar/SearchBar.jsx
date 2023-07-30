import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    searchName: '', // Зберігає значення введеного пошукового запиту
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); // Запобігаємо стандартній поведінці форми
    const searchQuery = event.target.elements.searchName.value.trim(); //Отримуємо введений пошуковий запит і видаляємо пробіли
    this.props.onSubmit(searchQuery); // Передаємо введений пошуковий запит батьківському компоненту
    event.target.reset(); // Скидаємо значення у полі введення після надсилання форми
  };

  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
            <SearchLogo
              src={require('./pixabay-logo.png')} // Логотип Pixabay
              alt="logo"
              width="200"
            />
          </a>
          <SearchButton>
            <BsSearch />
            <SearchSpan>Search</SearchSpan>
          </SearchButton>
          <SearchInput
            name="searchName"
            type="text"
            id="search"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;