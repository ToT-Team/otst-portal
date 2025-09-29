'use client'
import { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "./page.module.css";
import Intro from "./intro/page";
import Main from "./main/page";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const introRef = useRef(null);
  const mainRef = useRef(null);
  const nodeRef = showIntro ? introRef : mainRef;
  const handleSkip = () => {
    // if (screen !== 'intro') return;
    setShowIntro(!showIntro);
  }

  return <div className="container">
      <SwitchTransition>
        <CSSTransition
          key={showIntro ? "intro" : "main"}
          timeout={500}
          nodeRef={nodeRef}
          classNames="fade"
        >
          <div ref={nodeRef} >
          {showIntro ? <Intro /> :  <Main />}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <button className={styles.skip} onClick={() => handleSkip()}>Skip</button>
    </div>
}
