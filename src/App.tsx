import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './layout/header/Header';

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
