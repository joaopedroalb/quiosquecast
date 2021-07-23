import { useRef, useEffect, useState } from 'react';
import { PlayerContext, usePlayer } from '../../contexts/PlayerContext';
import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../Utils/convertDurationToTimeString';

import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0)
    const [active, setActive] = useState(true);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        toggleShuffle,
        togglePlay,
        toggleLoop,
        setPlayingState,
        playBack,
        playNext,
    } = usePlayer();

    const currentEpisode = episodeList[currentEpisodeIndex];

    const backDisable: boolean = currentEpisodeIndex == 0 ? true : false;
    const hasNext: boolean = currentEpisodeIndex != episodeList.length - 1 || isShuffling;
    const isOneEpisode: boolean = episodeList.length == 1 ? true : false

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', event => {
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function endTime() {
        return currentEpisode?.duration ? Math.floor((currentEpisode?.duration - progress)) : 0
    }

    function handleSeek(mount: number) {
        audioRef.current.currentTime = mount;
        setProgress(mount);
    }

    function handleNext() {
        if (hasNext)
            playNext()
    }

    function handleActive() {
        setActive(!active);
    }

    return (
        <div className={active? styles.allContainer:styles.allContainerOff}>
            <div className={styles.iconController} onClick={() => handleActive()}>
                {active ? <FontAwesomeIcon icon={faChevronLeft} className={styles.iconSelect}/> : <FontAwesomeIcon icon={faChevronRight} className={styles.iconSelect}/>}
            </div>

            <div className={active ? styles.playerContainer:styles.playerContainerOff}>
                <header>
                    <img src="/playing.svg" alt="Tocando agora" />
                    <strong>Tocando agora </strong>
                </header>

                {currentEpisode ? (
                    <div className={styles.currentEpisode}>
                        <Image width={392} height={392} src={currentEpisode.thumbnail} objectFit="cover" />
                        <strong>{currentEpisode.title}</strong>
                        <span>{currentEpisode.members}</span>
                    </div>
                ) : (
                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir</strong>
                    </div>
                )}

                <footer className={!currentEpisode ? styles.footerEmpty : ''}>
                    <div className={styles.progress}>
                        <span>{convertDurationToTimeString(progress)}</span>
                        <div className={styles.slider}>
                            {currentEpisode ? (
                                <Slider
                                    max={currentEpisode.duration}
                                    value={progress}
                                    onChange={handleSeek}
                                    trackStyle={{ backgroundColor: '#04d361' }}
                                    railStyle={{ backgroundColor: '#9f75ff' }}
                                    handleStyle={{ backgroundColor: '#04d361', borderWidth: 4 }}
                                />
                            ) : (
                                <div className={styles.emptySlider} />
                            )}
                        </div>
                        <span>{convertDurationToTimeString(endTime())}</span>
                    </div>

                    {currentEpisode && (
                        <audio
                            src={currentEpisode.url}
                            ref={audioRef}
                            autoPlay
                            loop={isLooping}
                            onEnded={() => handleNext()}
                            onPlay={() => setPlayingState(true)}
                            onPause={() => setPlayingState(false)}
                            onLoadedMetadata={() => setupProgressListener()}
                        />
                    )}

                    <div className={styles.btnContainer}>

                        <button
                            type="button"
                            disabled={!currentEpisode || isOneEpisode}
                            onClick={() => toggleShuffle()}
                            className={(isShuffling && !isOneEpisode) ? styles.isActive : ''}>
                            <img src="/shuffle.svg" alt="Shuffle" />
                        </button>

                        <button type="button" disabled={!currentEpisode || backDisable} onClick={() => playBack()}>
                            <img src="/play-previous.svg" alt="previous" />
                        </button>

                        <button type="button" className={styles.playButton} disabled={!currentEpisode} onClick={() => togglePlay()}>
                            {!isPlaying ? <img src="/play.svg" alt="play" /> : <img src="/pause.svg" alt="play" />}
                        </button>

                        <button type="button" disabled={!currentEpisode || !hasNext} onClick={() => handleNext()}>
                            <img src="/play-next.svg" alt="next" />
                        </button>

                        <button type="button"
                            disabled={!currentEpisode}
                            onClick={() => toggleLoop()}
                            className={isLooping ? styles.isActive : ''}>
                            <img src="/repeat.svg" alt="reapeat" />
                        </button>

                    </div>

                </footer>
            </div>

        </div>
    );
}