function compiladorPascalS(){
  if(lastCompiledCode == GetHashCode(InputFile) && isDone)  return;
  lastCompiledCode = GetHashCode(InputFile);
  InputFile = InputFile.split("\n");
  indexmax = InputFile.length;
  function Error2(code){
    var k, Msg = [];
    Msg[0] = "Identificador \'"+id+"\' não reconhecido."; Msg[1] = "Declarações múltiplas não são permitidas.";
    Msg[2] = "Está faltando um identificador."; Msg[3] = "Está faltando a palavra reservada \'programa\' no inicio do código." ;
    Msg[4] = "Está faltando o delimitador \')\'."; Msg[5] = "Está faltando o caractere \':\'.";
    Msg[6] = "Erro de sintaxe."; Msg[7] = "O ponto e vírgula não é necessário ao final da instrução.";
    Msg[8] = "Está faltando a palavra reservada \'de\'."; Msg[9] = "Está faltando o delimitador \'(\'.";
    Msg[10] = ""; Msg[11] = "está faltando o delimitador \'[\'.";
    Msg[12] = "Está faltando o delimitador \']\'."; Msg[13] = "Está faltando os caracteres \'..\' para especificar o intervalo do arranjo.";
    Msg[14] = "Está faltando o ponto e vírgula."; Msg[15] = "Tipo de retorno de função não suportado.";
    Msg[16] = "Está faltando o caractere \'=\'."; Msg[17] = "A expressão precisa retornar como resultado um valor lógico.";
    Msg[18] = "Tipo de dado da variável não suportado pela instrução \'para\'."; Msg[19] = "O tipo dos valores de inicio, fim e passo da instrução \'para\' precisam ser iguais ao tipo da variavel inicial.";
    Msg[20] = "Está faltando um identificador após a palavra reservada \'var\'."; Msg[21] = "Número muito grande.";
    Msg[22] = ""; Msg[23] = "Tipo de dado não suportado pela instrução \'caso\'.";
    Msg[24] = "Caracter \' "+line[cc-1]+" \' não reconhecido."; Msg[25] = "o identificador \'"+id+"\' precisa ser uma constante.";
    Msg[26] = "Este tipo de índice não é permitido para este arranjo."; Msg[27] = "Os limites inferior e superior deste arranjo estão irregulares.";
    Msg[28] = "A variável \'"+id+"\' não é do tipo arranjo nem string, você não pode utilizar colchetes."; Msg[29] = "O identificador "+id+" não é um tipo de dado.";
    Msg[30] = "Tipo indefinido."; Msg[31] = "A variável \'"+id+"\' que você está tentando acessar um atributo não é do tipo \'registro\'. ";
    Msg[32] = "Operadores lógicos como \'e\', \'ou\' e \'nao\' só podem ser usados com variáveis ou expressões que resultam em um dado do tipo lógico."; Msg[33] = "tipo de dado não permitido para expressões aritméticas.";
    Msg[34] = "A variável nessa expressão precisa ser do tipo \'inteiro\'."; Msg[35] = "tipo de dado não permitido para expressões relacionais.";
    Msg[36] = "Tipo do parametro incorreto."; Msg[37] = "O identificador "+id+" precisa ser uma variável.";
    Msg[38] = "A literal do tipo string não pode ser vazia."; Msg[39] = "Você está passando parametros não declarados nessa chamada.";
    Msg[40] = "Tipo de dado não suportado pela instrução \'leia\'."; Msg[41] = "Tipo de dado não suportado pela instrução \'escreva\'.";
    Msg[42] = ""; Msg[43] = "";
    Msg[44] = "Você não pode introduzir um procedimento em uma expressão"; Msg[45] = "o identificador não é uma variável.";
    Msg[46] = "Tipo incompatível para atribuição."; Msg[47] = "o tipo do rótulo na instrução \'caso\' é incompatível com a variável analisada.";
    Msg[48] = "Tipo de parametro incompatível para a função."; Msg[49] = "Pilha de execução muito pequena.";
    Msg[50] = "Constante  "; Msg[51] = "Está faltando o operador de atribuição \':=\'";
    Msg[52] = "Entao      "; Msg[53] = "Está faltando a palavra reservada \'ate\'.";
    Msg[54] = "Está faltando a palavra reservada \'faca\'."; Msg[55] = "";
    Msg[56] = "Identificador não permitido nesta posição"; Msg[57] = "Está faltando o delimitador de final de bloco de instruções \'fim\'.";
    Msg[58] = "É esperado a declaração de variáveis na declaração do procedimento/função após o caractere \'(\'."; Msg[59] = "O valor de índice de uma variável do tipo arranjo ou string precisa ser inteiro.";
    Msg[60] = "Operador aritmético não permitido para variáveis do tipo string.";
    Msg[61] = "Aribuições múltiplas não são permitidas para arranjos e strings.";
    Msg[62] = "Está faltando o "; Msg[63] = "O operador \'^\' só pode ser usado com variáveis do tipo ponteiro.";
    Msg[64] = "Você precisa informar um identificador na função \'aloca\'.";
    Msg[65] = "Você precisa informar um tipo ou uma variável para alocar memória.";
    Msg[66] = "Não é permitido introduzir ( e ) após o nome do programa.";
    Msg[67] = "O 1º parâmetro do procedimento \'strinsere\' deve ser do tipo string.";
    Msg[68] = "Você não pode utilizar o operador \'@\' e \'^\' ao mesmo tempo.";
    Msg[69] = "Programa incompleto";
    Msg[70] = "Os rótulos devem ser informados antes do senão na estrutura caso.";
    Msg[71] = "Você está tentando acessar um valor de retorno de um identificador que não é uma função.";
    Msg[72] = "A instrução \'retorna\' só pode ser utilizada em funções.";
    Msg[73] = "Tipo de retorno incompatível com a função.";
		Msg[74] = "Está faltando a palavra fim ao final da estrutura caso.";
    return Msg[code];
  }

  //FUNÇÃO DE BUSCA DE CARACTERES
  function NextCh(){
    try{
      if (InputFile[iln] == "")  iln++;
      if (iln >= indexmax && cc > ll){
        throw new Error(69);
      }
      if (cc == ll){
        if (errpos != 0)
        	errpos = 0;
        if (iln < indexmax){
          ll = 0;
          cc = 0;
          line = InputFile[iln];
          ilnx = iln;
          iln++;
          ll = line.length;
        }
      }
      if (cc < ll){
        ccx = cc;
        ch = line[cc];
        cc++;
      }
      else
        if(iln == indexmax){
          ch = "?";
          cc++;
        }
    }
    catch(err){
      isOk = false;
      MsgErro = err;
    }
  }
  //Função Error
  function Error(code, errorName, ref, lnError){
    try{
      debugger;
      if (isOk){
        var strError = Error2(code);
        var line;
        line = linecount;
        if(changed)
          line++;
        if(lnError != undefined)
          line = lnError;
        mostraErroNaLinha(line, strError);
        isOk = false;
        str = "";
        line++;
        str += "Um erro foi encontrado na linha "+line+": "+strError;
        switch(code){
          case 1:
          if (typeof errorName == "number")
            str += "\nO rótulo \'"+errorName+"\' da estrutura de decisão caso já foi declarado uma vez";
          else
            str += "\nO identificador \'"+errorName+"\' já foi declarado uma vez";
          break;
          case 2:
            switch (errorName) {
              case "progname":
                str += "\nVocê precisa atribuir um nome ao programa";
                str += "\nVeja um exemplo: "+"programa".bold()+" test()";
              break;
              case "leia":
                str = "Um erro foi encontrado na linha "+line+": "+strError;
                str += "\nVocê precisa informar uma variável como parametro para o procedimento \'leia\'";
              break;
              case functionsy:
                str += "\nVocê precisa atribuir um nome para o procedimento/função declarado.";
                str += "\nVeja um exemplo: "+InputFile[iln-1].slice(0, cc-2)+"exemplo"+InputFile[iln-1].slice(cc-2, InputFile[iln-1].length);
              break;
              case "ref":
                str += "\nA função/procedimento que você está chamando possui parametros por refência. Você precisa informar uma variável como parametro.";
              break;
              case colon:
                str += "\nEspera-se a identificação de uma variável após a vírgula. Para resolver o problema você pode:\n(a) Apagar a vírgula.\n(b) Informar uma nova variável.";
              break;
              case period:
                str += "\nVocê precisa informar um atributo do registro informado após o ponto. Para este registro existem os atributos:\n";
                ref = btab[tab[ref].ref].last;
                var strReg = "";
                do {
                  strReg = "\n"+tab[ref].name + strReg;
                  ref = tab[ref].link;
                } while(isOk && tab[ref].link != 0);
                strReg = tab[ref].name + strReg;
                str += strReg;
              break;
            }
          break;
          case 6:
            if (sy == ident){
              str += "\nO identificador \'"+id+"\' não é esperado nesta posição.";
            }
            else {
              if (ksy.indexOf(sy) != -1){
                var ky = ksy.indexOf(sy);
                str += "\nA palavra reservada \'"+key[ky]+"\' não é esperada nesta posição.";
              }
              else {
                if (xsps.indexOf(sy) != -1){
                  var ky = xsps.indexOf(sy);
                  str += "\nO operador \'"+csps[ky]+"\' não é esperado nesta posição.";
                }
              }
            }
            if (errorName.length != 0){
              str += "\nAs seguintes palavras são permitidas nesta posição: ";
              var Errorstr = "";
              if (errorName.indexOf(ident) != -1)
                Errorstr += "variáveis, ";
              errorName.forEach(function each(value, index, obj){
                if (ksy.indexOf(value) != -1){
                  Errorstr += key[ksy.indexOf(value)]+", ";
                }
                else{
                  if (xsps.indexOf(value) != -1){
                    Errorstr += nsps[xsps.indexOf(value)]+", ";
                  }
                }
              });
              str += Errorstr.slice(0, Errorstr.length-2);
            }
          break;
          case 15:
            limparCodeBox();
            line -= 1;
            mostraErroNaLinha(line-1, strError);
            str = "Um erro foi encontrado na linha "+line+": "+strError;
            str += "\nOs tipos suportados para retorno de função são: ";
            str += "inteiro, real, logico, caracter, string.";
          break;
          case 17:
          var tp = (errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":(errorName ==notyp)?"sem tipo":"";
            str += "\nA expressão avaliada está retornando o tipo "+tp+".";
          break;
          case 18:
            limparCodeBox();
            str = "Um erro foi encontrado na linha "+line+": "+"O tipo de dado da variável \'"+errorName+"\' não é suportado pela instrução \'para\'.";
            mostraErroNaLinha(line-1, str);
            str += "\nA instrução \'para\' suporta os seguintes tipos de dado: inteiro, real, caracter e logico";
          break;
          case 19:
          var tp = (errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == bools)?"logico":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":"";
            str += "\nA variável utilizada nessa estrutura é do tipo "+tp+".";
            if (tp == "real"){
              str += "\nCaso você esteja utilizando valores literais inteiros, pode convertê-los para real adicionando o caracter \'e\' ou \'.0\' ao final do valor. Por exemplo: \n";
              str += "para r de 0e ate 5e passo 2e faca\n";
              str += "para r de 0.0 ate 5.0 passo 2.0 faca";
            }
          break;
          case 23:
            str += "\nOs tipos de dados suportados são: inteiro, logico e caracter.";
          break;
          case 26:
          var tp = (errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == bools)?"logico":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":"";
            str += "\nO tipo permitido para o índice deste arranjo é "+tp+".";
          break;
          case 46:
            var type1 = (errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":(errorName ==notyp)?"sem tipo":(errorName == pointers)?"ponteiro":"";
            var type2 = (ref == ints)?"inteiro":(ref == reals)?"real":(ref == chars)?"caracter":(ref == strings)?"string":(ref == records)?"registro":(ref ==notyp)?"sem tipo":(ref == pointers)?"ponteiro":"";
            str += " Você está atribuindo um valor "+type2+" a uma variável "+type1+".";
          break;
          case 36:
            var tp = (errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == bools)?"logico":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":(errorName ==notyp)?"sem tipo":(errorName == pointers)?"ponteiro":"";
            var tpref  = (ref == ints)?"inteiro":(ref == reals)?"real":(ref == bools)?"logico":(ref == chars)?"caracter":(ref == strings)?"string":(ref == records)?"registro":(ref ==notyp)?"sem tipo":(ref == pointers)?"ponteiro":"";
            str += "\nEspera-se um parâmetro do tipo \'"+tpref+"\' mas você está passando um parâmetro do tipo \'"+tp+"\'";
          break;
          case 62:
            str += errorName+"º parâmetro.";
          break;
          case 63:
            str += " A variável informada é do tipo "+((errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == bools)?"logico":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":(errorName ==notyp)?"sem tipo":(errorName == pointers)?"ponteiro":"")+".";
          break;
          case 66:
            limparCodeBox();
            mostraErroNaLinha(linecount, strError);
            str = "Um erro foi encontrado na linha "+linecount+1+": "+strError;
          break;
          case 73:
            var tp = (errorName == ints)?"inteiro":(errorName == reals)?"real":(errorName == bools)?"logico":(errorName == chars)?"caracter":(errorName == strings)?"string":(errorName == records)?"registro":(errorName ==notyp)?"sem tipo":(errorName == pointers)?"ponteiro":"";
            var tpref  = (ref == ints)?"inteiro":(ref == reals)?"real":(ref == bools)?"logico":(ref == chars)?"caracter":(ref == strings)?"string":(ref == records)?"registro":(ref ==notyp)?"sem tipo":(ref == pointers)?"ponteiro":"";
            str += "Espera-se um retorno do tipo "+tpref+" mas você está retornando um valor do tipo "+tp+".";
          break;
        }

        MsgErro = str;
      }
    }
    catch(err){
      isOk = false;
      MsgErro = err;
    }
  }

  function fatal(n){
    var Msg = [];
    try{
      Msg[0] = "identificadores";   Msg[1] = "identificadores";
      Msg[2] = "procedimentos";   Msg[3] = "reais";
      Msg[4] = "arranjos";   Msg[5] = "niveis";
      Msg[6] = "o código";   Msg[7] = strings;
      MsgErro = "Tabela do compilador para "+ Msg[n] +" é muito pequena";
      isOk = false;
    }
    catch(err){
      isOk = false;
      MsgErro = err;
    }
  }

  function insymbol(){      //Lê o próximo simbolo
    var i, j, k, e;
    if(linecount < ilnx){
      if(changed){
				lineOfLastSymbol = linecount;
        linecount = ilnx;
        changed = false;
      }
      else
        changed = true;
    }
    charcount = ccx;
    function readscale(){
      var s, sign;
      try{
        NextCh();
        sign = 1;
        s = 0;
        if (ch == "+")
          NextCh();
        else {
          if (ch == "-"){
            NextCh();
            sign = -1;
          }
        }
        while(isOk && ch >= 0 && ch <= 9 && ch != " " && ch != "\t"){
          s = 10 * s + Number(ch);
          NextCh();
        }
        e = s * sign + e;
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }


    function AdjustScale(){
      var s, d, t;
      try{
        if ((k+e) > emax){
          Error("", "Número \'"+(k+e)+"\' é muito grande");          //Erro maximo expoente para numero real
        }
        else{
          if ((k+e) < emin)
            rnum = 0;
          else{
            s = Math.abs(e);
            t = 1.0;
            d = 10.0;
            do{
              while(isOk && (s%2) == 0){      //Verifica se é par
                s = s / 2;
                d = Math.pow(d,2);
              }
              s--;
              t = d * t;
            }while(isOk && s != 0);
            if(e >= 0)
              rnum = rnum * t;
            else
              rnum = rnum / t;
          }
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }
    try{
      while(isOk && (ch == " " || ch == "\t" || ch == "\n"))  //Pula espaços em branco
        NextCh();
      if(isLetter(ch) || ch == "_"){
        k = 0;
        id = "";
        do{
            k++;
            id += ch;
          NextCh();
          if (cc == 1 || !isOk)
            break;
        }while(isOk && isLetter(ch) || isNumber(ch) || ch == "_");
      i = key.indexOf(id.toLowerCase());
      if (i != -1)
        sy = ksy[i];
      else
        sy = ident;
    }
    else {
      if (isNumber(ch)){
        k = 0;
        inum = 0;
        sy = intcon;

        do{
          inum = inum * 10 + Number(ch);
          k++;
          NextCh();
          if(!isOk)
            break;
        }while(isOk && isNumber(ch));
        if(k > kmax || inum > nmax){
          Error(21);
          inum = 0;
          k = 0;
        }
        if (ch == "."){
          NextCh();
          if (ch == ".")
          ch = ":";
          else{
            sy = realcon;
            rnum = inum;
            e = 0;
            while(isOk && isNumber(ch)){
              e--;
              rnum = 10 * rnum + Number(ch);
              NextCh();
              if(!isOk)
                break;
            }
            if (ch == "e" && linecount == ilnx)
            readscale();
            if (e != 0)
            AdjustScale();
          }
        }
        else {
          if (ch == "e" && ilnx == linecount){
            sy = realcon;
            rnum = inum;
            e = 0;
            readscale();
            if (e != 0)
            AdjustScale();
          }
        }
      }
      else {
        switch (ch) {
          case ":":
          NextCh();
          if (ch == "="){
            sy = becomes;
            NextCh();
          }
          else
          sy = colon;
          break;
          case "<":
          NextCh();
          if (ch == "="){
            sy = leq;
            NextCh();
          }
          else
          if (ch == ">"){
            sy = neq;
            NextCh();
          }
          else
          sy = lss;
          break;
          case ">":
          NextCh();
          if (ch == "="){
            sy = geq;
            NextCh();
          }
          else
          sy = gtr;
          break;
          case ".":
          NextCh();
          if(ch == "."){
            sy = colon;
            NextCh();
          }
          else
          sy = period;
          break;
          case "\'":
          k = 0;
          do{
            NextCh();
            if (ch == "\'"){
              NextCh();
              if (ch != "\'")
              break;
            }
            if(ch == "\\"){
              var bar = ch;
              NextCh();
              if(ch != "\'"){
                if(ch == 'n'){
                  stab[sx+k] = String.fromCharCode(10);
                  k++;
                  continue;
                }
                else{
                  stab[sx+k] = bar;
                  k++;
                  continue;
                }
              }
            }
            if ((sx + k) == smax)
            fatal(7);
            stab[sx+k] = ch;
            k++;
            if (cc == 1)    //mudou de linha
            k = 0;
            if(!isOk)
              break;
          }while(isOk && cc != 1);
          if (k == 1){
            sy = charcon;
            inum = stab[sx].charCodeAt();
          }
          else
          if (k == 0){

            //Error(38);
            sy = stringsy;
            sleng = 1;
            stab[sx] = "";
            sx++;
          }
          else {
            sy = stringsy;
            inum = sx;
            sleng = k;
            sx += k;
          }
          break;
          case "(":
          NextCh();
          if (ch != "*")
            sy = lparent;
          else {    //Comentário
            NextCh();
            do{
              while(isOk && ch != "*"){
                NextCh();
                if(!isOk)
                  return;
              }
              NextCh();
            }while(isOk && ch != ")");
            NextCh();
            insymbol();
            return;
          }
          break;
          case " ":
          case "?":
          return;
          default:
          if (csps.indexOf(ch) != -1){
            sy = sps[ch];
            NextCh();
          }
          else{
            Error(24);
            NextCh();
            if (ch != "?")
              insymbol();
            return;
          }
        }
      }
    }
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//insymbol

function enter(x0, x1 = "nothing", x2, x3){
  try{
    t++;
    tab[t] = new Ttab;
    tab[t].name = x0;
    tab[t].link = t - 1;
    tab[t].obj = x1;
    tab[t].typ = x2;
    tab[t].xtyp = x2;
    tab[t].ref = 0;
    tab[t].normal = true;
    tab[t].lev = 0;
    tab[t].adr = x3;
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}

function EnterArray(tp, l, h){
  try{
    if (l > h)
      Error(27, l, h);
    if (Math.abs(l) > xmax || Math.abs(h) > xmax){
      Error(27, l, h);
      l = 0;
      h = 0;
    }
    if (a == amax)
      fatal(4);
    else{
      a++;
      atab[a] = new Tatab;
      atab[a].inxtyp = tp;
      atab[a].low = l;
      atab[a].high = h;
    }
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//enterarray

function EnterBlock(){
  try{
    if (b == bmax)
      fatal(2);
    else {
      b++;
      btab[b] = new Tbtab;
      btab[b].last = 0;
      btab[b].lastpar = 0;
    }
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//EnterBlock

function EnterReal(x){
  try{
    if(c2 == (c2max-1))
      fatal(3);
    else {
      rconst[c2+1] = x;
      c1 = 1;
      while(isOk && rconst[c1] != x)
        c1++;
      if(c1 > c2)
        c2 = c1;
    }
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}

function emit(line, fct){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].line = line;
    lc++;
    kode[lc] = new order;
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//emit

function emit1(line, fct, b){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].y = b;
    kode[lc].line = line;
    lc++;
    kode[lc] = new order;
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//emit1

function emit2(line, fct, a, b, c){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].x = a;
    kode[lc].y = b;
    kode[lc].z = c;
    kode[lc].line = line;
    lc++;
    kode[lc] = new order;
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//emit2


function block(fsys, isfun, level){
    var dx;   //quatidade de bytes usado no procedimento ou função
    var prt;  //ìndice em tab para o procedimento ou função
    var prb;  //indice em btab para o procedimento ou função
    var x;
    function skip(fsys, n, sx3){
      try{
        if (n == 6){
          sx3 = sx3.copy(fsys);
          Error(n, sx3);
        }
        else
          Error(n);
        insymbol();
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }
    function test(sx3 ,s1, s2, n){
      try{
        if (!(sy in s1)){
          skip(s2.copy(s1), n, sx3);
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }
    function TestSemicolon(){
      try{
        if(sy == semicolon)
          insymbol();
        else {
          Error(14);
          if (sy == comma || sy == colon)
            insymbol();
        }
        test(new ENUM(ident), blockbegsys.copy(ident), fsys, 6);
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//TestSemicolon
    function enter(id, k){
      try{
        var j, l;
        if (t == tmax)
          fatal(1);
        else {
          tab[0].name = id;
          j = btab[display[level]].last;
          l = j;
          while(isOk && tab[j].name != id)
            j = tab[j].link;
          if (j != 0)
            Error(1, tab[j].name);
          else {
            t++;
            tab[t] = new Ttab(id, l, k, notyp, notyp, 0, true, level, 0);
            btab[display[level]].last = t;
          }
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//enter

    function loc(id){
      var i, j;//Loalizador de ID na tabela
      try{
        i = level;
        tab[0].name = id;
        do{
          j = btab[display[i]].last;
          while(isOk && tab[j].name != id)
            j = tab[j].link;
          i--;
        }while(isOk && !((i < 0) || (j != 0)));
        if (j == 0)
          Error(0);
        return j;
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//loc

    function entervariable(){
      try{
        if (sy == ident){
          enter(id, variable);
          insymbol();
        }
        else{
          Error(2, colon);
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//entervariable

    function constant(fsys, c){
      var x, sign;
      try{
        test(new ENUM, constbegsys, fsys, 50);
        if(sy in constbegsys){
          if (sy == charcon || sy == stringsy){
            if (sy == stringsy){
              c.tp = strings;
              var slicearray = stab.splice(inum, inum+sleng);
              slicearray = slicearray.join("");
              c.i = slicearray;
              sx -= sleng;
              insymbol();
            }
            else {
              c.tp = chars;
              c.i = inum;
              insymbol();
            }
          }
          else {
            sign = 1;
            if (sy == plus || sy == minus){
              if (sy == minus)
                sign = -1;
              insymbol();
            }
            if (sy == ident){
              x = loc(id);
              if (x != 0)
                if (tab[x].obj != konstant)
                  Error(25);
                else{
                  c.tp = tab[x].typ;
                  if (c.tp == reals)
                    c.r = sign * rconst[tab[x].adr];
                  else
                    c.i = sign * tab[x].adr;
              }
              insymbol();
            }
            else
            if (sy == intcon){
              c.tp = ints;
              c.i = sign * inum;
              insymbol();
            }
            else
              if (sy == realcon){
                c.tp = reals;
                c.r = sign * rnum;
                insymbol();
              }
              else
                skip(fsys, 50);
          }
          test(new ENUM, fsys, new ENUM, 6);
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//constant

    function typ(fsys, xtype, pointer){
      var x, xtyp ,eltp, elrf, elsz, elxtyp, offset, t0, t1;
      function arraytyp(xtype){
        var eltp, low, high, elrf, elsz;
        try{
          low = new conrec("", 0, 0);
          high = new conrec("", 0, 0);
          constant(fsys.copy([colon, rbrack, rparent, ofsy]), low);
          if (low.tp == reals){
            Error(26, low.i, 0);
            low.tp = ints;
            low.i = 0;
          }
          if (sy == colon)
            insymbol();
          else
            Error(13);
          constant(fsys.copy([rbrack, comma, rparent, ofsy]), high);
          if (high.tp != low.tp){
            Error(27);
            high.i = low.i;
          }
          EnterArray(low.tp, low.i, high.i);
          xtype.rf = a;
          if (sy == comma){
            insymbol();
            eltp = arrays;
            var xtype2 = new xtp("", elrf, elsz);
            arraytyp(xtype2);
            elrf = xtype2.rf;
            elsz = xtype2.sz;
            xtype3 = new xtp(xtype2.tp, xtype2.rf, xtype2.sz);
            xtype3.xtyp = xtype2.xtyp;
          }
          else {
            if (sy == rbrack)
              insymbol();
            else {
              Error(12);
              if (sy == rparent)
                insymbol();
            }
            if (sy == ofsy)
              insymbol();
            else
              Error(8);
            var xtype3 = new xtp(eltp, elrf, elsz);
            var pointer = false;
            typ(fsys, xtype3);
            eltp = xtype3.tp;
            elsz = xtype3.sz;
            elrf = xtype3.rf;
            xtype.tp = arrays;
            xtype.xtyp = xtype3.tp;
          }
          xtype.sz = (atab[xtype.rf].high - atab[xtype.rf].low + 1)*elsz;
          xtype.tp = eltp;
          atab[xtype.rf].size = xtype.sz;
          atab[xtype.rf].eltyp = eltp;
          atab[xtype.rf].elxtyp = xtype3.xtyp;
          atab[xtype.rf].elref = elrf;
          atab[xtype.rf].elsize = elsz;
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//arraytyp
      try{
        xtype.tp = notyp;
        xtype.xtyp = notyp;
        xtype.rf = 0;
        xtype.sz = 0;
        if(sy == ptr){
          pointer = true;
          insymbol();
        }
        test(new ENUM, typebegsys, fsys, 10);
        if (sy in typebegsys){
          if (sy == ident){
            x = loc(id);
            if (x != 0)
              if (tab[x].obj != type1)
                Error(29);
              else {
                if(tab[x].typ == pointers){
                  xtype.tp = tab[x].typ;
                  xtype.xtyp = tab[x].xtyp;
                }
                else
                  xtype.tp = tab[x].typ;
                xtype.rf = tab[x].ref;
                if(pointer){
                  xtype.sz = TAM_INT;
                  xtype.tp = pointers;
                  pointer = false;
                  xtype.xtyp = tab[x].typ;
                }
                else{
                  xtype.sz = (tab[x].typ != pointers)?tab[x].adr:4;
                  xtype.tp = tab[x].typ;
                  xtype.xtyp = tab[x].xtyp;
                }
                if(xtype.tp == notyp)
                  Error(30);
              }
            insymbol();
          }
          else
          if (sy == arraysy){
            insymbol();
            if (sy == lbrack)
              insymbol();
            else {
              Error(11);
              if (sy == lparent)
                insymbol();
            }
            arraytyp(xtype);
            xtype.xtyp = xtype.tp;
            xtype.tp = arrays;
            if(pointer){
              xtype.xtyp = xtype.tp;
              pointer = false;
              xtype.tp = pointers;
            }
          }
          else{
            if (sy == recordsy){
              insymbol();
              EnterBlock();
              if(pointer){
                pointer = false;
                xtype.tp = pointers;
                xtype.xtyp = records;
                xtype.rf = b;
              }
              else{
                xtype.tp = records;
                xtype.rf = b;
              }
              tab[t].typ = xtype.tp;
              tab[t].xtyp = xtype.xtyp;
              tab[t].ref = xtype.rf;
              if (level == lmax)
                fatal(5);
              level++;
              display[level] = b;
              offset = 0;
              while(isOk && sy != endsy){
                if (sy == ident){
                  t0 = t;
                  entervariable();
                  while(isOk && sy == comma){
                    insymbol();
                    entervariable();
                  }
                  if (sy == colon)
                    insymbol();
                  else
                    Error(5);
                  t1 = t;
                  var xtype2 = new xtp(eltp, elrf, elsz);
                  typ(fsys.copy([semicolon, endsy, comma, ident]), xtype2, pointer);
                  eltp = xtype2.tp;
                  elxtyp = xtype2.xtyp;
                  elrf = xtype2.rf;
                  elsz = xtype2.sz;
                  while(isOk && t0 < t1){
                    t0++;
                    tab[t0].typ = eltp;
                    tab[t0].xtyp = elxtyp;
                    tab[t0].ref = elrf;
                    tab[t0].normal = true;
                    tab[t0].adr = offset;
                    offset += elsz;
                  }
                }
                else {
                  Error(2);
                  return;
                }
              }
              btab[xtype.rf].vsize = offset;
              xtype.sz = offset;
              btab[xtype.rf].psize = 0;
              insymbol();
              level--;
            }
          }
          test(new ENUM, fsys, new ENUM, 6);
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//typ

    function parameterlist(){
      var tp, rf, sz, x, t0, valpar, pointer = false;
      try{
        insymbol();
        tp = notyp;
        rf = 0;
        sz = 0;
        test(new ENUM([ident, refsy]), new ENUM([ident, refsy]), fsys.copy(rparent), 58);
        while(isOk && sy == ident || sy == refsy){
          if (sy != refsy)
            valpar = true;
          else{
            insymbol();
            valpar =  false;
          }
          t0 = t;
          entervariable();
          while(isOk && sy == comma){
            insymbol();
            entervariable();
          }
          if (sy == colon){
            insymbol();
            if (sy != ident && sy != ptr)
              Error(2, colon);
            else {
              if(sy == ptr){
                pointer = true;
                insymbol();
              }
              x = loc(id);
              insymbol();
              if (x != 0)
                if (tab[x].obj != type1)
                  Error(29);
                else {
                  if(pointer){
                    tp = pointers;
                    pointer = false;
                  }
                  else
                    tp = tab[x].typ;
                  rf = tab[x].ref;
                  if (valpar)
                    sz = tab[x].adr;
                  else
                    sz = TAM_INT;
                }
            }
            test(new ENUM([semicolon, rparent, ident, comma]), fsys.copy([semicolon, rparent, ident, comma]), 14);
          }
          else
            Error(5);
          while(isOk && t0 < t){
            t0++;
            tab[t0].typ = tp;
            if(tp == pointers)
              tab[t0].xtyp = tab[x].xtyp;
            tab[t0].ref = rf;
            tab[t0].normal = valpar;
            tab[t0].adr = dx;
            tab[t0].lev = level;
            dx += sz;
          }
          if (sy != rparent){
            if (sy == semicolon)
              insymbol();
            else {
              Error(14);
              if (sy == comma)
                insymbol();
            }
            test(new ENUM([ident, refsy]), new ENUM([ident, refsy]), fsys.copy(rparent), 6);
          }
        }
        if (sy == rparent){
          insymbol();
          test(new ENUM([varsy, beginsy, semicolon, colon]), new ENUM([varsy, beginsy, semicolon, colon]), fsys, 6);
        }
        else
          Error(4);
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }

    function constantdeclaration(){
      var c = new conrec("", 0, 0);
      try{
        insymbol();
        test(new ENUM(ident), new ENUM(ident), blockbegsys, 2);
        while(isOk && sy == ident){
          enter(id, konstant);
          insymbol();
          if (sy == eql )
            insymbol();
          else {
            Error(16);
            if (sy == becomes)
              insymbol();
          }
          constant(fsys.copy([semicolon, comma, ident]), c);
          tab[t].typ = c.tp;
          tab[t].ref = 0;
          if (c.tp == reals){
            EnterReal(c.r);
            tab[t].adr = c1;
          }
          else
          tab[t].adr = c.i;
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//constantdeclaration

    function typedeclaration(){
      var tp, rf, sz, t1, pointer = false;
      try{
        insymbol();
        test(new ENUM(ident), new ENUM(ident), blockbegsys, 2);
        while(isOk && sy == ident){
          enter(id, type1);
          t1 = t;
          insymbol();
          if (sy == eql)
            insymbol();
          else {
            Error(16);
            if (sy == becomes)
              insymbol();
          }
          var xtype = new xtp(tp, rf, sz);
          typ(fsys.copy([semicolon, comma, ident]), xtype, pointer);
          if(pointer){
            tab[t1].typ = pointers;
            pointer = false;
            tab[t1].adr = TAM_INT;
          }
          else{
            tab[t1].typ = xtype.tp;
            tab[t1].adr = xtype.sz;
          }
          tab[t1].ref = xtype.rf;
          tab[t1].xtyp = xtype.xtyp;
          if(tab[t1].typ == records){
            var t2 = btab[tab[t1].ref].last;
            if(tab[t2].typ == pointers && tab[t2].xtyp == undefined){
              tab[t2].xtyp = records
              tab[t2].ref = tab[t1].ref;
            }
          }
          pointer = false;
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//typedeclaration

    function variabledeclaration(){
      var t0, t1, rf, sz, tp, pointer = false;
      try{
        insymbol();
        if(sy != ident)
          Error(20);
        while(isOk && sy == ident){
          t0 = t;
          entervariable();
          while(isOk && sy == comma){
            insymbol();
            entervariable();
          }
          if (sy == colon)
            insymbol();
          else
            Error(5);
          t1 = t;
          if(sy == ident){
            var x = loc(id);
            if(tab[x].typ == pointers)
              pointer = true;
          }
          var xtype = new xtp(tp, rf, sz);
          typ(fsys.copy([semicolon, comma, ident]), xtype, false);
          while(isOk && t0 < t1){
            t0++;
            tab[t0].typ = xtype.tp;
            tab[t0].xtyp = xtype.xtyp;
            tab[t0].ref = xtype.rf;
            tab[t0].lev = level;
            tab[t0].adr = dx;
            tab[t0].normal = true;
            if(!pointer)
              dx += xtype.sz;
            else
              dx += TAM_INT;
          }
          pointer = false;
        }
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//variabledeclaration

    function procdeclaration(){
      try{
        var isfun, tx, len;
        isfun = sy == functionsy;
        insymbol();
        if (sy != ident){
          Error(2, functionsy);
          id = "";
        }
        if (isfun)
          enter(id, funktion);
        else
          enter(id, prozedure);
        tab[t].normal = true;
        tx = t;
        insymbol();
        block(fsys.copy(semicolon), isfun, level+1);
        var bool = 0;
        len = 0;
        if(isfun){
          bool++;
          switch (tab[tx].typ) {
            case reals: len = TAM_REAL; break;
            case chars:
            case bools: len = TAM_CHAR; break;
            default:  len = TAM_INT ;
          }
        }
        emit1(lineOfLastSymbol, 32 + bool, len);
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//procdeclarationbtab

    function statement(fsys){
      var i;

      function selector(fsys, v, assign){
        var x, a, j;
        try{
          x = new item("", 1);//v.ref
          do{
            if (sy == period){
              if (v.typ != records)
                Error(31);
              insymbol();
              if (sy != ident)
                Error(2, period, loc(id));
              else {
                if (v.typ != records)
                  Error(31);
                else {
                  j = btab[v.ref].last;
                  tab[0].name = id;
                  while(isOk && tab[j].name != id)
                    j = tab[j].link;
                  if (j == 0)
                    Error(0);
                  v.typ = tab[j].typ;
                  v.ref = tab[j].ref;
                  a = tab[j].adr;
                  if (a != 0)
                    emit1(linecount, 9, a);
                }
                insymbol();
                if(sy == ptr){
                  if(tab[j].typ == pointers){
                    v.typ = tab[j].xtyp;
                    emit1(linecount, 34, (v.typ == reals)?TAM_REAL: (v.typ == bools || v.typ == chars)?TAM_CHAR:TAM_INT);
                  }
                  else
                    Error(63);
                  insymbol();
                }
                if (sy == lbrack && v.typ == strings){
                    if (v.typ == strings || v.typ == arrays)
                      selector(fsys, v, assign);
                    else
                      Error(28);
                  }
              }
            }
            else {    //Seletor do Array
              if (sy != lbrack)
                Error(11);
              do{
                if (v.typ != arrays && v.typ != strings)
                  Error(28);
                insymbol();
                if (v.typ != arrays){
                  if (v.typ == strings){
                    v.typ = chars;
                    if (!assign)
                      emit1(linecount, 34, TAM_INT);
                    expression(fsys.copy([comma, rbrack]), x);
                    if(x.typ != ints)
                      Error(59);
                  }
                  else
                    Error(28);
                }
                else {
                  expression(fsys.copy([comma, rbrack]), x);
                  a = v.ref;
                  if (atab[a].inxtyp != x.typ)
                    Error(26, atab[a].inxtyp);
                  else
                    if (atab[a].elsize == 1)
                      emit1(linecount, 20, a);
                    else
                      emit1(linecount, 21, a);
                  v.typ = atab[a].eltyp;
                  v.ref = atab[a].elref;
                }
              }while(isOk && sy == comma);
              if (sy == rbrack)
                insymbol();
              else {
                Error(12);
                if (sy == rparent)
                  insymbol();
              }
              if(sy == ptr){
                insymbol();
                if(atab[a].eltyp != pointers)
                  Error(63);
                else
									emit1(linecount, 34, 4);
              }
            }
          }while(isOk && sy in new ENUM([lbrack, lparent, period]));
          test(new ENUM([ident, plus, minus, times, rdiv, idiv]), fsys.copy(ident, plus, minus, rdiv, times, idiv), new ENUM, 6);
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//Selector

      function call(fsys, i){
        var x, lastp, cp, k, line;
        try{
          x = new item();
          if(changed)
            line = ilnx;
          else
            line = linecount;
          if(sy != lparent)
            line--;
          emit1(line, 18, i);
          lastp = btab[tab[i].ref].lastpar;
          cp = i;
          if (sy == lparent){
            do{
              insymbol();
              if (cp >= lastp)
                Error(39);
              else {
                cp++;
                if (tab[cp].normal){
                  expression(fsys.copy([comma, colon, rparent]), x);
                  if (x.typ == tab[cp].typ){
                    if (x.ref != tab[cp].ref)
                      Error(36, records, records);
                    else
                      if (x.typ == arrays)
                        emit1(line, 22, atab[x.ref].size);
                      else if (x.typ == records)
                        emit1(line, 22, btab[x.ref].vsize);
                  }
                  else
                    if (x.typ == ints && tab[cp].typ == reals)
                      emit1(line, 26,TAM_INT);
                    else
                      if (x.typ != notyp)
                        Error(36, x.typ, tab[cp].typ);
                }
                else {
                  if (sy != ident)
                    Error(2, "ref");
                  else {
                    k = loc(id);
                    insymbol();
                    if (k != 0){
                      if (tab[k].obj != variable)
                        Error(37);
                      x.typ = tab[k].typ;
                      x.ref = tab[k].ref;
                      if (tab[k].normal)
                        emit2(line, 0, tab[k].lev, tab[k].adr);
                      else
                        emit2(line, 1, tab[k].lev, tab[k].adr, tab[k].typ);
                      if (sy in new ENUM([lbrack, lparent, period]))
                        selector(fsys.copy([comma, colon, rparent]), x, false);
                      if (x.typ != tab[cp].typ || x.ref != tab[cp].ref)
                        Error(36, x.typ, tab[cp].typ);

                    }
                  }
                }
              }
              test(new ENUM([comma, rparent]), new ENUM([comma, rparent]), fsys, 6);
            }while(isOk && sy == comma);
            if (sy == rparent)
              insymbol();
            else
              Error(4);
          }
          if (cp < lastp)
            Error(39);
          emit2(line, 19, tab[i].typ, btab[tab[i].ref].psize);
          if (tab[i].lev < level)
            emit2(line, 3, tab[i].lev, level);
          x.typ = tab[i].typ;
          x.ref = tab[i].ref;
          while(sy == lbrack){
            if(tab[i].obj != funktion){
              Error(71);
              return;
            }
            selector(fsys, x, true);
            if (x.typ in stantyps && !(x.typ == chars && tab[i].typ == strings)){
              var ltyp;
              switch (x.typ) {
                case reals: ltyp = TAM_REAL; break;
                case chars:
                case bools: ltyp = TAM_CHAR; break;
                default: ltyp = TAM_INT;
              }
              emit1(linecount, 34, ltyp);
            }
            if (x.typ == chars && tab[i].typ == strings)
              emit(linecount, 62);
          }
          return x.typ;
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//call

      function resulttype(a, b){
        try{
          var result;
          if (types[a] > types[reals] || types[b] > types[reals]){
            if (a == strings || b == strings || a == chars && b == chars)
              result = strings;
            else if((a == pointers && b == ints) || (a == ints || b == pointers))
              result = pointers;
            else{
              Error(33);
              result =  notyp;
            }
          }
          else
          if (a == notyp || b == notyp)
            result =  notyp;
          else
            if (a == ints)
              if(b == ints)
                result =  ints;
              else {
                result = reals;
                emit1(linecount, 26, TAM_REAL);
              }
            else {
              result =  reals;
              if (b == ints)
                emit1(linecount, 26, TAM_INT);
            }
            return result;
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//resulttype

      function expression(fsys, x){
        var y, op;
        y = new item;

        function simpleexpression(fsys, x){
          var y, op;
          y = new item;

          function term(fsys, x){
            var y, op;
            y = new item;

            function factor(fsys, x){
              var i, f;

              function standfct(n){
                var ts = new ENUM, x = new item();
                try{
                  if (sy == lparent){
                    if(n < 23)//aleatorio permite 0 parametros
                      insymbol();
                  }
                  else if(n < 23)
                    Error(9);
                  if(n < 21)
                    expression(fsys.copy([rparent, comma]), x);
                  switch (n) {
                    case 0:
                    case 2:
                      ts.add([ints, reals]);
                      tab[i].typ = x.typ;
                      if (x.typ == reals)
                        n++;
                    break;
                    case 4:
                    case 5:
                      ts.add(ints);
                    break;
                    case 6:
                      ts.add([ints, bools, chars]);
                    break;
                    case 7:
                    case 8:
                      ts.add(chars);
                    break;
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                      ts.add([ints, reals]);
                      if (x.typ == ints)
                        emit1(linecount, 26,TAM_INT);
                    break;
                    case 17:
                      ts.add(strings);
                      if (x.typ == strings){
                        emit(linecount, 65);
                      }
                      else {
                        Error(36, x.typ, strings);
                      }
                    break;
                    case 18:
                      ts.add(strings);
                      if (x.typ == strings){
                        emit(linecount, 66);
                      }
                      else {
                        Error(36, x.typ, strings);
                      }
                    break;
                    case 19:
                    ts.add([ints, strings]);
                    if (x.typ == strings){
                      emit(linecount, 64);
                    }
                    else {
                      Error(36, x.typ, strings);
                    }
                    break;
                    case 20:
                    if (x.typ == strings || x.typ == chars){
                      if (x.typ == chars)
                        emit1(linecount, 25, 1);
                      insymbol();
                      var y = new item("", 1);
                      expression(fsys.copy(rparent), y);
                      if (y.typ == strings || y.typ == chars){
                        ts.add([ints, strings, chars]);
                        if (y.typ == chars)
                          emit1(linecount, 67, 0);
                        else
                          emit1(linecount, 67, 1);
                      }
                      else {
                        Error(36, y.typ, strings);
                      }
                    }
                    else {
                      Error(36, x.typ, strings);
                    }
                    break;
                    case 21:
                    if(sy == ident){
                      var l = loc(id);
                      var z = new item();
                      insymbol();
                      if(l == 0){
                        Error(0);
                        return;
                      }
                      z.typ = tab[l].typ;
                      z.ref = tab[l].ref;
                      while(isOk && isOk && (sy == lbrack || sy == period)){
                        if(sy == lbrack){
                          if(tab[l].typ != arrays && tab[l].typ != strings){
                            Error(28);
                          }
                          else if(tab[l].typ == strings)
                            z.typ = chars;
                          else if(tab[l].typ == arrays){
                            z.typ = atab[z.ref].eltyp;
                            z.ref = atab[z.ref].elref;
                          }
                          insymbol();
                          insymbol();
                          while(isOk && sy == comma){
                            insymbol();
                            insymbol();
                            z.typ = atab[z.ref].eltyp;
                            z.ref = atab[z.ref].elref;
                          }
                          if(sy == rbrack)
                            insymbol();
                        }
                        else if(tab[l].typ != records)
                          Error(31);
                        else {
                          insymbol();
                          if(sy != ident)
                            Error(2, period, loc(id));
                          else{
                            var o = btab[tab[l].ref].last;
                            tab[0].name = id;
                            while(isOk && tab[o].name != id)
                              o = tab[o].link;
                            if(o == 0)
                              Error(0);
                            z.typ = tab[o].typ;
                            z.ref = tab[o].ref;
                            l = o;
                            insymbol();
                          }
                        }
                      }
                      if(z.typ == pointers)
                        z.typ = tab[l].xtyp;
                      switch (tab[l].obj) {
                        case type1:
                          if(z.typ in new ENUM([ints, reals, bools, chars, strings]))
                            emit1(linecount, 24, tab[l].adr, ints);
                          else if (z.typ == pointers){
                            if(tab[l].typ == arrays)
                              emit1(linecount, 24, atab[tab[l].ref].size, ints);
                            else if(tab[l].typ == records)
                              emit1(linecount, 24, btab[tab[l].ref].vsize, ints);
                          }
                          else if(z.typ == records)
                            emit1(linecount, 24, btab[z.ref].vsize, ints)
                          else if(z.typ == arrays)
                            emit1(linecount, 24, atab[z.ref].size, ints)
                          else
                            Error(48);
                        break;
                        case variable:
                        switch (z.typ) {
                          case reals:
                            emit1(linecount, 24, TAM_REAL, ints);
                          break;
                          case pointers:
                          case ints:
                          case strings:
                            emit1(linecount, 24, TAM_INT, ints);
                          break;
                          case chars:
                          case bools:
                            emit1(linecount, 24, TAM_CHAR, ints);
                          break;
                          default:
                            if(z.typ == arrays)
                              emit1(linecount, 24, atab[z.ref].size, ints);
                            else if(z.typ == records)
                              emit1(linecount, 24, btab[z.ref].vsize, ints);
                            else
                              Error(48);
                        }
                        break;
                      }
                      x.typ = z.typ;
                    }
                    else
                      Error(2);
                    ts.add([ints, strings, reals, records, arrays, bools, chars, pointers]);
                    break;
                    case 22:
                    if(sy != ident || id == "bytes"){
                      expression(fsys.copy([rparent]), x);
                      if(x.typ != ints){
                        Error(36, xt.typ, ints);
                      }
                    }
                    else {
                      var indexID = loc(id);
                      var length = 0;
                      switch (tab[indexID].obj) {
                        case konstant:
                        case type1:
                        case variable:
                        var item_id = new item;
                        item_id.typ = tab[indexID].typ;
                        item_id.ref = tab[indexID].ref;
                        if(item_id.typ == pointers)
                          item_id.typ = tab[indexID].xtyp;
                        switch (item_id.typ) {
                          case reals:
                            length = TAM_REAL;
                          break;
                          chars:
                          bools:
                            length = TAM_CHAR;
                          break;
                          case ints:
                            length = TAM_INT;
                          break;
                          default:
                          if(item_id.typ == arrays)
                            length = atab[item_id.ref].size;
                          else if(item_id.typ == records)
                            length = btab[item_id.ref].vsize;
                          else
                            Error(48);
                        }
                        break;
                      }
                      x.typ = ints;
                      insymbol();
                      emit1(linecount, 24, length);
                    }
                    if(x.typ == ints)
                      emit(linecount, 71);
                    else
                      Error(36, x.typ, ints);
                    ts.add([ints, pointers]);
                    break;
                    case 23:
                      var RandomOp = 0;
                      if(sy == lparent){
                        insymbol();
                        var p = new item;
                        expression(fsys.copy([rparent]), p);
                        if(p.typ != ints)
                          Error(36, p.typ, ints);
                        else{
                          RandomOp = 1;
                          tab[i].typ = ints;
                          x.typ = ints;
                        }
                        if(sy == rparent)
                          insymbol();
                      }
                      else{
                        tab[i].typ = reals;
                        x.typ = reals;
                      }
                      emit1(linecount, 72, RandomOp);
                      ts.add([ints, reals]);
                    break;
                    case 24:
                      if(sy == lparent){
                        insymbol();
                        if(sy == rparent)
                          insymbol();
                        else
                          Error(4);
                      }
                      emit1(linecount, 74, false);
                      x.typ = ints;
                      ts.add([ints]);
                    break;
                  }
                  if (x.typ in ts){
                    if(n <= 16)
                      emit1(linecount, 8, n);
                  }
                  else
                    if (x.typ != notyp)
                      Error(48);
                  x.typ = tab[i].typ;
                  if(n < 23){
                    if (sy == rparent)
                      insymbol();
                    else
                      Error(4);
                  }
                }
                catch(err){
                  isOk = false;
                  MsgErro = err;
                }
              }//standfct
              try{
                x.typ = notyp;
                x.ref = 0;
                test(new ENUM([andsy, times, addr]), facbegsys.copy([andsy, times, addr]), fsys, 58);
                var reference = false;  //Atribuição de endereço em ponteiro
                var ireference = false; //Leitura de valor de ponteiro
                if (sy == addr){
                  insymbol();
                  reference = true;
                }
                while(isOk && sy in facbegsys){
                  if (sy == ident){
                    i = loc(id);
                    if(reference){
                      if(tab[i].obj != variable)
                        Error(37);
                    }
                    insymbol();
                    if(sy == ptr){
                      if(tab[i].typ == pointers){
                        if(reference)
                          Error(68);
                        ireference = true;
                        insymbol();
                        x.typ = tab[i].xtyp;
                      }
                      else {
                        Error(63, tab[i].typ);
                      }
                    }
                    switch (tab[i].obj) {
                      case konstant:
                        x.typ = tab[i].typ;
                        x.ref = 0;
                        if (x.typ == reals)
                          emit2(linecount, 24, tab[i].typ, tab[i].adr);
                        else
                          emit2(linecount, 24, tab[i].typ, tab[i].adr);
                      break;
                      case variable:
                        x.typ = tab[i].typ;
                        x.ref = tab[i].ref;
                        if (!ireference){ //Não está referenciando endereço
                          if (sy in new ENUM([lbrack, lparent, period])){
                            if (tab[i].normal)
                              f = 0;
                            else
                              f = 1;
                            emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                            selector(fsys, x, false);
                            if (x.typ in stantyps && tab[i].typ != strings && x.typ != strings){
                              var ltyp;
                              switch (x.typ) {
                                case reals: ltyp = TAM_REAL; break;
                                case chars:
                                case bools: ltyp = TAM_CHAR; break;
                                default: ltyp = TAM_INT;
                              }
                              if(!reference)
                                emit1(linecount, 34, ltyp);
                              else
                                x.typ = pointers;
                            }
                            if (x.typ == chars && tab[i].typ == strings)
                              emit(linecount, 62);
                            else if (x.typ == strings && x.xtyp != pointers)
                                emit1(linecount, 34, TAM_INT);
                          }
                          else {
                            if (x.typ in stantyps)
                              if(tab[i].normal)
                                f = 1;
                              else
                                f = 2;
                            else
                              if (tab[i].normal)
                                f = 0;
                              else
                                f = 1;
                            if (reference && f > 0){
                              f--;    //O programador quer acessar o valor do ponteiro e não da variável apontada
                              x.typ = pointers;
                            }
                            else if(reference)
                              x.typ = pointers;
                            emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                          }
                        }
                        else {
                          x.typ = tab[i].xtyp;
                          if (tab[i].normal)
                            f = 1;
                          else
                            f = 2;
                          emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                          var len;
                          switch (tab[i].xtyp) {
                            case reals:
                              len = TAM_REAL;
                            break;
                            case chars:
                            case bools:
                              len = TAM_CHAR;
                            break;
                            default:
                              len = TAM_INT;
                          }
                          if(tab[i].xtyp in stantyps)
                            emit1(linecount, 34, len);
                          if (sy in new ENUM([lbrack, lparent, period])){
                            if (x.typ == strings)
                              x.typ = chars;
                            selector(fsys.copy([becomes, eql, plus, minus, rdiv, times]), x, false);
                            if (x.typ in stantyps && tab[i].typ != strings && x.typ != strings){
                              var ltyp;
                              switch (x.typ) {
                                case reals: ltyp = TAM_REAL;break;
                                case ints:ltyp = TAM_INT;break;
                                case bools:ltyp = TAM_BOOL;break;
                                case chars:ltyp = TAM_CHAR;break;
                                default:
                                ltyp = TAM_INT;
                              }
                              emit1(linecount, 34, ltyp);
                            }
                            if (x.typ == chars && tab[i].typ == strings)
                              emit(linecount, 62);
                            else if (x.typ == strings && x.xtyp != pointers)
                                emit1(linecount, 34, TAM_INT);
                          }
                        }
                      break;
                      case type1:
                      case prozedure:
                        Error(44);
                      break;
                      case funktion:
                        if (tab[i].lev != 0)
                          x.typ = call(fsys,i);
                        else
                          standfct(tab[i].adr);
                        x.typ = tab[i].typ;
                      break;
                    }
                    if (sy == ident)
                      break;
                  }
                  else
                  if (sy in new ENUM([charcon, intcon, realcon, stringsy])){
                    if (sy == realcon){
                      x.typ = reals;
                      EnterReal(rnum);
                      emit2(linecount, 24, x.typ, c1);
                    }
                    else {
                      if (sy != stringsy){
                        if (sy == charcon)
                        x.typ = chars;
                        else
                        x.typ = ints;
                      }
                      else {
                        inum = stab.splice(sx-sleng, sleng);
                        sx -= sleng;
                        inum = inum.join("");
                        x.typ = strings;
                      }
                      emit2(linecount, 24, x.typ, inum);
                    }
                    x.ref = 0;
                    insymbol();
                    if (sy == ident)
                      break;
                  }
                  else
                  if (sy == lparent){
                    insymbol();
                    expression(fsys.copy(rparent), x);
                    if (sy == rparent)
                    insymbol();
                    else
                    Error(4);
                    if (sy == ident)
                      break;
                  }
                  else
                  if (sy == notsy){
                    insymbol();
                    factor(fsys, x);
                    if (x.typ == bools)
                    emit(linecount, 35);
                    else
                    if (x.typ != notyp)
                    Error(32);
                  }
                  test(new ENUM([ident, untilsy, stringsy]), fsys.copy([ident, untilsy, stringsy]), facbegsys, 6);
                }
              }
              catch(err){
                isOk = false;
                MsgErro = err;
              }
            } //factor
            try{
              factor(fsys.copy([times, rdiv, idiv, imod, andsy]), x);
              while(isOk && sy in new ENUM([times, rdiv, idiv, imod, andsy])){
                op = sy;
                var lcx;
                if (op == andsy){
                  lcx = lc;
                  emit(linecount, 69);
                }
                insymbol();
                factor (fsys.copy([times, rdiv, idiv, imod, andsy]), y);
                if (op == times){
                  x.typ = resulttype(x.typ, y.typ);
                  emit1(linecount, 57, x.typ);

                }
                else
                if(op == rdiv){
                  if(y.typ == ints){
                    emit1(linecount, 26,TAM_INT);
                    y.typ = reals;
                  }
                  if (x.typ == ints){
                    emit1(linecount, 26,TAM_REAL);
                    x.typ = reals;
                  }
                  if (x.typ == reals && y.typ == reals)
                    emit1(linecount, 58, reals);
                  else {
                    if (x.typ != notyp && y.typ != notyp)
                    Error(33);
                    x.typ = notyp;
                  }
                }
                else
                if (op == andsy){
                  if (x.typ == bools && y.typ == bools){
                    emit(linecount, 56);
                    kode[lcx].y = lc;
                  }
                  else {
                    if (x.typ != notyp && y.typ != notyp)
                      Error(32);
                    x.typ = notyp;
                  }
                }
                else {
                  if (x.typ == ints && y.typ == ints)
                    if (op == idiv)
                      emit1(linecount, 58, ints);
                    else
                      emit(linecount, 59);
                  else {
                    if (x.typ != notyp && y.typ != notyp)
                      Error(34);
                    x.typ = notyp;
                  }
                }
              }
            }
            catch(err){
              isOk = false;
              MsgErro = err;
            }
          }//term
          try{
            if (sy == plus || sy == minus){
              op = sy;
              insymbol();
              term(fsys.copy([plus, minus]), x);
              if (types[x.typ] > types[reals]){
                if (x.typ != strings)
                  Error(33);
              }
              else
                if (op == minus)
                  emit1(linecount, 36, (x.typ == reals)? TAM_REAL : TAM_INT);
            }
            else
              term(fsys.copy([plus, minus, orsy]), x);
            while(isOk && sy in new ENUM([plus, minus, orsy])){
              op = sy;
              var lcx;
              if (op == orsy){
                lcx = lc;
                emit(linecount, 68);
              }
              insymbol();
              term(fsys.copy([plus, minus, orsy]), y);
              if (op == orsy){
                if (x.typ == bools && y.typ == bools){
                  emit(linecount, 51);
                  kode[lcx].y = lc;
                }
                else {
                  if (x.typ != notyp && y.typ != notyp)
                    Error(32);
                  x.typ = notyp;
                }
              }
              else {
                if (x.typ == strings)
                  if(y.typ == chars)
                    emit1(linecount, 25, 1);
                if(y.typ == strings)
                  if (x.typ == chars)
                    emit1(linecount, 25, 2);
                if(y.typ == chars && x.typ == chars && op == plus){
                  emit1(linecount, 25, 1);
                  emit1(linecount, 25, 2);
                }
                x.typ = resulttype(x.typ, y.typ);
                switch (x.typ) {
                  case strings:
                  if(op == plus)
                    emit1(linecount, 52, strings);
                  else
                    Error(60);
                  break;
                  case pointers:
                  case ints:
                    if (op == plus)
                        emit1(linecount, 52, ints);
                    else
                      emit1(linecount, 53, ints);
                  break;
                  case reals:
                    if (op == plus)
                        emit1(linecount, 52, reals);
                    else
                      emit1(linecount, 53, reals);
                  break;
                }
              }
            }
          }
          catch(err){
            isOk = false;
            MsgErro = err;
          }
        }//simpleexpression
        try{
          simpleexpression(fsys.copy([eql, neq, lss, leq, gtr, geq]), x);
          if (sy in new ENUM([eql, neq, lss, leq, gtr, geq])){
            op = sy;
            insymbol();
            simpleexpression(fsys, y);
            if (x.typ in new ENUM([notyp, ints, bools, chars, strings, reals, pointers]) && x.typ == y.typ)
              switch (op) {
                case eql: emit1(linecount, 39, x.typ);break;
                case neq: emit1(linecount, 40, x.typ);break;
                case lss: emit1(linecount, 41, x.typ);break;
                case leq: emit1(linecount, 42, x.typ);break;
                case gtr: emit1(linecount, 43, x.typ);break;
                case geq: emit1(linecount, 44, x.typ);break;
              }
            else {
              if (x.typ == strings || y.typ == strings){
                if (x.typ == strings)
                  if (y.typ == chars)
                    emit1(linecount, 25,1);
                if (y.typ == strings)
                  if(x.typ == chars)
                    emit1(linecount, 25,2);
                x.typ = resulttype(x.typ,y.typ);
                switch (op) {
                  case eql: emit1(linecount, 39, x.typ);break;
                  case neq: emit1(linecount, 40, x.typ);break;
                  case lss: emit1(linecount, 41, x.typ);break;
                  case leq: emit1(linecount, 42, x.typ);break;
                  case gtr: emit1(linecount, 43, x.typ);break;
                  case geq: emit1(linecount, 43, x.typ);break;
                }
              }
              else{
                if (x.typ == reals)
                  if(y.typ == ints)
                    emit1(linecount, 26,TAM_INT);
                if(y.typ == reals)
                  if(x.typ == ints)
                    emit1(linecount, 26,TAM_REAL);
                x.typ = resulttype(x.typ, y.typ);
                switch (op) {
                  case eql: emit1(linecount, 39, x.typ);break;
                  case neq: emit1(linecount, 40, x.typ);break;
                  case lss: emit1(linecount, 41, x.typ);break;
                  case leq: emit1(linecount, 42, x.typ);break;
                  case gtr: emit1(linecount, 43, x.typ);break;
                  case geq: emit1(linecount, 44, x.typ);break;
                }
              }
            }
            x.typ = bools;
          }
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//expression
      function assignment(lv, ad){
        try{
          var xx=0, ln=linecount, x, y, f,op="", assign=1, fstring=false;    //assign para atribuições multiplas, quantas atribuições a instrução 38 fará
          x = new item("", 1);
          y = new item("", 1);
          x.typ = tab[i].typ;
          x.ref = tab[i].ref;
          if (tab[i].normal)
            f = 0;
          else
            f = 1;
          if(changed)
            ln++;
          emit2(ln, f, lv, ad, ints);
          if(sy == ptr){
            insymbol();
            if(x.typ == pointers){
              x.typ = tab[i].xtyp;
              emit1(ln, 34, 4);
            }
            else
              Error(63, x.typ, undefined, ln);
          }
          if (sy in new ENUM([lbrack, lparent, period])){
            if (x.typ == strings)
              fstring = true;
            selector(fsys.copy([becomes, eql, plus, minus, rdiv, times]), x, true);
          }
          if (sy == becomes)
            insymbol();
          else {
            if (sy == comma){
              var p = i;
              i = [];
              i[0] = p;
              while(isOk && sy == comma){
                insymbol();
                p = loc(id);
                i[xx] = p;
                xx++;
                if (p == 0)
                  Error(0, undefined, undefined, ln);
                if (tab[p].typ == tab[i].typ){
                  if (tab[p].normal)
                    f = 0;
                  else
                    f = 1;
                  emit2(ln, f, tab[p].lev, tab[p].adr, tab[p].typ);
                  assign++;
                }
                else {
                  Error(46, undefined, undefined, ln);
                  break;
                }
                insymbol();
                if (sy in new ENUM([lbrack, lparent, period]))
                  Error(61, undefined, undefined, ln);
              }
              if(sy == becomes)
                insymbol();
            }
            else{
              if (sy in new ENUM([plus, minus, times, rdiv])){
                if (x.typ in stantyps)
                  if(tab[i].normal)
                    f = 1;
                  else
                    f = 2;
                else
                  if (tab[i].normal)
                    f = 0;
                  else
                    f = 1;
                emit2(ln, f, tab[i].lev, tab[i].adr, tab[i].typ);
              }
              switch (sy) {
                case plus:
                  op = plus;
                  insymbol();
                  if (sy == eql)
                    insymbol();
                  else
                    Error(16, undefined, undefined, ln);
                break;
                case minus:
                  op = minus;
                  insymbol();
                  if (sy == eql)
                    insymbol();
                  else
                    Error(16, undefined, undefined, ln);
                break;
                case times:
                  op = times;
                  insymbol();
                  if (sy == eql)
                    insymbol();
                  else
                    Error(16, undefined, undefined, ln);
                break;
                case rdiv:
                  op = rdiv;
                  insymbol();
                  if (sy == eql)
                    insymbol();
                  else
                    Error(16, undefined, undefined, ln);
                break;
                default:
                  Error(51, undefined, undefined, ln);
                  if (sy == eql)
                    insymbol();

              }
            }
          }
          expression(fsys, y);
          if (x.typ == y.typ)
            if (x.typ in stantyps){
              if(x.typ == strings && x.ref == 1){
                Error(46, x.typ, y.typ, ln);
              }
              else{
                if (tab[i].typ == strings){
                  x.ref = 0;
                  if (y.typ == chars){
                    if (x.typ in stantyps)
                      if(tab[i].normal)
                        f = 1;
                      else
                        f = 2;
                    else
                      if (tab[i].normal)
                        f = 0;
                      else
                        f = 1;
                    emit2(ln, f, tab[i].lev, tab[i].adr, tab[i].typ);
                    if(fstring)
                      x.typ = tab[i].typ;
                    emit(ln, 63);
                  }
                }
                switch (op) {
                  case plus: emit1(ln, 52, x.typ); break;
                  case minus:emit1(ln, 53, x.typ); break;
                  case times:emit1(ln, 57, x.typ); break;
                  case rdiv:emit1(ln, 58, x.typ); break;
                }
                emit2(ln, 38, x.typ, assign, i);
              }
            }
            else
              if(x.ref != y.ref)
                Error(46, x.typ, y.typ, ln);
              else
                if (x.typ == arrays)
                  emit1(ln, 23, atab[x.ref].size);
                else
                  emit1(ln, 23, btab[x.ref].vsize);
          else{
            if(x.typ == pointers || y.typ == pointers){
              Error(46, x.typ, y.typ, ln)
            }
            else
              if(x.typ == strings || fstring){
                if (x.typ == chars && fstring){
                  if (y.typ != chars){
                    Error(46, x.typ, y.typ, ln);
                  }
                  else {
                    if (tab[i].typ != arrays)
                      emit2(ln, 1, tab[i].lev, tab[i].adr, tab[i].typ);
                    else {
                      var ltyp;
                      switch (y.typ) {
                        case reals:ltyp = TAM_REAL;break;
                        case ints:ltyp = TAM_INT;break;
                        case bools:ltyp = TAM_BOOL;break;
                        case chars:ltyp = TAM_CHAR;break;
                      }
                      emit1(ln, 34, ltyp);
                    }
                    emit(ln, 63);
                    if(!fstring)
                      emit2(ln, 38, x.typ, assign, i);
                    else
                      emit2(ln, 38, strings, assign, i);
                  }
                }
                else {
                  if(x.typ == strings){
                    if(y.typ == chars){
                      emit1(ln, 25, 1);
                      emit2(ln, 38, x.typ, assign, i);
                    }
                    else
                      Error(46, x.typ, y.typ, ln);
                  }
                }
              }
              else{
                if (x.typ == reals){
                  if(y.typ == ints){
                    emit1(ln, 26, TAM_INT);
                    switch (op) {
                      case plus: emit1(ln, 52, x.typ); break;
                      case minus:emit1(ln, 53, x.typ); break;
                      case times:emit1(ln, 57, x.typ); break;
                      case rdiv: emit1(ln, 58, x.typ); break;
                    }
                    emit2(ln, 38, x.typ, assign, i);
                  }
                  else
                    Error(46, x.typ, y.typ, ln);
                }
                else if(x.typ == ints){
                  if(y.typ == reals)
                    Error(46, x.typ, y.typ, ln);
                }
                else
                  if (x.typ != notyp && y.typ != notyp || x.typ == pointers)
                    emit2(ln, 38, x.typ, assign, i);
                  else
                    Error(46, x.typ, y.typ, ln);
              }
          }
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//assignment

      function compoundstatement(){
        try{
          insymbol();
          statement(fsys.copy([semicolon, endsy]));
          while(isOk && sy != endsy){
            if (sy in statbegsys.copy(ident))
              statement(fsys.copy([semicolon, endsy, elsesy]));
            else{
              if (sy == semicolon){
                Error(7);
                insymbol();
              }
              else
                break;
            }
          }
          if (sy == endsy)
            insymbol();
          else
            if (sy != elsesy)
              Error(57);
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//compoundstatement

      function ifstatement(){
        try{
          var x, lc1, lc2;
          x = new item;
          insymbol();
          expression(fsys.copy([thensy, dosy]), x);
          if (!(x.typ in new ENUM([bools, notyp])))
            Error(17, x.typ);
          lc1 = lc;
          emit(linecount, 11);
          if (sy == thensy)
            insymbol();
          else {
            Error(52);
            if (sy == dosy)
              insymbol();
          }
          statement(fsys.copy(elsesy));
          if (sy == elsesy){
            insymbol();
            lc2 = lc;
            emit(linecount, 10);
            kode[lc1].y = lc;
            statement(fsys);
            kode[lc2].y = lc;
          }
          else
            kode[lc1].y = lc;
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//ifstatement

      function casestatement(){
        function caselabel(){
          try{
            var lab, k;
            lab = new conrec;
            constant(fsys.copy([comma, colon]), lab);
            if (lab.tp != x.typ) {
              Error(47);
            }
            else
              if (i == csmax)
                fatal(6);
            else{
              i++;
              k = i;
              if (lab.tp == reals){
                casetab[i].val = lab.r;
                do
                  k--;
                while(isOk && casetab[k].val != lab.r && k > 0);
              }
              else{
                casetab[i].val = lab.i;
                do
                  k--;
                while(isOk && casetab[k].val != lab.i && k > 0);
              }
              casetab[i].lc = lc;
              if (k > 0)
                Error(1, casetab[k].val); //Definições multiplas
            }
          }
          catch(err){
            isOk = false;
            MsgErro = err;
          }
        }//fim caselabel

        function onecase(){
          try{
            if (sy in constbegsys || sy == elsesy){
              if(sy == elsesy)
                else_sy = true;
              else{
                if(!else_sy)
                  caselabel();
                else
                  Error(70);
              }
              while(isOk && sy == comma) {
                insymbol();
                caselabel();
              }
              if (sy == colon || else_sy)
                insymbol();
              else
                Error(5);
              if(else_sy){
                elselc = lc;    //Marca inicio das instruções de senao
                if (sy == colon)
                  insymbol();
              }
              statement(fsys.copy([semicolon, endsy]));
              j++;
              exittab[j] = lc;
              emit(linecount, 10);
            }
						else
							if(else_sy)
								Error(74);
							else
								Error(23);
          }
          catch(err){
            isOk = false;
            MsgErro = err;
          }
        }//fim onecase
        try{
          var x;
          x = new item;
          var i, j, k, lc1;
          var else_sy = false, elselc = 0;   //Senao da instrução caso
          var casetab = new Array(csmax);
					var endLine = [];
          function CaseRecord(val, lc){
            this.val = val;
            this.lc = lc;
          }
          //inicializa array com objetos do tipo caserecord
          for ( i = 0; i < csmax; i++){
            casetab[i] = new CaseRecord;
          }
          var exittab = new Array(csmax);
          insymbol();
          i = 0;
          j = 0;
          expression(fsys.copy([ofsy, comma, colon]), x);
          if (!(x.typ in new ENUM([ints, bools, chars, notyp]))){
            Error(23);
            return;
          }
          lc1 = lc;
          emit2(linecount, 12, x.typ, 0);
          if (sy == ofsy)
            insymbol();
          else
            Error(8);
          onecase();
          while(isOk && sy != endsy)
            onecase();
          kode[lc1].y = lc;
          for (k = 1; k <= i; k++) {
            emit1(linecount, 13, casetab[k].val);
            emit1(linecount, 13, casetab[k].lc);
          }
          emit1(linecount, 10, elselc);
          for (k = 1; k <= j; k++){
            kode[exittab[k]].y = lc;
						kode[exittab[k]].line = linecount;
					}
          if (sy == endsy)
            insymbol();
          else
            Error(57);
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//casestatement

      function repeatstatement(){
        try{
          var x = new item;
          var lc1;
          lc1 = lc;
          insymbol();
          statement(fsys.copy(untilsy));
          while(isOk && sy in statbegsys.copy(ident)){
            statement(fsys.copy([semicolon, untilsy]));
            if(sy == semicolon){
              Error(7);
              insymbol();
            }
          }
          if (sy == untilsy){
            insymbol();
            expression(fsys, x);
            if (!(x.typ in new ENUM([bools, notyp])))
              Error(17, x.typ);
            var line;
            line = linecount;
            while(isOk && InputFile[line].length == 0) {
              line--;
            }
            emit1(line, 11, lc1);
          }
          else
            Error(53);
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//repeatstatement

      function whilestatement(){
        try{
          var x = new item("", 0);
          var lc1, lc2;
          insymbol();
          lc1 = lc;
          expression(fsys.copy(dosy), x);
          if (!(x.typ in new ENUM([bools, notyp])))
            Error(17, x.typ);
          lc2 = lc;
          emit(linecount, 11);
          if (sy == dosy)
            insymbol();
          else
            Error(54);
          statement(fsys);
          var line;
          line = linecount;
          do {
            line--;
          } while(isOk && InputFile[line].length == 0);
          emit1(line, 10, lc1);
          kode[lc2].y = lc;
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }

      function forstatement(){
        try{
          var cvt, x, i, f, lc1, lc2;
          x = new item("", 1);
          insymbol();
          if (sy == ident){
            i = loc(id);
            insymbol();
            if (i == 0)
              cvt = ints;
            else
            if (tab[i].obj == variable){
              cvt = tab[i].typ;
              emit2(linecount, 0, tab[i].lev, tab[i].adr);
              if (!(cvt in new ENUM([notyp, ints, bools, chars, reals])))
                Error(18, tab[i].name);
            }
            else {
              Error(37);
              cvt = ints;
            }
          }
          else
            skip(fsys.copy([ofsy, tosy, downtosy, dosy]), 2);
          if (sy == ofsy){
            insymbol();
            expression(fsys.copy([untilsy, downtosy, dosy]), x);
            if (x.typ != cvt)
            Error(19, cvt);
          }
          else
            skip(fsys.copy([untilsy, ofsy]), 8);
          f = 14;
          var steptyp = TAM_INT;
          if (sy == untilsy){
            insymbol();
            var p = new item;
            expression(fsys.copy([stepsy, dosy]), p);
            if (p.typ != cvt)
              Error(19, cvt);
            else{
              if (sy == stepsy){
                insymbol();
                var stepitem = new item;
                expression(fsys.copy([dosy]), stepitem);
                if(stepitem.typ != cvt)
                  Error(19, cvt, stepitem.typ);
              }
              else
                emit2(linecount, 24, cvt, 1);

            }
          }
          else {
            Error(53);
          }
          lc1 = lc;
          if (kode[lc-1].f == 36)
            f = 16;
          emit2(linecount, f, cvt, 0);
          if (sy == dosy)
            insymbol();
          else
              Error(54);
          lc2 = lc;
          statement(fsys);
          var line;
          line = linecount;
          do {
            line--;
          } while(isOk && InputFile[line].length == 0);
          emit2(line, f+1, cvt, lc2);
          kode[lc1].y = lc;
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }//forstatement

      function returnstatement(){
        if(isfun){
          insymbol();
          if(sy in constbegsys){
            emit2(linecount, 0, level, 0);
            var returnItem = new item;
            expression(fsys, returnItem);
            if(returnItem.typ == tab[prt].typ){
              emit2(linecount, 38, tab[prt].typ, 1);
              var len;
              switch (tab[prt].typ) {
                case reals: len = TAM_REAL; break;
                case chars:
                case bools: len = TAM_CHAR; break;
                default:  len = TAM_INT ;
              }
              emit1(linecount, 33, len);
            }
            else
              Error(73, returnItem.typ, tab[prt].typ, linecount);
          }
        }
        else
          Error(72);
      }//returnstatement

      function standproc(n){
        try{
          var i, f;
          var x, y;
          x = new item();
          y = new item();
          switch (n) {
            case 1:
            case 2:
            if (!(iflag)){
              Error(20);
              iflag = true;
            }
            if (sy == lparent){
              do{
                insymbol();
                if (sy != ident)
                Error(2, "leia");
                else {
                  i = loc(id);
                  insymbol();
                  if (i != 0)
                  if (tab[i].obj != variable)
                  Error(37);
                  else{
                    x.typ = tab[i].typ;
                    x.ref = tab[i].ref;
                    if (tab[i].normal)
                    f = 0;
                    else
                    f = 1;
                    if(sy == ptr && x.typ == pointers){
                      insymbol();
                      x.typ = tab[i].xtyp;
                      f++;
                    }
                    else if (sy == ptr) {
                      Error(63);
                    }
                    emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                    if (sy in new ENUM([lbrack, lparent, period])){
                    selector(fsys.copy([comma, rparent]), x, false);
                    }
                    if (x.typ in new ENUM([ints, reals, chars, notyp, strings]))
                    emit1(linecount, 27, types[x.typ]);
                    else
                    Error(40);
                  }
                }
                test(new ENUM([comma, rparent, ident]), new ENUM([comma, rparent]), fsys, 6);
              }while(isOk && sy == comma);
              if (sy == rparent)
              insymbol();
              else
              Error(4);
            }
            if (n == 2)
            emit(linecount, 62);
            break;
            case 3:
            case 4:
            if (sy == lparent){
              do{
                insymbol();
                if (sy == stringsy){
                  emit1(linecount, 24, sleng);
                  emit1(linecount, 28, inum);
                  insymbol();
                }
                else {
                  expression(fsys.copy([comma, colon, rparent]), x);
                  if (!(x.typ in stantyps))
                    Error(41);
                  if (sy == colon){
                    insymbol();
                    expression(fsys.copy([comma, colon, rparent]), y);
                    if (y.typ != ints)
                    Error(43);
                    if (sy == colon){
                      if (x.typ != reals)
                      Error(42);
                      insymbol();
                      expression(fsys.copy([comma, rparent]), y);
                      if (y.typ != ints)
                      Error(43);
                      emit(linecount, 37);
                    }
                    else
                      emit1(linecount, 30, types[x.typ]);
                  }
                  else
                    emit1(linecount, 29, types[x.typ]);
                }
              }while(isOk && sy == comma);
              if (sy == rparent)
              insymbol();
              else
              Error(4);
            }
            if(n == 4)
              emit1(linecount, 45);
            break;
            case 21:
              if(sy == lparent)
                insymbol();
              else
                Error(9);
              if (sy != ident)
                Error(2, "strinsere");
              else {
                i = loc(id);
                insymbol();
                if (i != 0)
                  if (tab[i].obj != variable){
                    Error(37);
                  }
                  else{
                    if(tab[i].typ != strings){
                      Error(67);
                    }
                    else {
                      x = new item;
                      x.typ = strings;
                      if(tab[i].normal)
                        f = 0;
                      else
                        f = 1;
                      emit2(linecount, f, tab[i].lev, tab[i].adr, strings);
                    }
                  }
                else
                  Error(0);
              }
              if (sy == comma){
                insymbol();
                var y = new item;
                expression(fsys.copy([comma, rparent]), y);
                if (sy == comma){
                  insymbol();
                  var z = new item;
                  expression(fsys.copy([comma, rparent]), z);
                  if (x.typ == strings){
                    if (y.typ == ints){
                      if (z.typ == strings || z.typ == chars){
                        if(z.typ == chars)
                          emit1(linecount, 25, 1);
                        emit(linecount, 61);
                        if(sy == rparent)
                          insymbol();
                      }
                      else
                        Error(36, z.typ, strings);
                    }
                    else
                      Error(36, y.typ, ints);
                  }
                  else
                    Error(36, x.typ, strings);
                }
                else
                  Error(62, 3);
              }
              else
                Error(62,2);
            break;
            case 22:
              if(sy == lparent){
                insymbol();
                if(sy == ident){
                  i = loc(id);
                  if(i == 0)
                    Error(0);
                  if(tab[i].obj != variable)
                    Error(37);
                  expression(fsys.copy(rparent), x);
                  if(x.typ == pointers){
                    var length = 1;
                    switch (tab[i].xtyp) {
                      case strings:
                      case pointers:
                      case ints:
                        length = TAM_INT;
                      break;
                      case reals:
                        length = TAM_REAL;
                      break;
                      case chars:
                      case bools:
                        length = TAM_CHAR;
                      break;
                      case arrays:
                        length = atab[tab[i].ref].size;
                      break;
                      case records:
                        length = btab[tab[i].ref].vsize;
                      break;
                      default:
                        Error(30);
                    }
                    emit1(linecount, 70, length);
                    insymbol();
                  }
                  else
                    Error(36);
                }
                else
                  Error(2);
              }
              else
                Error(9, x.typ, ints);
            break;
            case 23:
              expression(fsys.copy([rparent]), x);
              if(x.typ == ints)
                emit(linecount, 73);
              else
                Error(36, x.typ, ints);
              if(sy == rparent)
                insymbol();
            break;
            case 24:
              if(sy == lparent){
                insymbol();
                if(sy == ident){
                  if(tab[loc(id)].obj != variable && loc(id) != 0)
                    Error(37);
                  var str_xtp = new item;
                  expression(fsys.copy(comma), str_xtp);
                  if(str_xtp.typ != strings)
                    Error(36, str_xtp.typ, strings);
                  else {
                    if(sy == comma)
                      insymbol()
                    var i_xtp = new item;
                    expression(fsys.copy(comma), i_xtp);
                    if(i_xtp.typ != ints)
                      Error(36, i_xtp.typ, ints);
                    else {
                      if(sy == comma)
                        insymbol();
                      var n_xtp = new item;
                      expression(fsys.copy(rparent), n_xtp);
                      if(n_xtp.typ != ints)
                        Error(36, n_xtp.typ, ints);
                      else
                        emit(linecount, 75);
                    }

                  }
                }
                else
                  Error(2);
                if(sy == rparent)
                  insymbol();
                else
                  Error(4);
              }
              else
                Error(9);
            break;
          }
        }
        catch(err){
          isOk = false;
          MsgErro = err;
        }
      }
      try{
        if (sy in statbegsys.copy(ident))
        switch (sy) {
          case ident:
          i = loc(id);
          insymbol();
          if (i != 0)
          switch (tab[i].obj) {
            case konstant:
            case type1:
              Error(45);
            break;
            case variable:
            assignment(tab[i].lev, tab[i].adr);
            break;
            case prozedure:
            if (tab[i].lev != 0)
            call(fsys,i);
            else
            standproc(tab[i].adr);
            break;
            case funktion:
            if (tab[i].ref == display[level])
            assignment(tab[i].lev+1, 0);
            else
            Error(45);
            break;
          }
          break;
          case beginsy:         //Linha 1982 do código original está Beginsy, verificar correção
          compoundstatement();
          break;
          case ifsy:
          ifstatement();
          break;
          case casesy:
          casestatement();
          break;
          case whilesy:
          whilestatement();
          break;
          case repeatsy:
          repeatstatement();
          break;
          case forsy:
          forstatement();
          break;
          case returnsy:
          returnstatement();
          break;
        }
        if (sy == semicolon){
          Error(7);
          insymbol();
        }
        test(new ENUM([ident, realcon, intcon, charcon, bools]), fsys.copy([ident, realcon, intcon, stringsy, charcon, bools]), new ENUM, 6);
      }
      catch(err){
        isOk = false;
        MsgErro = err;
      }
    }//statement
  try{
    dx = 4*TAM_INT;
    prt = t;
    if (level > lmax)
    fatal(5);
    EnterBlock();
    display[level] = b;
    prb = b;
    tab[prt].typ = notyp;
    tab[prt].ref = prb;
    if (sy == lparent)
    parameterlist();
    btab[prb].lastpar = t;
    if (isfun)
      if (sy == colon){
        insymbol();
        if (sy == ident){
          x = loc(id);
          insymbol();
          if (x != 0)
            if (tab[x].obj != type1)
              Error(29);
            else if (tab[x].typ in stantyps)
              tab[prt].typ = tab[x].typ;
            else
              Error(15);
          else
              Error(0);
          var len;
          switch (tab[prt].typ) {
            case reals: len = TAM_REAL;  break;
            case bools:
            case chars: len = TAM_CHAR;  break;
            default: len = TAM_INT;
          }
          dx += len;
          var prt1 = prt+1;
          while(prt1 <= t){
            tab[prt1].adr += len;
            prt1++;
          }
        }
        else
        skip(fsys.copy(semicolon), 2);
      }
      else
        Error(5);
    btab[prb].psize = dx;
    do{
      if (sy == constsy)
        constantdeclaration();
      if (sy == typesy)
        typedeclaration();
      if (sy == varsy)
        variabledeclaration();
      btab[prb].vsize = dx;
      while(isOk && sy in new ENUM([proceduresy, functionsy]))
        procdeclaration();
      if(sy == semicolon){
        Error(7);
        insymbol();
      }
      test(new ENUM(beginsy), new ENUM(beginsy), blockbegsys.copy(statbegsys), 56);
      if (!isOk)
        return;
    }while(isOk && !(sy in statbegsys));
    tab[prt].adr = lc;
    insymbol();
    statement(fsys.copy([semicolon, endsy, elsesy]));
    while(isOk && sy != endsy){
      if (!isOk)
        return;
      if (sy in statbegsys.copy(ident) && ch != "?")
        statement(fsys.copy([semicolon, endsy, elsesy]));
      else {
        if (sy == semicolon){
          Error(7);
          insymbol();
        }
        else{
          insymbol();
          Error();
          if (ch == "?")
            break;
        }
      }

    }
    if (ch != "?")
      insymbol();
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
}//block
try{
  key[1] = 'e'; key[2] = 'arranjo';
  key[3] = 'inicio'; key[4] = 'caso';
  key[5] = 'const'; key[6] = 'div';
  key[7] = 'faca'; //key[8] = 'decrementa';
  key[9] = 'senao'; key[10] = 'fim';
  key[11] = 'para'; key[12] = 'funcao';
  key[13] = 'se'; key[14] = 'mod';
  key[15] = 'nao'; key[16] = 'de';
  key[17] = 'ou'; key[18] = 'procedimento';
  key[19] = 'programa'; key[20] = 'registro';
  key[21] = 'repita'; key[22] = 'entao';
  key[24] = 'tipo';
  key[25] = 'ate'; key[26] = 'var';
  key[27] = 'enquanto'; key[28] = 'ref';
  key[29] = "passo"; key[30] = 'retorne';
  ksy[1] = andsy; ksy[2] = arraysy;
  ksy[3] = beginsy; ksy[4] = casesy;
  ksy[5] = constsy; ksy[6] = idiv;
  ksy[7] = dosy; ksy[8] = downtosy;
  ksy[9] = elsesy; ksy[10] = endsy;
  ksy[11] = forsy; ksy[12] = functionsy;
  ksy[13] = ifsy; ksy[14] = imod;
  ksy[15] = notsy; ksy[16] = ofsy;
  ksy[17] = orsy; ksy[18] = proceduresy;
  ksy[19] = programsy; ksy[20] = recordsy;
  ksy[21] = repeatsy; ksy[22] = thensy;
  ksy[23] = tosy; ksy[24] = typesy;
  ksy[25] = untilsy; ksy[26] = varsy;
  ksy[27] = whilesy; ksy[28] = refsy;
  ksy[29] = stepsy; ksy[30] = returnsy
  sps['+'] = plus; sps['-'] = minus;
  sps['*'] = times; sps['/'] = rdiv;
  sps['('] = lparent; sps[')'] = rparent;
  sps['='] = eql; sps[','] = comma;
  sps['['] = lbrack; sps[']'] = rbrack;
  sps['#'] = neq; sps['&'] = andsy;
  sps[';'] = semicolon;   sps['^'] = ptr; sps['@'] = addr;
  xsps[0] = plus; xsps[1] = minus;
  xsps[2] = times; xsps[3] = rdiv;
  xsps[4] = lparent; xsps[5] = rparent;
  xsps[6] = eql; xsps[7] = comma;
  xsps[8] = lbrack; xsps[9] = rbrack;
  xsps[10] = neq; xsps[11] = andsy;
  xsps[12] = semicolon;   xsps[13] = ptr; xsps[14] = addr;
  nsps[0] = 'adição'; nsps[1] = 'subtração';
  nsps[2] = 'multiplicação'; nsps[3] = 'divisão';
  nsps[4] = 'parentese esquerdo'; nsps[5] = 'parentese direito';
  nsps[6] = 'igual'; nsps[7] = 'vírgula';
  nsps[8] = 'colchete esquerdo'; nsps[9] = 'colchete direito';
  nsps[10] = 'diferente'; nsps[11] = 'e lógico';
  nsps[12] = 'ponto e vírgula';   nsps[13] = 'circunflexo'; nsps[14] = "arroba";
  csps[0] = "+";  csps[1] = "-" ; csps[2] = "*";
  csps[3] = "/";  csps[4] = "(";  csps[5] = ")";
  csps[6] = "=";  csps[7] = ","; csps[8] = "[";
  csps[9] = "]";  csps[10] = "#"; csps[11] = "&";
  csps[12] = ";"; csps[13] = "^"; csps[14] = "@";
  constbegsys = new ENUM([plus, minus, intcon, realcon, charcon, ident, stringsy]);
  typebegsys = new ENUM([ident, arraysy, recordsy]);
  blockbegsys = new ENUM([constsy, typesy, varsy, proceduresy, functionsy, beginsy]);
  facbegsys = new ENUM([intcon, realcon, charcon, stringsy, ident, lparent, notsy]);
  statbegsys = new ENUM([beginsy, ifsy, whilesy, repeatsy, forsy, casesy, returnsy]);
  stantyps = new ENUM([notyp, ints, reals, bools, chars, strings, pointers]);
  lc = 0;
  ll = 0;
  cc = 0;
  ilnx = 0;
  ccx = 0;
  linecount = 0;
  charcount = 0;
  ch = " ";
  iln = 0;
  errpos = 0;
  errs = [];
  limparCodeBox();
  insymbol();
  t = -1;
  a = 0;
  b = 1;
  sx = 0;
  c2 = 0;
  display[0] = 1;
  display[1] = 1;
  display[2] = 1;
  iflag = true;
  oflag = true;
  if (sy != programsy){
    Error(3);
  }
  else {
    insymbol();
    if (sy != ident)
    Error(2, "progname");
    else {
      progname = id;
      insymbol()
      if(sy == lparent){
        Error(66);
        insymbol();
        if(sy == rparent)
          insymbol();
      }
    }
  }
  enter('', variable, notyp, 0);
  enter('verdadeiro', konstant, bools, 1);
  enter('falso', konstant, bools, 0);
  enter('nulo', konstant, pointers, 0);
  enter('real', type1, reals, TAM_REAL);
  enter('caractere', type1, chars, TAM_CHAR);
  enter('logico', type1, bools, TAM_BOOL);
  enter('inteiro', type1, ints, TAM_INT);
  enter('string', type1, strings, TAM_INT);
  enter("ponteiro", type1, pointers, TAM_INT);
  enter('abs', funktion, reals, 0);
  enter('sqr', funktion, reals, 2);
  enter('odd', funktion, bools, 4);
  enter('chr', funktion, chars, 5);
  enter('ord', funktion, ints, 6);
  enter('succ', funktion, chars, 7);
  enter('pred', funktion, chars, 8);
  enter('arred', funktion, ints, 9);
  enter('trunca', funktion, ints, 10);
  enter('seno', funktion, reals, 11);
  enter('cosseno', funktion, reals, 12);
  enter('exp', funktion, reals, 13);
  enter('log', funktion, reals, 14);
  enter('sqrt', funktion, reals, 15);
  enter('arctan', funktion, reals, 16);
  enter('strmax', funktion, strings, 17);
  enter('strmin', funktion, strings, 18);
  enter('leia', prozedure, notyp, 1);
  enter('strtmo', funktion, ints, 19);
  enter('strbusca', funktion, ints, 20);
  enter('strins', prozedure, strings, 21);
  enter('aloca', funktion, pointers, 22);
  enter('bytes', funktion, ints, 21);
  enter('desaloca', prozedure, notyp, 22);
  enter('escreva', prozedure, notyp, 3);
  enter('escrevaln', prozedure, notyp, 4);
  enter('aleatorio', funktion, ints, 23);
  enter('semente', prozedure, notyp, 23)
  enter('tempo', funktion, ints, 24);
  enter('strdel', prozedure, notyp, 24);
  enter('', prozedure, notyp, 0);
  //Inicialização de tabelas
  btab[1] = new Tbtab;
  kode[0] = new order;
  tab[0] = new Ttab;
  atab[1] = new Tatab;
  btab[1].last = t;
  btab[1].lastpar = 1;
  btab[1].psize = 0;
  btab[1].vsize = 0;
  block(blockbegsys.copy(statbegsys), false, 1);
  isDone = true;
  finalInst = lc;
  emit(ilnx, 31);

  if (btab[2].vsize > stacksize)
    Error(49);
  }
  catch (err){
    isOk = false;
    MsgErro = err;
  }
  finally{
      if (isOk)
        MsgErro = "Compilação finalizada com sucesso.";
			if(Interpreter.isRunning())
				Interpreter._crash();
  }

}//CompiladorPascalS
