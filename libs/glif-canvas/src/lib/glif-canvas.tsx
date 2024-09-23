import styles from './glif-canvas.module.css';

/* eslint-disable-next-line */
export interface GlifCanvasProps {}

export function GlifCanvas(props: GlifCanvasProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to GlifCanvas!</h1>
    </div>
  );
}

export default GlifCanvas;
