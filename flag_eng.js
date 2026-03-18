const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const styles = getComputedStyle(document.documentElement);
const greenColor = styles.getPropertyValue('--green').trim();
const slateColor = styles.getPropertyValue('--slate').trim();

const largura = 32;
const altura = 24;
const padding = 10;
const startX = (canvas.width - 2*largura - padding)/2;
const startY = (canvas.height - altura)/2;

const uk = {x: startX, y: startY, width: largura, height: altura};
const portugal = {x: startX + largura + padding, y: startY, width: largura, height: altura};

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
}

function bandeiraUK(x, y, width, height) {
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = greenColor;
    ctx.fillStyle = greenColor;
    roundedRect(ctx, x, y, width, height, 4);

    ctx.beginPath();
    ctx.moveTo(x + width/2, y);
    ctx.lineTo(x + width/2, y + height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + height/2);
    ctx.lineTo(x + width, y + height/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
}

function bandeiraPortugal(x, y, width, height, hover=false) {
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = hover ? greenColor : slateColor;
    roundedRect(ctx, x, y, width, height, 4);

    const separacao = x + width*0.4;
    ctx.beginPath();
    ctx.moveTo(separacao, y);
    ctx.lineTo(separacao, y + height);
    ctx.stroke();

    const centroX = separacao;
    const centroY = y + height/2;
    const raio = Math.min(width, height)*0.2;
    ctx.beginPath();
    ctx.arc(centroX, centroY, raio, 0, Math.PI*2);
    ctx.fillStyle = slateColor;
    ctx.fill();
}

function drawAll(mouseOverPortugal=false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bandeiraUK(uk.x, uk.y, uk.width, uk.height);
    bandeiraPortugal(portugal.x, portugal.y, portugal.width, portugal.height, mouseOverPortugal);
}

drawAll();

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const overPortugal = mouseX >= portugal.x && mouseX <= portugal.x + portugal.width &&
                         mouseY >= portugal.y && mouseY <= portugal.y + portugal.height;

    drawAll(overPortugal);
    canvas.style.cursor = overPortugal ? 'pointer' : 'default';
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX >= portugal.x && mouseX <= portugal.x + portugal.width &&
        mouseY >= portugal.y && mouseY <= portugal.y + portugal.height) {
        window.location.href = 'index.html';
    }
});
