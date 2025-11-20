import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX: number; 
  controlY: number; 
  startTime: number;
  duration: number; 
  delay: number; 
  trailDelay: number; 
}

interface BackgroundArc {
  radius: number;
  width: number;
  color: string;
  speed: number;
  currentAngle: number;
  dash?: number[];
}

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let arcs: BackgroundArc[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let nextSpawnTime = Date.now() + 10000 + Math.random() * 5000; 

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      
      ctx.scale(pixelRatio, pixelRatio);
      
      createStars();
      createArcs();
    };

    const createStars = () => {
      const starCount = Math.floor((width * height) / 4500);
      stars = [];

      for (let i = 0; i < starCount; i++) {
        const r = Math.random();
        let radius;
        if (r < 0.6) radius = 0.5;       
        else if (r < 0.9) radius = 1.0;  
        else radius = 1.5;               

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: radius,
          baseAlpha: Math.random() * 0.4 + 0.3, 
          vx: (Math.random() - 0.5) * 0.05, 
          vy: (Math.random() - 0.5) * 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.01 + 0.002, 
        });
      }
    };

    const createArcs = () => {
      arcs = [];
      const maxRadius = Math.max(width, height) * 1.8; 
      const count = 60; 

      for (let i = 0; i < count; i++) {
        const rRatio = i / count;
        const radius = (Math.pow(rRatio, 1.1) * maxRadius) + (Math.random() * 40);
        
        const thickness = Math.random() * 3 + 1; 

        // In light mode, rings should be subtle grey. In dark, subtle white/black.
        const isDark = Math.random() > 0.7; 
        let color;
        
        if (theme === 'dark') {
            if (isDark) {
                color = `rgba(0, 0, 0, ${Math.random() * 0.4 + 0.1})`;
            } else {
                color = `rgba(255, 255, 255, ${Math.random() * 0.04 + 0.01})`;
            }
        } else {
            // Light mode colors
            if (isDark) {
                 color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`; // White gaps
            } else {
                 color = `rgba(0, 0, 0, ${Math.random() * 0.03 + 0.01})`; // Faint black lines
            }
        }

        const isDashed = Math.random() > 0.4;
        const dash = isDashed ? [Math.random() * 400 + 100, Math.random() * 200 + 50] : undefined;

        const speed = (Math.random() * 0.0001 + 0.00005) * (Math.random() > 0.5 ? 1 : -1);

        arcs.push({
          radius,
          width: thickness,
          color,
          speed,
          currentAngle: Math.random() * Math.PI * 2,
          dash
        });
      }
      
      arcs.sort((a, b) => a.radius - b.radius);
    };

    const getQuadraticBezierXY = (t: number, sx: number, sy: number, cp1x: number, cp1y: number, ex: number, ey: number) => {
        const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex;
        const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey;
        return { x, y };
    };

    const createShootingStar = (batchDelay: number = 0): ShootingStar => {
        const startSide = Math.random() < 0.5 ? 'top' : 'left';
        let startX, startY;
        
        if (startSide === 'top') {
            startX = Math.random() * (width * 0.6); 
            startY = -20;
        } else {
            startX = -20;
            startY = Math.random() * (height * 0.6);
        }

        const endSide = Math.random() < 0.5 ? 'right' : 'bottom';
        let endX, endY;

        if (endSide === 'right') {
            endX = width + 20;
            endY = height * 0.3 + Math.random() * (height * 0.7); 
        } else {
            endX = width * 0.3 + Math.random() * (width * 0.7);
            endY = height + 20;
        }

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const controlX = midX + (Math.random() - 0.5) * 300;
        const controlY = midY + (Math.random() - 0.5) * 300;

        return {
            id: Date.now() + Math.random(),
            startX, startY, endX, endY, controlX, controlY,
            startTime: Date.now() + batchDelay,
            duration: 3000 + Math.random() * 2000,
            delay: batchDelay,
            trailDelay: 400 + Math.random() * 400,
        };
    };

    const spawnShootingStars = () => {
        const isCluster = Math.random() < 0.15; 
        const count = isCluster ? Math.floor(Math.random() * 2) + 2 : 1;

        for (let i = 0; i < count; i++) {
            const delay = i * (Math.random() * 1000 + 500); 
            shootingStars.push(createShootingStar(delay));
        }
        
        nextSpawnTime = Date.now() + 8000 + Math.random() * 7000;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      const now = Date.now();
      
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(-50, -50); 
      
      arcs.forEach(arc => {
        arc.currentAngle += arc.speed;

        ctx.beginPath();
        ctx.arc(0, 0, arc.radius, 0, Math.PI * 2);
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = arc.width;
        
        if (arc.dash) {
             ctx.setLineDash(arc.dash);
             ctx.lineDashOffset = arc.currentAngle * arc.radius; 
        } else {
            ctx.setLineDash([]);
        }
        
        ctx.stroke();
      });
      ctx.restore();
      
      // Star color based on theme
      const starFill = theme === 'dark' ? '255, 255, 255' : '39, 39, 42'; // White or Zinc-800

      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        if (star.x < 0) star.x = width; else if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height; else if (star.y > height) star.y = 0;

        star.twinklePhase += star.twinkleSpeed;
        const flicker = Math.sin(star.twinklePhase) * 0.2; 
        const currentAlpha = Math.max(0.1, Math.min(0.8, star.baseAlpha + flicker));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        if (star.radius > 1.2 && theme === 'dark') {
            ctx.shadowBlur = star.radius * 3;
            ctx.shadowColor = `rgba(${starFill}, ${currentAlpha * 0.6})`;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${starFill}, ${currentAlpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (now > nextSpawnTime) {
          spawnShootingStars();
      }

      shootingStars = shootingStars.filter(star => {
          const elapsed = now - star.startTime;
          const tailT = (elapsed - star.trailDelay) / star.duration;
          return tailT < 1.0;
      });

      shootingStars.forEach(star => {
          const elapsed = now - star.startTime;
          if (elapsed < 0) return; 

          const headT = Math.min(1, elapsed / star.duration);
          const tailT = Math.max(0, (elapsed - star.trailDelay) / star.duration);

          if (headT > tailT) {
              const numSteps = 20;
              const stepSize = (headT - tailT) / numSteps;

              ctx.beginPath();
              const startPos = getQuadraticBezierXY(tailT, star.startX, star.startY, star.controlX, star.controlY, star.endX, star.endY);
              ctx.moveTo(startPos.x, startPos.y);

              for (let i = 1; i <= numSteps; i++) {
                  const t = tailT + stepSize * i;
                  const pos = getQuadraticBezierXY(t, star.startX, star.startY, star.controlX, star.controlY, star.endX, star.endY);
                  ctx.lineTo(pos.x, pos.y);
              }

              const headPos = getQuadraticBezierXY(headT, star.startX, star.startY, star.controlX, star.controlY, star.endX, star.endY);
              const gradient = ctx.createLinearGradient(startPos.x, startPos.y, headPos.x, headPos.y);
              
              if (theme === 'dark') {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
              } else {
                gradient.addColorStop(0, 'rgba(39, 39, 42, 0)');
                gradient.addColorStop(0.2, 'rgba(39, 39, 42, 0.1)');
                gradient.addColorStop(1, 'rgba(39, 39, 42, 0.9)');
              }

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 2;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              if (theme === 'dark') {
                  ctx.shadowBlur = 15;
                  ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
              }
              ctx.stroke();
              ctx.shadowBlur = 0;

              ctx.beginPath();
              ctx.arc(headPos.x, headPos.y, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = theme === 'dark' ? '#fff' : '#27272a';
              ctx.fill();
          }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initCanvas();
    animate();

    const resizeHandler = () => initCanvas();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run when theme changes

  const gradient = theme === 'dark' 
    ? 'radial-gradient(1600px circle at 50% 0%, #11131f 0%, #020202 100%)'
    : 'radial-gradient(1600px circle at 50% 0%, #f4f4f5 0%, #ffffff 100%)';

  return (
    <canvas
      id="starfield"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 transition-colors duration-1000"
      style={{ background: gradient }}
    />
  );
};