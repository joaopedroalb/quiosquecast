import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const { episodeList, currentEpisodeIndex, isPlaying,togglePlay,setPlayingState } = useContext(PlayerContext)

    const currentEpisode = episodeList[currentEpisodeIndex];

    useEffect(()=>{
        if(!audioRef.current){
            return;
        }
        if(isPlaying){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    },[isPlaying])

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora </strong>
            </header>

            {currentEpisode ? (
                <div className={styles.currentEpisode}>
                    <Image width={592} height={592} src={currentEpisode.thumbnail} objectFit="cover"/>
                    <strong>{currentEpisode.title}</strong>
                    <span>{currentEpisode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!currentEpisode? styles.footerEmpty: ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { currentEpisode ? (
                            <Slider
                                trackStyle={{backgroundColor: '#04d361'}}
                                railStyle={{backgroundColor: '#9f75ff'}}
                                handleStyle={{backgroundColor: '#04d361',borderWidth:4}}
                            />
                        ):(
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>00:00</span>
                </div>

                {currentEpisode && (
                    <audio 
                    src={currentEpisode.url} 
                    ref={audioRef} 
                    autoPlay
                    onPlay={()=>setPlayingState(true)}
                    onPause={()=>setPlayingState(false)}
                    />
                )}  

                <div className={styles.btnContainer}>

                    <button type="button" disabled={!currentEpisode}>
                        <img src="/shuffle.svg" alt="Shuffle" />
                    </button>

                    <button type="button" disabled={!currentEpisode}>
                        <img src="/play-previous.svg" alt="previous" />
                    </button>

                    <button type="button" className={styles.playButton} disabled={!currentEpisode} onClick={()=>togglePlay()}>
                        {!isPlaying ? <img src="/play.svg" alt="play" /> : <img src="/pause.svg" alt="play" />}
                    </button>

                    <button type="button" disabled={!currentEpisode}>
                        <img src="/play-next.svg" alt="next" />
                    </button>

                    <button type="button" disabled={!currentEpisode}>
                        <img src="/repeat.svg" alt="reapeat" />
                    </button>

                </div>

            </footer>
        </div>
    );
}