import React, { FC } from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = () => (
  <div className={styles.flexContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;
