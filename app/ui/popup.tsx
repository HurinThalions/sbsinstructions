import { useEffect, useState } from 'react';
import styles from '@/app/ui/css/popup.module.css';

type PopupProps = {
  message: string;
  duration?: number; // Dauer, nach der das Pop-up verschwindet
};

const Popup = ({ message, duration = 1500 }: PopupProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // Timer bereinigen
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={styles.popup}>
      <p>{message}</p>
    </div>
  );
};

export default Popup;