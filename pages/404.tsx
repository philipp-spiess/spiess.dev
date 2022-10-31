import styles from "./404.module.css";

export default function FourOhFour() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Not Found</h1>
        <p>You just hit a route that does not exist. 😭</p>
      </div>
    </div>
  );
}
