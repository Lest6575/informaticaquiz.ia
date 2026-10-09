
const perguntas = [
    {
        pergunta: "Como a inteligência artificial pode ajudar um estudante?",
        alternativas: [
            "Substituindo completamente os professores",
            "Explicando conteúdos de diferentes maneiras",
            "Garantindo notas altas sem estudar",
            "Eliminando a necessidade de ler"
        ],
        correta: 1,
        explicacao: "A IA pode explicar conteúdos de formas diferentes e ajudar o aluno a compreender assuntos difíceis."
    },
    {
        pergunta: "Qual é um risco de usar IA para fazer todas as tarefas escolares?",
        alternativas: [
            "Aprender a pesquisar melhor",
            "Conhecer novas ferramentas",
            "Deixar de praticar o próprio raciocínio",
            "Receber explicações adicionais"
        ],
        correta: 2,
        explicacao: "Quando o aluno depende da IA para tudo, pode perder oportunidades de desenvolver o próprio raciocínio."
    },
    {
        pergunta: "Podemos confiar em todas as respostas de uma IA?",
        alternativas: [
            "Sim, ela sempre está correta",
            "Sim, porque consulta apenas fontes oficiais",
            "Não, suas respostas podem conter erros",
            "Não, ela nunca fornece informações úteis"
        ],
        correta: 2,
        explicacao: "A IA pode produzir informações incorretas. Por isso, é importante verificar os dados em fontes confiáveis."
    },
    {
        pergunta: "Qual é a maneira mais responsável de usar IA nos estudos?",
        alternativas: [
            "Copiar todas as respostas",
            "Usá-la como apoio e verificar as informações",
            "Evitar pensar nas questões",
            "Entregar trabalhos sem ler o conteúdo"
        ],
        correta: 1,
        explicacao: "A IA funciona melhor como ferramenta de apoio, enquanto o estudante continua pensando, aprendendo e verificando as informações."
    },
    {
        pergunta: "A inteligência artificial pode substituir totalmente o papel do professor?",
        alternativas: [
            "Sim, em todas as situações",
            "Sim, porque não comete erros",
            "Não, o professor também orienta e acompanha os alunos",
            "Não, porque a IA não pode explicar conteúdos"
        ],
        correta: 2,
        explicacao: "O professor oferece orientação, acompanha o desenvolvimento dos alunos e compreende contextos humanos que vão além de fornecer informações."
    }
];

const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const contadorEl = document.getElementById("contador");
const pontuacaoEl = document.getElementById("pontuacao");
const feedbackEl = document.getElementById("feedback");
const barraEl = document.getElementById("barra-preenchida");
const proximoBtn = document.getElementById("botao-proximo");

let indice = 0;
let pontos = 0;
let respondida = false;

document.getElementById("botao-iniciar").addEventListener("click", iniciarQuiz);
proximoBtn.addEventListener("click", proximaPergunta);
document.getElementById("botao-reiniciar").addEventListener("click", iniciarQuiz);

function iniciarQuiz() {
    indice = 0;
    pontos = 0;

    inicio.classList.add("escondido");
    resultado.classList.add("escondido");
    quiz.classList.remove("escondido");

    mostrarPergunta();
    quiz.scrollIntoView({ behavior: "smooth", block: "start" });
}

function mostrarPergunta() {
    respondida = false;

    const atual = perguntas[indice];

    contadorEl.textContent =
        `Pergunta ${indice + 1} de ${perguntas.length}`;

    pontuacaoEl.textContent = `Pontos: ${pontos}`;

    perguntaEl.textContent = atual.pergunta;
    feedbackEl.textContent = "";
    proximoBtn.classList.add("escondido");

    barraEl.style.width =
        `${(indice / perguntas.length) * 100}%`;

    alternativasEl.replaceChildren();

    atual.alternativas.forEach((texto, i) => {
        const botao = document.createElement("button");

        botao.className = "alternativa";
        botao.textContent = texto;

        botao.addEventListener("click", () => responder(i));

        alternativasEl.appendChild(botao);
    });
}

function responder(escolha) {
    if (respondida) return;

    respondida = true;

    const atual = perguntas[indice];
    const botoes = alternativasEl.querySelectorAll("button");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === atual.correta) {
            botao.classList.add("correta");
        }

        if (i === escolha && escolha !== atual.correta) {
            botao.classList.add("errada");
        }
    });

    if (escolha === atual.correta) {
        pontos++;
        feedbackEl.textContent = "Resposta correta! " + atual.explicacao;
    } else {
        feedbackEl.textContent = "Resposta incorreta. " + atual.explicacao;
    }

    pontuacaoEl.textContent = `Pontos: ${pontos}`;

    proximoBtn.textContent =
        indice === perguntas.length - 1
            ? "Ver resultado →"
            : "Próxima pergunta →";

    proximoBtn.classList.remove("escondido");
}

function proximaPergunta() {
    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    quiz.classList.add("escondido");
    resultado.classList.remove("escondido");

    barraEl.style.width = "100%";

    document.getElementById("titulo-resultado").textContent =
        `${pontos} de ${perguntas.length} acertos!`;

    let mensagem;

    if (pontos === perguntas.length) {
        mensagem = "Excelente! Você demonstrou conhecer bem os benefícios e os riscos da IA na educação.";
    } else if (pontos >= 3) {
        mensagem = "Bom trabalho! Você conhece vários aspectos do uso da IA, e ainda pode aprender mais.";
    } else {
        mensagem = "Esse é um assunto que vale explorar! A IA oferece oportunidades, mas também exige cuidado e senso crítico.";
    }

    document.getElementById("texto-resultado").textContent = mensagem;

    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.getElementById("botao-inicio").addEventListener("click", () => {
    resultado.classList.add("escondido");
    quiz.classList.add("escondido");
    inicio.classList.remove("escondido");

    inicio.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});