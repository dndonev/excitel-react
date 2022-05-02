import { FC } from 'react';
import styles from './Error.module.scss';

interface ErrorProps {
  errorMessage: string;
}

const ErrorMessage: FC<ErrorProps> = ({ errorMessage }) => (
  <div className={styles.flexContainer}>
    <h1> { errorMessage }</h1>
  </div>
);

export default ErrorMessage;
