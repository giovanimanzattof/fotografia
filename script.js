const toggles = document.querySelectorAll('.port')

toggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        submenu.classList.toggle('show');
    });
});

const submenulink = document.querySelectorAll('span a')
submenulink.forEach(link => {
    link.addEventListener('click', e => {
        link.parentElement.classList.remove('show');
    });
});

const totalImages = 167;
let currentIndex = 0;
const imageContainer = document.getElementById('photo');
const counter = document.getElementById('counter');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Função para formatar o número da imagem (sem zeros à esquerda)
function formatImageNumber(num) {
    return num.toString(); // Sem zeros à esquerda
}

// Função para atualizar a imagem exibida
function updateImage() {
    const imageName = `fotos/foto${formatImageNumber(currentIndex + 1)}.JPG`;
    imageContainer.src = imageName;
    counter.textContent = `Imagem ${currentIndex + 1} de ${totalImages}`;

    // Atualiza os estados dos botões
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalImages - 1;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages; // Volta para 0 quando chega ao fim
    updateImage();
}


// Função para ir para a imagem anterior
function previousImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Vai para o fim se estiver no início
    updateImage();
}

// Função para carregar a primeira imagem ao iniciar
function initialize() {
    counter.textContent = 'Carregando...';
    // Primeiro tenta carregar a imagem
    const tempImg = new Image();
    tempImg.onload = function () {
        updateImage();
    };
    tempImg.onerror = function () {
        counter.textContent = 'Erro ao carregar imagens. Verifique se a pasta "fotos" existe e contém as imagens.';
        imageContainer.src = 'https://placehold.co/600x400?text=Erro+ao+Carregar+Imagens';
    };
    tempImg.src = `fotos/foto1.JPG`; // Nome correto sem zeros à esquerda
}

// Adiciona suporte para teclas de seta
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        previousImage();
    }
});

// Inicializa o visualizador
initialize();

const btnAgendar = document.getElementById('btnAgendar');

btnAgendar.addEventListener('click', () => {
    const temaNumero = currentIndex + 1;
    const mensagem = `Gostaria de fazer o acompanhamento mensal com o tema ${temaNumero}`;

    // Você pode redirecionar para o WhatsApp com a mensagem ou mostrar um alerta
    const url = `https://wa.me/551934638925?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
});
