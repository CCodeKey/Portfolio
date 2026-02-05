import { useEffect } from "react";
import "./MyPage.css";

export default function MyPage() {

  useEffect(() => {
    // Carregar ícones Lucide
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lucide@latest";
    script.onload = () => {
      window.lucide.createIcons();
    };
    document.body.appendChild(script);

    // Relógio
    function updateClock() {
      const now = new Date();
      const clock = document.getElementById("clock");
      if (clock) clock.innerText = now.toLocaleTimeString();
    }
    const interval = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(interval);
  }, []);

  function openWindow(id) {
    const win = document.getElementById(id);
    if (win) {
      win.style.display = "flex";
      win.style.zIndex = Date.now();
    }
  }

  function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = "none";
  }

  return (
    <>
      <div id="desktop">
        <div className="desktop-icon" onClick={() => openWindow("win-about")}>
          <i data-lucide="user" size="42"></i>
          <span>/about</span>
        </div>

        <div className="desktop-icon" onClick={() => openWindow("win-projects")}>
          <i data-lucide="folder-code" size="42"></i>
          <span>/projects</span>
        </div>

        <div className="desktop-icon" onClick={() => openWindow("win-skills")}>
          <i data-lucide="cpu" size="42"></i>
          <span>/skills</span>
        </div>

        <div className="desktop-icon" onClick={() => openWindow("win-contact")}>
          <i data-lucide="terminal" size="42"></i>
          <span>/contact</span>
        </div>
      </div>

      {/* ABOUT WINDOW */}
      <div id="win-about" className="window" style={{ top: "10%", left: "20%", width: "500px" }}>
        <div className="win-header">
          <div className="win-title">System Information: /about</div>
          <div className="win-controls">
            <div className="dot dot-close" onClick={() => closeWindow("win-about")}></div>
          </div>
        </div>
        <div className="win-body">
          <h2>Gabriel Tertuliano</h2>
          <p><strong>Formação:</strong> Técnico e Graduando em ADS pelo IFPB.</p>
          <p><strong>Experiência:</strong> Egresso do LaISER-IFPB, focado em arquitetura de alto desempenho e integração contínua.</p>
        </div>
      </div>

      <footer id="taskbar">
        <div className="start-btn">
          <i data-lucide="command" size="20"></i>
          <span>Gabriel Tertuliano</span>
        </div>
        <div id="clock" className="time">00:00:00</div>
      </footer>
    </>
  );
}
