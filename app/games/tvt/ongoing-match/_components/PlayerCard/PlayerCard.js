import React from 'react';
import styles from './index.module.scss';

const PlayerCard = ({ name = 'MrPrimeTrader (You)',
    avatar = '/games/dummyContent/ongoing/avatarPlayer.png',
    score = '+98.00%',
    level = '98',
    isOpponent = false }) => {

    if (isOpponent) {
        name = "CryptoSlayer"
        avatar = '/games/dummyContent/ongoing/avatarOponet.png'
    }

    return (
        <div className={styles.PlayerCardWrpper}>
            <div className={`${styles.topbar} ${isOpponent ? styles.topbarOpponentCard : ''}`}></div>
            <div className={`${styles.PlayerCard} ${isOpponent ? styles.OpponentCard : ''}`}>
                <div className={`${styles.playerInfo} ${isOpponent ? styles.OpponentCard : ''}`}>
                    <img src={avatar} alt='avatar' />
                    <div className={styles.playerContent}>
                        <h1>{name}</h1>
                        <p>Trader Level: <span className={styles.highlight}>#{level}</span></p>
                    </div>
                </div>
                <div className={styles.scoreCount}>
                    <p>{score}</p>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;

