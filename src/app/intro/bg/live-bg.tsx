import { useEffect, useRef } from 'react';
import styles from './live-bg.module.css';

export default function LiveBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        sizingCanvas();
        function sizingCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        const circles = [
            { r: 100, posX: 210, posY: 130, angle: 0 },
            { r: 100, posX: 225, posY: 142, angle: 0 },
            { r: 100, posX: 240, posY: 152, angle: 0 },
            { r: 100, posX: 255, posY: 160, angle: 0 },
            { r: 100, posX: 270, posY: 166, angle: 0 },
            { r: 100, posX: 285, posY: 170, angle: 0 },
            { r: 100, posX: 300, posY: 172, angle: 0 },
            { r: 100, posX: 315, posY: 173, angle: 0 },
            { r: 100, posX: 330, posY: 172, angle: 0 },
            { r: 100, posX: 345, posY: 169, angle: 0 },
            { r: 100, posX: 360, posY: 163, angle: 0 },
            { r: 100, posX: 375, posY: 156, angle: 0 },
            { r: 100, posX: 390, posY: 148, angle: 0 },
            { r: 100, posX: 405, posY: 138, angle: 0 },
            { r: 100, posX: 420, posY: 124, angle: 0 },
            { r: 100, posX: 435, posY: 111, angle: 0 },
            { r: 100, posX: 450, posY: 99, angle: 0 },
            { r: 100, posX: 465, posY: 88, angle: 0 },
            { r: 100, posX: 480, posY: 78, angle: 0 },
            { r: 100, posX: 495, posY: 69, angle: 0 },
            { r: 100, posX: 510, posY: 60, angle: 0 },
            { r: 100, posX: 525, posY: 52, angle: 0 },
            { r: 105, posX: 540, posY: 45, angle: 0 },
            { r: 110, posX: 555, posY: 40, angle: 0 },
            { r: 115, posX: 570, posY: 35, angle: 0 },
            { r: 120, posX: 585, posY: 30, angle: 0 },
            { r: 125, posX: 600, posY: 25, angle: 0 },
            { r: 130, posX: 615, posY: 22, angle: 0 },
            { r: 135, posX: 630, posY: 20, angle: 0 },
            { r: 140, posX: 645, posY: 15, angle: 0 },
            { r: 150, posX: 660, posY: 10, angle: 0 },
            { r: 160, posX: 675, posY: 5, angle: 0 },
            { r: 170, posX: 690, posY: 2, angle: 0 },
            { r: 180, posX: 705, posY: 0, angle: 0 },
            { r: 190, posX: 720, posY: 2, angle: 0 },
            { r: 200, posX: 735, posY: 5, angle: 0 }
        ];
        const conCircles = [
            { r: 200, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 180, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 160, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 140, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 120, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 100, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 80, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 }
        ];
        const conCircles2 = [
            { r: 100, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 90, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 80, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 70, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 60, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 50, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 },
            { r: 40, dashLength: 5 + Math.random() * 100, start: Math.random() * Math.PI, end: Math.random() * Math.PI * 2, direction: Math.round(Math.random()), angle: 0 }
        ];

        const squareOpts = {
            width: 150,
            gap: 10
        };
        type GridLine = { pos: number; length: number, dash: [number, number], color: string };
        const gridSize = 15;
        const gridPattern: { h: GridLine[], v: GridLine[] } = { h: [], v: [] };
        const maxWidth = canvas.width * 0.8;
        const maxHeight = canvas.height * 0.8;
        for (let x = gridSize; x <= maxWidth; x += gridSize) {
            gridPattern.h.push({
                pos: x,
                length: maxHeight - (maxHeight * (x / maxWidth)) + getRandom(-50, 50),
                dash: [getRandom(5, 20), getRandom(5, 20)],
                color: `rgba(0, 55, 254, ${1 - x / canvas.width})`
            });
        }
        for (let y = gridSize; y <= maxHeight * 0.7; y += gridSize) {
            gridPattern.v.push({
                pos: y,
                length: maxWidth - (maxWidth * (y / maxHeight)) + getRandom(-50, 50),
                dash: [getRandom(5, 20), getRandom(5, 20)],
                color: `rgba(0, 55, 254, ${1 - y / canvas.height})`
            });
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.font = "20px Dela Gothic One";
            ctx.strokeStyle = '#0037fe';
            ctx.fillStyle = "#0037fe";
            ctx.lineWidth = 1.5;
            circles.forEach(c => {
                const x = c.posX - 160;
                const y = canvas.height - c.posY + 40;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(c.angle);
                ctx.beginPath();
                ctx.setLineDash([2, 10]);
                ctx.arc(0, 0, c.r, 0, Math.PI * 2);
                ctx.stroke();

                ctx.restore();
                c.angle += 0.003;
            });

            ctx.lineWidth = 1;
            conCircles.forEach((c, index) => {
                const x = canvas.width * 0.38;
                const y = 220;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(c.angle);
                ctx.beginPath();
                if ([1, 3, 5].includes(index)) ctx.setLineDash([c.dashLength, c.dashLength]);
                ctx.arc(0, 0, c.r, c.start, c.end);
                ctx.stroke();

                ctx.restore();
                if (c.direction) c.angle += 0.003;
                else c.angle -= 0.003;
            });
            conCircles2.forEach((c, index) => {
                const x = canvas.width * 0.90;
                const y = canvas.height * 0.26;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(c.angle);
                ctx.beginPath();
                if ([1, 3, 5].includes(index)) ctx.setLineDash([c.dashLength, c.dashLength]);
                ctx.arc(0, 0, c.r, c.start, c.end);
                ctx.stroke();

                ctx.restore();
                if (c.direction) c.angle += 0.003;
                else c.angle -= 0.003;
            });

            // draw rects
            const [squarePosX, squarePosY] = [canvas.width * 0.7, canvas.height * 0.42];
            ctx.strokeRect(squarePosX, squarePosY, squareOpts.width, squareOpts.width);
            ctx.strokeRect(squarePosX, squarePosY + squareOpts.width + squareOpts.gap, squareOpts.width, squareOpts.width);
            ctx.strokeRect(squarePosX + squareOpts.width + squareOpts.gap, squarePosY, squareOpts.width, squareOpts.width);

            ctx.fillRect(squarePosX + squareOpts.width - (squareOpts.width / 4 + squareOpts.gap / 2), squarePosY + squareOpts.width - (squareOpts.width / 4 + squareOpts.gap / 2), squareOpts.width / 4, squareOpts.width / 4);
            ctx.fillRect(squarePosX + squareOpts.width * 2 + squareOpts.gap - (squareOpts.width / 4 + squareOpts.gap / 2), squarePosY + squareOpts.gap / 2, squareOpts.width / 4, squareOpts.width / 4);
            ctx.fillRect(squarePosX + squareOpts.gap / 2, squarePosY + squareOpts.width * 2 + squareOpts.gap - (squareOpts.width / 4 + squareOpts.gap / 2), squareOpts.width / 4, squareOpts.width / 4);

            ctx.fillText("2025", squarePosX + squareOpts.width + 18, squarePosY + 24);
            ctx.fillText("07", squarePosX + squareOpts.width - 40, squarePosY + squareOpts.width + squareOpts.gap + 24);

            ctx.save();
            ctx.lineWidth = 0.25;
            gridPattern.h.forEach(g => {
                ctx.strokeStyle = g.color;
                ctx.beginPath();
                ctx.setLineDash(g.dash);
                ctx.moveTo(g.pos, 0);
                ctx.lineTo(g.pos, g.length);
                ctx.stroke();

            });
            gridPattern.v.forEach(g => {
                ctx.strokeStyle = g.color;
                ctx.beginPath();
                ctx.setLineDash(g.dash);
                ctx.moveTo(0, g.pos);
                ctx.lineTo(g.length, g.pos);
                ctx.stroke();

            });

            ctx.restore();
            animationRef.current = requestAnimationFrame(animate);
        }

        animate();
        window.addEventListener('resize', sizingCanvas);

        // clear event when leaving
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', sizingCanvas);
        };
    }, [canvasRef]);

    return <div className={styles.container}>
        <div className={styles.bgElements}>
            <div className={styles.borderElements}>
                <div className={styles.borderTop}></div>
                <div className={styles.borderLeft}></div>
                <div className={styles.borderRight}></div>
                <div className={styles.borderBottom}></div>
            </div>
            <canvas ref={canvasRef} />
            <div className={styles.triangles}>
                {[...Array(4)].map((_, i) => (
                    <div className={styles.triangleItem} key={i}></div>
                ))}
            </div>

            <div className={styles.chevrons}>
                {[...Array(12)].map((_, i) => (
                    <div className={styles.chevronItem} key={i}></div>
                ))}
            </div>

            <div className={styles.barcode}></div>

            <div className={styles.squareLinear}></div>
        </div>
    </div>
}

function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}