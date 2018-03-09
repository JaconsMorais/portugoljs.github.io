### Estruturas de controle

As estruturas de controle são a base da programação atual, o controle de saltos e loops com base na avaliação de expressões serve para implementar os diversos algoritmos atuais, o compilador Portugol JS suporta as estruturas de repetição
para, enquanto e repita além das estruturas de decisão se e caso, segue abaixo as informações e notações EBNF da sintaxe das estruturas.

#### Estrutura para

A estrutura **para** é utilizada para loops em sequência com inicio e fim conhecidos, é possível fazer iterações positivas ou negativas, caso o valor de **passo** seja omitido o compilador irá entender que as iterações são positivas em 1(uma) unidade.

Notação EBNF:

**para** \<var\> **de** \<expressão\> **ate** \<expressão\> [passo \<valor\>] **faca**
 \<bloco_instruções\>
 
 #### Estrutura repita
 
 A estrutura **repita** repete o bloco de código até que a condição apresentada seja verdadeira, ao contrário da estrutura **para** onde o bloco de código pode não ser executado, na estrutura **repita**
 sempre irá executar o bloco de código ao menos uma vez, pois a avaliação da expressão se encontra ao final.
 
 Notação EBNF:
 
**repita**
 { \< instrução \> }+
**ate** (\< expressão \>)

#### Estrutura enquanto

A estrutura **enquanto** repete um bloco de código até que a expressão avaliada seja falsa.

Notação EBNF: 

 **enquanto** \<expressão\> **faca**
 \<bloco_instruções\>
 
 #### Estrutura se
 
 A estrutura **se** desvia um trecho de código de acordo com a avaliação de expressão, é possível aninhar várias estruturas uma dentro da outra, caso a expressão retorne
 o valor **verdadeiro** o primeiro bloco de código será executado, caso a expressão retorne um valor **falso** e exista uma estrutura **senao** então o segundo bloco de código será executado.
 
 Notação EBNF:
 
**se** \<condição\> **entao**
\<bloco_instruções\>
[**senao** \<bloco_instruções\>]

#### Estrutura caso

A estrutura **caso** avalia o valor presente em uma determinada
expressão e compara com rótulos (valores literais dos tipos inteiro, caractere ou lógico) especificados pelo programador, caso o valor resultante na expressão analisada seja
igual ao valor de um destes rótulos, o bloco de instruções do rótulo é executado. É possível definir um rótulo genérico para ser executado caso nenhum dos rótulos declarados contenha o valor da expressão através da palavra **senao**.

É possível definir mais de um rótulo para um mesmo bloco de código no entanto não é permitido repetir rótulos.
Notação EBNF:

**caso** (\<expressão\>) **de**
 {\<rótulo\>{,\<rótulo\>}: \<bloco_instruções\>}
 **senao** \<bloco_instruções\>
 **fim**
