import styles from './styles.module.scss'

export function Player(){

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.footerEmpty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}/>
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.btnContainer}>

                    <button type="button">
                        <img src="/shuffle.svg" alt="Shuffle"/>
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="previous"/>
                    </button>

                    <button type="button" className={styles.playButton}>
                        <img src="/play.svg" alt="play"/>
                    </button>

                    <button type="button">
                        <img src="/play-next.svg" alt="next"/>
                    </button>

                    <button type="button">
                        <img src="/repeat.svg" alt="reapeat"/>
                    </button>

                </div>

            </footer>
        </div>
    );
}