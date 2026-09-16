import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef
  ) { }

  private animationId = 0;
  private mouse = { x: 0, y: 0 };
  private resizeListener: (() => void) | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private glitchTimeout: ReturnType<typeof setTimeout> | null = null;

  // Rendered as plain text so the prerendered HTML carries the real values.
  stats = [
    { value: 4, suffix: '', label: 'Packages Available' },
    { value: 100, suffix: '%', label: 'Client Ownership' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initCanvas();
    this.initTextAnimations();
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.glitchTimeout) clearTimeout(this.glitchTimeout);
    if (this.resizeListener) window.removeEventListener('resize', this.resizeListener);
    if (this.mouseMoveListener) window.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private initTextAnimations(): void {
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}アイウエオ∆∑∏√';

    const scramble = (el: HTMLElement, finalText: string, delay: number): void => {
      setTimeout(() => {
        let iteration = 0;
        const totalFrames = finalText.replace(/ /g, '').length * 5;
        const interval = setInterval(() => {
          el.textContent = finalText
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < Math.floor(iteration / 5)) return finalText[i];
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join('');
          iteration++;
          if (iteration >= totalFrames) {
            el.textContent = finalText;
            clearInterval(interval);
            if (el.classList.contains('glitch-target')) {
              this.startGlitchLoop(el, finalText);
            }
          }
        }, 35);
      }, delay);
    };

    const wordTexts = ['TECHNOLOGY', 'THAT', 'MOVES', 'BUSINESSES', 'FORWARD.'];
    const words = this.el.nativeElement.querySelectorAll('.word');
    words.forEach((word: Element, i: number) => {
      const el = word as HTMLElement;
      el.textContent = '';
      scramble(el, wordTexts[i], i * 180 + 200);
    });

    const sub = this.el.nativeElement.querySelector('.hero-sub');
    if (sub) setTimeout(() => { (sub as HTMLElement).style.opacity = '1'; }, 1400);

    const btns = this.el.nativeElement.querySelector('.hero-btns');
    if (btns) {
      setTimeout(() => {
        (btns as HTMLElement).style.opacity = '1';
        (btns as HTMLElement).style.transform = 'translateY(0)';
      }, 1700);
    }

    const badge = this.el.nativeElement.querySelector('.hero-badge');
    if (badge) setTimeout(() => { (badge as HTMLElement).style.opacity = '1'; }, 1900);

    const stats = this.el.nativeElement.querySelector('.hero-stats');
    if (stats) setTimeout(() => { (stats as HTMLElement).style.opacity = '1'; }, 2100);
  }

  private startGlitchLoop(el: HTMLElement, originalText: string): void {
    const glitchChars = '!@#$%^&*[]{}|<>∆∑';

    const triggerGlitch = (): void => {
      let flickers = 0;
      const maxFlickers = 8;
      const flicker = setInterval(() => {
        if (flickers % 2 === 0) {
          el.textContent = originalText.split('').map((char) => {
            if (char === ' ') return ' ';
            return Math.random() > 0.55
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char;
          }).join('');
          el.style.transform = `translateX(${(Math.random() - 0.5) * 8}px) skewX(${(Math.random() - 0.5) * 4}deg)`;
          el.style.textShadow = `${(Math.random() - 0.5) * 10}px 0 rgba(0,200,255,0.7), ${(Math.random() - 0.5) * 10}px 0 rgba(255,0,0,0.7)`;
        } else {
          el.textContent = originalText;
          el.style.transform = '';
          el.style.textShadow = '';
        }
        flickers++;
        if (flickers >= maxFlickers) {
          clearInterval(flicker);
          el.textContent = originalText;
          el.style.transform = '';
          el.style.textShadow = '';
        }
      }, 55);
    };

    const scheduleNext = (): void => {
      this.glitchTimeout = setTimeout(() => {
        triggerGlitch();
        scheduleNext();
      }, 4000 + Math.random() * 3000);
    };
    scheduleNext();
  }

  private initCanvas(): void {
    const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setTimeout(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      this.mouseMoveListener = (e: MouseEvent): void => {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      };
      window.addEventListener('mousemove', this.mouseMoveListener);

      this.resizeListener = (): void => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', this.resizeListener);

      const W = (): number => canvas.width;
      const H = (): number => canvas.height;

      // ── MATRIX COLUMNS ──
      const fontSize = 14;
      const cols = Math.floor(W() / fontSize);
      const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -100);
      const matrixChars = 'ROGUETECHNOLOGIES01∆∑√∞アイウエオ</>{}#@$%'.split('');

      // ── HEX GRID ──
      interface Hex {
        x: number; y: number;
        alpha: number; target: number;
      }
      const hexSize = 40;
      const hexes: Hex[] = [];
      const buildHexes = (): void => {
        hexes.length = 0;
        const cols2 = Math.ceil(W() / (hexSize * 1.75)) + 2;
        const rows = Math.ceil(H() / (hexSize * 1.5)) + 2;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols2; c++) {
            hexes.push({
              x: c * hexSize * 1.75 + (r % 2 === 0 ? 0 : hexSize * 0.875),
              y: r * hexSize * 1.5,
              alpha: Math.random() * 0.15,
              target: Math.random() * 0.25,
            });
          }
        }
      };
      buildHexes();

      const drawHex = (x: number, y: number, s: number, alpha: number, red = false): void => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          i === 0 ? ctx.moveTo(x + s * Math.cos(a), y + s * Math.sin(a))
            : ctx.lineTo(x + s * Math.cos(a), y + s * Math.sin(a));
        }
        ctx.closePath();
        ctx.strokeStyle = red ? `rgba(220,0,0,${alpha * 3})` : `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = red ? 1.5 : 0.6;
        ctx.stroke();
        if (red) {
          ctx.fillStyle = `rgba(180,0,0,${alpha * 0.3})`;
          ctx.fill();
        }
      };

      // ── CIRCUIT TRACES ──
      interface Trace {
        x: number; y: number; dx: number; dy: number;
        len: number; maxLen: number; alpha: number;
        speed: number; nodes: { x: number; y: number }[];
        done: boolean; red: boolean;
      }
      const traces: Trace[] = [];
      const addTrace = (): void => {
        const side = Math.floor(Math.random() * 4);
        let x = 0, y = 0, dx = 0, dy = 0;
        if (side === 0) { x = Math.random() * W(); y = 0; dy = 1; }
        else if (side === 1) { x = W(); y = Math.random() * H(); dx = -1; }
        else if (side === 2) { x = Math.random() * W(); y = H(); dy = -1; }
        else { x = 0; y = Math.random() * H(); dx = 1; }
        traces.push({
          x, y, dx, dy, len: 0,
          maxLen: 120 + Math.random() * 300,
          alpha: 0.7 + Math.random() * 0.3,
          speed: 2.5 + Math.random() * 3.5,
          nodes: [{ x, y }], done: false,
          red: Math.random() > 0.4,
        });
      };
      for (let i = 0; i < 20; i++) addTrace();

      // ── PULSE RINGS ──
      interface Ring {
        x: number; y: number; r: number; maxR: number;
        alpha: number; speed: number; red: boolean;
      }
      const rings: Ring[] = [];
      const addRing = (): void => {
        rings.push({
          x: W() * 0.2 + Math.random() * W() * 0.7,
          y: H() * 0.1 + Math.random() * H() * 0.8,
          r: 0, maxR: 150 + Math.random() * 200,
          alpha: 0.8, speed: 1.5 + Math.random() * 2,
          red: Math.random() > 0.4,
        });
      };
      for (let i = 0; i < 3; i++) addRing();

      // ── DATA NODES ──
      interface Node {
        x: number; y: number; vx: number; vy: number;
        r: number; pulse: number;
      }
      const nodes2: Node[] = Array.from({ length: 60 }, () => ({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
      }));

      // ── CORNER DECO ──
      const drawCorner = (x: number, y: number, fx: boolean, fy: boolean): void => {
        const s = 30, sx = fx ? -1 : 1, sy = fy ? -1 : 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + sx * s, y); ctx.lineTo(x, y); ctx.lineTo(x, y + sy * s);
        ctx.stroke();
        // Red dot
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#CC0000'; ctx.fill();
        // Outer tick
        ctx.strokeStyle = 'rgba(204,0,0,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + sx * (s + 8), y); ctx.lineTo(x + sx * (s + 16), y);
        ctx.moveTo(x, y + sy * (s + 8)); ctx.lineTo(x, y + sy * (s + 16));
        ctx.stroke();
      };

      let frame = 0;
      let lastRing = 0;
      let lastTrace = 0;

      const draw = (): void => {
        frame++;
        const w = W(), h = H();

        // Trail fade
        ctx.fillStyle = 'rgba(8,8,8,0.14)';
        ctx.fillRect(0, 0, w, h);

        // ── HEX GRID ──
        hexes.forEach(hex => {
          hex.alpha += (hex.target - hex.alpha) * 0.04;
          if (Math.abs(hex.alpha - hex.target) < 0.002) hex.target = Math.random() * 0.25;
          const dx = hex.x - this.mouse.x;
          const dy = hex.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const boost = dist < 120 ? (1 - dist / 120) * 0.5 : 0;
          drawHex(hex.x, hex.y, hexSize, hex.alpha + boost, dist < 60);
        });

        // ── MATRIX RAIN ──
        ctx.font = `bold ${fontSize}px monospace`;
        for (let i = 0; i < cols; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Bright head
          ctx.fillStyle = 'rgba(255,40,40,0.95)';
          ctx.fillText(char, x, y);

          // Trail 1
          if (drops[i] > 1) {
            ctx.fillStyle = 'rgba(200,0,0,0.5)';
            ctx.fillText(matrixChars[Math.floor(Math.random() * matrixChars.length)], x, y - fontSize);
          }
          // Trail 2
          if (drops[i] > 2) {
            ctx.fillStyle = 'rgba(150,0,0,0.3)';
            ctx.fillText(matrixChars[Math.floor(Math.random() * matrixChars.length)], x, y - fontSize * 2);
          }
          // Trail 3
          if (drops[i] > 3) {
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fillText(matrixChars[Math.floor(Math.random() * matrixChars.length)], x, y - fontSize * 3);
          }

          if (y > h && Math.random() > 0.96) drops[i] = Math.random() * -30;
          drops[i] += 0.1;
        }

        // ── CIRCUIT TRACES ──
        if (frame - lastTrace > 20) { addTrace(); lastTrace = frame; }

        traces.forEach(t => {
          if (t.done) return;
          t.len += t.speed;

          // Random 90deg turn
          if (t.len > 40 && Math.random() < 0.02) {
            const turns = t.dx === 0
              ? [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }]
              : [{ dx: 0, dy: 1 }, { dx: 0, dy: -1 }];
            const turn = turns[Math.floor(Math.random() * 2)];
            t.dx = turn.dx; t.dy = turn.dy;
            t.nodes.push({ x: t.x, y: t.y });
          }

          t.x += t.dx * t.speed;
          t.y += t.dy * t.speed;

          if (t.len >= t.maxLen || t.x < 0 || t.x > w || t.y < 0 || t.y > h) {
            t.done = true; return;
          }

          const last = t.nodes[t.nodes.length - 1];

          // Main line
          ctx.beginPath();
          ctx.moveTo(last.x, last.y); ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = t.red ? `rgba(220,0,0,${t.alpha})` : `rgba(255,255,255,${t.alpha * 0.6})`;
          ctx.lineWidth = t.red ? 1.5 : 1;
          ctx.stroke();

          // Head glow
          const hg = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 16);
          hg.addColorStop(0, t.red ? `rgba(255,60,60,${t.alpha})` : `rgba(255,255,255,${t.alpha})`);
          hg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(t.x, t.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = hg; ctx.fill();

          // Node dots at turns
          t.nodes.forEach(n => {
            ctx.beginPath(); ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = t.red ? `rgba(255,80,80,${t.alpha})` : `rgba(255,255,255,${t.alpha * 0.8})`;
            ctx.fill();
          });
        });

        for (let i = traces.length - 1; i >= 0; i--) {
          if (traces[i].done) traces.splice(i, 1);
        }

        // ── DATA NODES + CONNECTIONS ──
        nodes2.forEach(n => {
          n.x += n.vx; n.y += n.vy; n.pulse += 0.04;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          const dx = n.x - this.mouse.x;
          const dy = n.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) { n.x += (dx / dist) * 2.5; n.y += (dy / dist) * 2.5; }
        });

        for (let i = 0; i < nodes2.length; i++) {
          for (let j = i + 1; j < nodes2.length; j++) {
            const dx = nodes2[i].x - nodes2[j].x;
            const dy = nodes2[i].y - nodes2[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(nodes2[i].x, nodes2[i].y);
              ctx.lineTo(nodes2[j].x, nodes2[j].y);
              ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.6; ctx.stroke();
            }
          }
        }

        nodes2.forEach(n => {
          const p = Math.sin(n.pulse) * 0.35 + 0.65;
          // Glow
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
          g.addColorStop(0, `rgba(204,0,0,${0.3 * p})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
          // Core
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,60,60,${0.95 * p})`; ctx.fill();
        });

        // ── PULSE RINGS ──
        if (frame - lastRing > 60) { addRing(); lastRing = frame; }
        rings.forEach((ring, idx) => {
          ring.r += ring.speed;
          ring.alpha = 0.6 * (1 - ring.r / ring.maxR);
          // Outer ring
          ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = ring.red ? `rgba(220,0,0,${ring.alpha})` : `rgba(255,255,255,${ring.alpha * 0.7})`;
          ctx.lineWidth = ring.red ? 1.5 : 1; ctx.stroke();
          // Inner ring
          if (ring.r > 30) {
            ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r * 0.6, 0, Math.PI * 2);
            ctx.strokeStyle = ring.red ? `rgba(255,80,80,${ring.alpha * 0.4})` : `rgba(204,0,0,${ring.alpha * 0.5})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
          if (ring.r >= ring.maxR) rings.splice(idx, 1);
        });

        // ── SCANNER ──
        const scanY = (frame * 1.2) % (h * 2);
        const sy = scanY > h ? h * 2 - scanY : scanY;
        const sg = ctx.createLinearGradient(0, sy - 50, 0, sy + 50);
        sg.addColorStop(0, 'rgba(204,0,0,0)');
        sg.addColorStop(0.5, 'rgba(204,0,0,0.08)');
        sg.addColorStop(1, 'rgba(204,0,0,0)');
        ctx.fillStyle = sg; ctx.fillRect(0, sy - 50, w, 100);
        ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy);
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 1; ctx.stroke();

        // ── CORNERS ──
        drawCorner(24, 24, false, false);
        drawCorner(w - 24, 24, true, false);
        drawCorner(24, h - 24, false, true);
        drawCorner(w - 24, h - 24, true, true);

        // ── CROSSHAIR ──
        if (this.mouse.x > 10 && this.mouse.y > 10) {
          const cx = this.mouse.x, cy = this.mouse.y, cs = 20;
          ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx - cs, cy); ctx.lineTo(cx - 6, cy);
          ctx.moveTo(cx + 6, cy); ctx.lineTo(cx + cs, cy);
          ctx.moveTo(cx, cy - cs); ctx.lineTo(cx, cy - 6);
          ctx.moveTo(cx, cy + 6); ctx.lineTo(cx, cy + cs);
          ctx.stroke();
          ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(204,0,0,1)'; ctx.fill();
          ctx.beginPath(); ctx.arc(cx, cy, cs, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(204,0,0,0.25)'; ctx.lineWidth = 1; ctx.stroke();
        }

        // ── VIGNETTE ──
        const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.9);
        vig.addColorStop(0, 'rgba(8,8,8,0)');
        vig.addColorStop(1, 'rgba(8,8,8,0.85)');
        ctx.fillStyle = vig; ctx.fillRect(0, 0, w, h);

        this.animationId = requestAnimationFrame(draw);
      };

      draw();
    }, 50);
  }
}