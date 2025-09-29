import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import LiveBg from './bg/live-bg';

export default function Intro({ className = '' }: { className?: string }) {
    const [start, setStart] = useState(false);
    const [count, setCount] = useState(0);
    const textRef = useRef(null);

    const handleStart = () => {
        setStart(true);
        const gap = 350;
        const base = 1500;
        setTimeout(() => { setCount(1) }, base);
        setTimeout(() => { setCount(2) }, base + gap);
        setTimeout(() => { setCount(3) }, base + gap * 2);
        setTimeout(() => { setCount(4) }, base + gap * 3);
        setTimeout(() => { setCount(5) }, base + gap * 4);
        setTimeout(() => { setCount(6) }, base + gap * 5);
        setTimeout(() => { setCount(7) }, base + gap * 6);
        setTimeout(() => { setCount(8) }, base + gap * 7);
    }

    useEffect(() => {
        handleStart();
    }, []);

    return <>
        {start && <div className={`${className} ${styles.introContainer}`}>
            {Background(count)}
            <div ref={textRef} className={styles.textWrapper}>
                {Title(count)}
            </div>
        </div>
        }
    </>
}

function Title(count : number) {
    switch(count) {
        case 0:
            return <>
                <div className={styles.introText}>O</div>
                <div className={styles.introText}>T</div>
                <div className={styles.introText}>S</div>
                <div className={styles.introText}>T</div>
            </>
        case 1:
            return <img className={styles.introTitle} src="./imgs/otst-title.png"/>
        case 2:
            return <img className={styles.introTitle} src="./imgs/otst2-title.png"/>
        case 3:
            return <img className={styles.introTitle} src="./imgs/otst3-title.png"/>
        case 4:
            // return <img className={styles.introTitle} src="./imgs/otst4-title.png"/>
        case 5:
            // return <img className={styles.introTitle} src="./imgs/otst5-title.png"/>
        case 6:
            return <img className={styles.introTitle} src="./imgs/otst6-title.png"/>
        case 7:
            return <img className={styles.introTitle} src="./imgs/otst7-title.png"/>
        default:
            return <img className={styles.introTitle} src="./imgs/otstlive-title.png"/>
    }
}

function Background(count : number) {
    switch(count) {
        case 0:
            return <></>
        case 1:
            return <img className={styles.introBg} src="./imgs/otst-bg.png"/>
        case 2:
            return <img className={styles.introBg} src="./imgs/otst2-bg.png"/>
        case 3:
            return <img className={styles.introBg} src="./imgs/otst3-bg.png"/>
        case 4:
            return <img className={styles.introBg} src="./imgs/otst4-bg.png"/>
        case 5:
            return <img className={styles.introBg} src="./imgs/otst5-bg.png"/>
        case 6:
            return <img className={styles.introBg} src="./imgs/otst6-bg.png"/>
        case 7:
            return <img className={styles.introBg} src="./imgs/otst7-bg.png"/>
        default:
            return <LiveBg />
    }
}