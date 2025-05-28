import styles from './ErrorDisplay.module.css';

export const ErrorDisplay = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>Error: {error}</p>
      <button onClick={onRetry} className={styles.retryButton}>
        Try Again
      </button>
    </div>
  );
};