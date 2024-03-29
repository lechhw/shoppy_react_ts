import { Outlet } from 'react-router-dom';
import styles from './BaseLayout.module.scss';
import Header from '../../widgets/header/Header';

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.contentWrap}>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
