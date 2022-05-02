import { ChangeEvent, FC } from 'react';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onInput: (event: ChangeEvent) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onInput }) => (
  <div className={styles.searchBoxContainer}>
    <input
      placeholder='Find a country'
      className={styles.searchBox}
      type={'text'}
      onChange={(e) => onInput(e)}
      autoFocus>
    </input>
  </div>
);

export default SearchBar;
