'use client'
import { AnimatePresence, motion } from "framer-motion";
import styles from './page.module.css'

import Opening from "./opening/page";
import Index from "./home/page";
import { useState } from "react";

export default function Home() {
    const [stage, setStage] = useState(0);
    return (
        <main className={styles.main}>
            <AnimatePresence mode="wait">
                {stage === 0 &&
                    <motion.div
                        key={'opening'}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <Opening />
                        <button className={styles.skipButton} onClick={() => setStage(1)}>Skip</button>
                    </motion.div>

                }
                {stage === 1 &&
                    <motion.div 
                        key={'index'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}>
                        <Index />
                    </motion.div>
                }


            </AnimatePresence>
        </main>
    );
}
