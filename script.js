let is24Hour = true;

// Crear marcas y números del dial
function createClockDial() {
    const ticksDial = document.getElementById('ticks-dial');
    const minutesDial = document.getElementById('minutes-dial');
    const radiusTicks = 320;
    const radiusNum = 270;
    const center = 350;

    // Crear 60 marcas
    for (let i = 0; i < 60; i++) {
        const angle = (i * 6) * (Math.PI / 180);
        const tick = document.createElement('div');
        tick.className = `tick ${i % 5 === 0 ? 'major' : ''}`;
        
        const x = center + radiusTicks * Math.cos(angle);
        const y = center + radiusTicks * Math.sin(angle);
        
        tick.style.left = `${x}px`;
        tick.style.top = `${y}px`;
        tick.style.transform = `rotate(${i * 6 + 90}deg)`;
        ticksDial.appendChild(tick);
    }

    // Crear números cada 5 minutos
    for (let i = 0; i < 60; i += 5) {
        const angle = (i * 6) * (Math.PI / 180);
        const num = document.createElement('div');
        num.className = 'minute-num';
        num.innerText = i.toString().padStart(2, '0');
        
        const x = center + radiusNum * Math.cos(angle) - 15;
        const y = center + radiusNum * Math.sin(angle) - 15;
        
        num.style.left = `${x}px`;
        num.style.top = `${y}px`;
        num.style.transform = `rotate(${i * 6}deg)`;
        minutesDial.appendChild(num);
    }
}

// Actualizar la hora en tiempo real
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (!is24Hour) {
        hours = hours % 12 || 12;
    }

    document.getElementById('hour').innerText = hours.toString().padStart(2, '0');

    // Rotación del dial
    const minuteAngle = -(minutes * 6 + (seconds / 60) * 6);
    document.getElementById('minutes-dial').style.transform = `rotate(${minuteAngle}deg)`;
    document.getElementById('ticks-dial').style.transform = `rotate(${minuteAngle}deg)`;

    // Formato de fecha
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    
    const dateString = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById('date-str').innerText = dateString;
    document.getElementById('day-str').innerText = days[now.getDay()];
}

function toggleFormat() {
    is24Hour = !is24Hour;
    document.getElementById('format-label').innerText = is24Hour ? '24H' : '12H';
    updateClock();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Inicialización
createClockDial();
updateClock();
setInterval(updateClock, 1000);