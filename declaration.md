<br>

### Declarações

É obrigatória a declaração de todos os identificadores utilizados no algoritmo no cabeçalho do código, as variavéis, constantes, tipos de dados e subprogramas podem ser declaradas da seguinte forma:
* Constantes 
<br>**const**    <tb>{\<identificador\> = \<valor_literal\>}+
* Tipos de dados <br>
**tipo**
  <u>{\<identificador\> = \<tipo\>}+
* Variáveis <br>
**var**
  { \<identificador\> + { , \<identificador\> } : \<tipo\>}+
* Subprogramas  <br> 
[ **procedimento** | **funcao** ] [ ( [ ref ] \<identificador\> { , \<identificador\>} : \<tipo\> + { ; [ ref ] \<identificador\> {,\<identificador\>} : \<tipo\>} ) ] [ : \<tipo\> ]
    \< declarações \>
    **inicio**
      \< instruções \>
     **fim**

<br>
