import styled from '@emotion/styled';

export const SearchForm = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 20px 0;
background: linear-gradient(
  315deg,
  rgba(255, 255, 0, 0.7) 3%, /* Жовтий колір */
  rgba(0, 0, 255, 0.7) 38% /* Синій колір */
);
box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  padding: 5px 5px 5px 15px;
  font-size: 16px;
  outline: none;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  &::placeholder {
    font-size: 16px;
    color: #cccccc;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  cursor: pointer;
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 126, 1);
  }
`;

export const SearchSpan = styled.span`
  padding: 10px;
`;

export const SearchLogo = styled.img`
  margin-right: 50px;
`;