function atualizarEstadoBotaoCopiar(criptografando) {
    var btnCopiar = document.getElementById('btn-copiar');
    
    if (criptografando) {
        btnCopiar.style.display = 'block';
    } else {
        btnCopiar.style.display = 'block'; 
    }
}

function toggleText(criptografar) {
    var imagem = document.getElementById('aside-image');
    var texto = document.getElementById('texto');
    var resultado = document.getElementById('resultado');
    var resultDescript = document.getElementById('result-descript');
    var btnCopiar = document.getElementById('btn-copiar');

    if (criptografar) {
        if (texto.value.trim() === '') {
            alert('Por favor, digite algum texto antes de criptografar.');
            return;
        }

        if (/^[\A-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]*$/.test(texto.value)) {
            alert('Apenas letras minúsculas são permitidas.');
            return;
        }
    }

    if (imagem.style.display !== 'none' || !criptografar) {
        var textoDigitado = texto.value;

        if (criptografar) {
            var resultadoTexto = criptografarDescriptografar(textoDigitado);
            resultado.innerText = resultadoTexto;
            resultado.style.display = 'block';
            resultDescript.innerText = '';
            imagem.style.display = 'none';
            texto.style.display = 'none';
        } else {
            var resultadoDescriptTexto = descriptografarTexto(textoDigitado);

            resultDescript.innerText = resultadoDescriptTexto;
            resultDescript.style.display = 'block';
            texto.value = '';
            resultado.innerText = '';
        }
    } else {
        imagem.style.display = 'none';
        texto.style.display = 'block';
    }
    atualizarEstadoBotaoCopiar(criptografar);
}


function criptografarDescriptografar(texto) {

    var chaveCriptografia = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    var textoCriptografado = '';

    for (var i = 0; i < texto.length; i++) {
        var letra = texto[i];
        if (chaveCriptografia.hasOwnProperty(letra)) {
            textoCriptografado += chaveCriptografia[letra];
        } else {
            textoCriptografado += letra;
        }
    }

    return textoCriptografado;
}

function descriptografarTexto(textoCriptografado) {
    var chaveDescriptografia = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    var textoDescriptografado = '';

    var palavras = textoCriptografado.split(' ');

    for (var i = 0; i < palavras.length; i++) {
        var palavra = palavras[i];

        if (chaveDescriptografia.hasOwnProperty(palavra)) {
            textoDescriptografado += chaveDescriptografia[palavra];
        } else {
            textoDescriptografado += palavra;
        }
        textoDescriptografado += ' ';
    }

    return textoDescriptografado.trim(); 
}

function copiarTexto() {
    var resultado = document.getElementById('resultado');
    var resultDescript = document.getElementById('result-descript');
    var textoCopiado = resultado.innerText || resultDescript.innerText;

    navigator.clipboard.writeText(textoCopiado)
        .then(() => {
            alert('Texto copiado para a área de transferência!');
            location.reload();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((error) => {
            console.error('Erro ao copiar texto: ', error);
            alert('Erro ao copiar texto. Por favor, tente novamente.');
        });
}
