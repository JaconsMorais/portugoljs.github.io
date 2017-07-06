const ifTip = `se <condição> entao
	<bloco_instruções>
[senao	<bloco_instruções>]`;

const forTip = `para i de 0 ate n passo 2 faca
inicio
	x := i div 2
	se x
fim`;
const forTip2 = `-	A palavra passo é opcional e especifica o valor de incremento de cada iteração, caso seja omitida o incremento será unitário.
-		Os tipos da variável inicial, valor da expressão inicial, valor da expressão final e passo devem ser iguais.
-		Caso exista apenas uma linha de instrução no laço, as palavras inicio e fim podem ser omitidas.
-		Para realizar o decremento da variável, utilize o caractere de negativação - no passo.`;

const whileTip = `ESTRUTURA DE REPETIÇÃO ENQUANTO
Especificação:
enquanto <expr> faca
<bloco_de_instruções>`;

const untilTip = `ESTRUTURA DE REPETIÇÃO REPITA
Especificação:
repita
	{<instruções>}
ate <expr>`;

const caseTip = `ESTRUTURA DE DECISÃO CASO
Especificação:
caso (<expr>) de
	{<rótulo>{, <rótulo>}: <bloco_de_instruções>}
	[senao <bloco_de_instruções>]
fim`;
