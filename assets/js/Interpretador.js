const Interpreter = new function(){
	//variáveis de controle do interpretador
	var ir
	,		pc
	,		b
	,		h1, h2, h3, h4, h5
	,		startTime
	,		isRunning = false
	,		intervalExecution
	,		display
	,		readingInstruction = false
	,		out = []
	,		hasErrors
	,		outdebug = false
	,		bydebug = false;

	const	MEMORY = new MemoryObject()
	,			STRING = new StringObject(MEMORY)	//passando o escopo de MEMORY
	,			DEBUGGER = new DebugObject(MEMORY)
	,			RANDOM = new RandomGen()
	,			INPUT = new InputObject(MEMORY);

//Acesso público para as constantes.
	this._STRING = STRING;
	this._INPUT = INPUT
	this._DEBUGGER = DEBUGGER;

	this.init = function(){
		if(isDone && isOk){
			mostraBtExecucarNovamente(false);
			MEMORY.init();
			MEMORY.pushInt(0);
			MEMORY.pushInt(0);
			MEMORY.pushInt(-1);
			MEMORY.pushInt(btab[1].last);
			readComplete = false;
			startTime = new Date().getTime();
			elapsedTime = 0;
			b = 0;
			MEMORY.markStack(btab[2].vsize);
			display = [];
			display[1] = 0;
			outputConsole = document.getElementById("output");
			limpaConsole();
			pc = tab[MEMORY.getInt(12)].adr;
			hasErrors = false;
			readingInstruction = false;
			isRunning = true;
		}
		else{
			MsgErro = "O programa precisa ser compilado corretamente antes de ser executado!\nVocê pode compilar pressionando F9."
			mostraErro();
		}
	}

	this.isReadingInstruction = function(){
		return readingInstruction;
	}

	this.isRunning = function(){
		return isRunning;
	}

	executeStatements = function(){
		isRunning = true;
		run = true;
		do {
			ir = kode[pc];
			pc++;
			if (DEBUGGER.isRunning){
				if (ir.line > DEBUGGER.stopLine){
				   	if(DEBUGGER.state == IN || DEBUGGER.state == OVER){
							mostraLinhaDepurador(ir.line);
							pause();
							pc--;
							DEBUGGER.state = IDLE;
							break;
						}
				}
				else if (DEBUGGER.state == UNTIL && ir.line == DEBUGGER.stopLine){
					mostraLinhaDepurador(ir.line);
					pause();
					pc--;
					DEBUGGER.state = IDLE;
					break;
				}
				if(ir.line != DEBUGGER.lastLine ){
					DEBUGGER.incrementLine(ir.line);
					DEBUGGER.lastLine = ir.line;
				}
			}
			switch(ir.f){
				case 0:
					MEMORY.pushInt(display[ir.x]+ir.y)
				break;
				case 1:
					switch (ir.z) {
						case "reals":
							MEMORY.pushFloat(MEMORY.getFloat(display[ir.x]+ir.y));
						break;
						case "chars":
							MEMORY.pushChar(MEMORY.getChar(display[ir.x]+ir.y));
						break;
						case "bools":
							MEMORY.pushBoolean(MEMORY.getBoolean(display[ir.x]+ir.y));
						break;
						default:
							MEMORY.pushInt(MEMORY.getInt(display[ir.x]+ir.y));
					}
				break;
				case 2:
					switch (ir.z) {
						case "reals":
							MEMORY.pushFloat(MEMORY.getFloat(MEMORY.getInt(display[ir.x]+ir.y)));
						break;
						case "chars":
							MEMORY.pushChar(MEMORY.getChar(MEMORY.getInt(display[ir.x]+ir.y)));
						break;
						case "bools":
							MEMORY.pushBoolean(MEMORY.getBoolean(MEMORY.getInt(display[ir.x]+ir.y)));
						break;
						default:
							MEMORY.pushInt(MEMORY.getInt(MEMORY.getInt(display[ir.x]+ir.y)));
					}
				break;
				case 3:
					h1 = ir.y;
					h2 = ir.x;
					h3 = b;
					do{
						display[h1] = h3;
						h1--;
						h3 = MEMORY.getInt(h3 + 2*TAM_INT);
					}while( h1 == h2);
				break;
				case 8:
					switch (ir.y) {
						case 0:
							MEMORY.PushInt(Math.abs(MEMORY.popInt()));
						break;
						case 1:
							MEMORY.pushFloat(Math.abs(MEMORY.popFloat()));
						break;
						case 2:
							MEMORY.pushInt(Math.pow(MEMORY.popInt(), 2));
						break;
						case 3:
							MEMORY.pushFloat(Math.pow(MEMORY.popFloat(), 2));
						break;
						case 4:
							MEMORY.pushBoolean(MEMORY.popInt()%2 != 0);
						break;
						case 5:
							MEMORY.pushChar(String.fromCharCode(MEMORY.popInt()));
						break;
						case 6:
							MEMORY.pushInt(MEMORY.popChar().charCodeAt());
						break;
						case 7:
							MEMORY.pushUint8((MEMORY.popUint8()+1));
						break;
						case 8:
							MEMORY.pushUint8((MEMORY.popUint8()-1));
						break;
						case 9:
							MEMORY.pushInt(Math.round(MEMORY.popFloat()));
						break;
						case 10:
							MEMORY.pushInt(Math.floor(MEMORY.popFloat()));
						break;
						case 11:
							MEMORY.pushFloat(Math.sin(MEMORY.popFloat()));
						break;
						case 12:
							MEMORY.pushFloat(Math.cos(MEMORY.popFloat()));
						break;
						case 13:
							MEMORY.pushFloat(Math.exp(MEMORY.popFloat()));
						break;
						case 14:
							MEMORY.pushFloat(Math.log(MEMORY.popFloat()));
						break;
						case 15:
							MEMORY.pushFloat(Math.sqrt(MEMORY.popFloat()));
						break;
						case 16:
							MEMORY.pushFloat(Math.atan(MEMORY.popFloat()));
						break;
					}//switch case 8
				break;
				case 9:
					MEMORY.pushInt(MEMORY.popInt() + ir.y); //offset
				break;
				case 10://pulo incondicional
					pc = ir.y;
					if(DEBUGGER.state == IN){
						DEBUGGER.stopLine = kode[pc].line;
						mostraLinhaDepurador(DEBUGGER.stopLine);
						DEBUGGER.stopLine--;
					}
				break;
				case 11:    //pulo condicional
					if (!MEMORY.popBoolean()){
						pc = ir.y;
						if(DEBUGGER.state == IN){
							DEBUGGER.stopLine = kode[pc].line-1;
							mostraLinhaDepurador(DEBUGGER.stopLine+1);
						}
					}
				break;
				case 12:     //switch
					switch (ir.x) {
						case "ints":
							h1 = MEMORY.popInt();
						break;
						case "reals":
							h1 = MEMORY.popFloat();
						break;
						case "chars":
						case "bools":
							h1 = MEMORY.popUint8();
						break;
					}
					h2 = ir.y;
					h3 = 0;
					do {
						if (kode[h2].f != 13){
							if (kode[h2].f == 10){
								pc = (kode[h2].y == 0)? h2+1 : kode[h2].y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
								break;
							}
							h3 = 1;
							crash('case:unknown');
						}
						else{
							if (kode[h2].y == h1){
								h3 = 1;
								pc = kode[h2 + 1].y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								h2 += 2;
						}
					}while (h3 == 0);
				break;
				case 14:
					switch (ir.x) {
						case reals:
							h1 = MEMORY.getFloat(MEMORY.getTopOfStack() - 24);	//Acessar um valor real 24 bytes abaixo do topo.
							if(h1 <= MEMORY.getFloat(MEMORY.getTopOfStack() - 16))
								MEMORY.setFloat(MEMORY.getInt(MEMORY.getTopOfStack() - 28), h1);
							else {
								MEMORY.popBlock(28);	//3 valores reais + 1 inteiro
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
						break;
						case ints:
							h1 = MEMORY.getInt(MEMORY.getTopOfStack() - 12);
							if(h1 <= MEMORY.getInt(MEMORY.getTopOfStack() - 8))
								MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 16), h1);
							else {
								MEMORY.popBlock(16);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
						break;
						case chars:
							h1 = MEMORY.getUint8(MEMORY.getTopOfStack() - 3);
							if(h1 <= MEMORY.getUint8(MEMORY.getTopOfStack() - 2))
								MEMORY.setUint8(MEMORY.getInt(MEMORY.getTopOfStack() - 7), h1);
							else {
								MEMORY.popBlock(7);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
						break;
					}
				break;
				case 15:
					switch (ir.x) {
						case reals:
							h2 = MEMORY.getInt(MEMORY.getTopOfStack() - 28);
							h1 = MEMORY.getFloat(h2) + MEMORY.getFloat();
							if(h1 <= MEMORY.getFloat(MEMORY.getTopOfStack() - 16)){
								MEMORY.setFloat(h2,h1);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									atualizaVariavel(h2, h1);
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								MEMORY.popBlock(28);
						break;
						case ints:
							h2 = MEMORY.getInt(MEMORY.getTopOfStack() - 16);
							h1 = MEMORY.getInt(h2) + MEMORY.getInt();
							if(h1 <= MEMORY.getInt(MEMORY.getTopOfStack() - 8)){
								MEMORY.setInt(h2,h1);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									atualizaVariavel(h2, h1);
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								MEMORY.popBlock(16);
						break;
						case chars:
							h2 = MEMORY.getInt(MEMORY.getTopOfStack() - 7);
							h1 = MEMORY.getUint8(h2) + MEMORY.getUint8();
							if(h1 <= MEMORY.getUint8(MEMORY.getTopOfStack() - 2)){
								MEMORY.setUint8(h2,h1);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									atualizaVariavel(h2, h1);
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								MEMORY.popBlock(7);
						break;
					}
				break;
				case 16:
					switch (ir.x) {
						case reals:
							h1 = MEMORY.getFloat(MEMORY.getTopOfStack() - 24);
							if(h1 >= MEMORY.getFloat(MEMORY.getTopOfStack() - 16))
								MEMORY.setFloat(MEMORY.getInt(MEMORY.getTopOfStack() - 28), h1);
							else {
								MEMORY.popBlock(28);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
						break;
						case ints:
							h1 = MEMORY.getInt(MEMORY.getTopOfStack() - 12);
							if(h1 >= MEMORY.getInt(MEMORY.getTopOfStack() - 8))
								MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 16), h1);
							else {
								MEMORY.popBlock(16);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
						break;
						case chars:
							h1 = MEMORY.getUint8(MEMORY.getTopOfStack() - 3);
							if(h1 >= MEMORY.getUint8(MEMORY.getTopOfStack() - 2))
								MEMORY.setUint8(MEMORY.getInt(MEMORY.getTopOfStack() - 7), h1);
							else {
								MEMORY.popBlock(7);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
						break;
					}
				break;
				case 17:
					switch (ir.x) {
						case reals:
							h2 = MEMORY.getInt(MEMORY.getTopOfStack() - 28);
							h1 = MEMORY.getFloat(h2) + MEMORY.getFloat();
							if(h1 >= MEMORY.getFloat(MEMORY.getTopOfStack() - 16)){
								MEMORY.setFloat(h2,h1);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									atualizaVariavel(h2, h1);
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								MEMORY.popBlock(28);
						break;
						case ints:
							h2 = MEMORY.getInt(MEMORY.getTopOfStack() - 16);
							h1 = MEMORY.getInt(h2) + MEMORY.getInt();
							if(h1 >= MEMORY.getInt(MEMORY.getTopOfStack() - 8)){
								MEMORY.setInt(h2,h1);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									atualizaVariavel(h2, h1);
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								MEMORY.popBlock(16);
						break;
						case chars:
							h2 = MEMORY.getInt(MEMORY.getTopOfStack() - 7);
							h1 = MEMORY.getUint8(h2) + MEMORY.getUint8();
							if(h1 >= MEMORY.getUint8(MEMORY.getTopOfStack() - 2)){
								MEMORY.setUint8(h2,h1);
								pc = ir.y;
								if(DEBUGGER.state == IN){
									DEBUGGER.stopLine = kode[pc].line;
									atualizaVariavel(h2, h1);
									mostraLinhaDepurador(DEBUGGER.stopLine);
									DEBUGGER.stopLine--;
								}
							}
							else
								MEMORY.popBlock(7);
						break;
					}
				break;
				case 18:
					h1 = btab[tab[ir.y].ref].vsize;
					if (!MEMORY.HasAvailableSpaceInStack(h1))
						crash('alloc:nospace:stack');
					else{
						if (tab[ir.y].obj == "prozedure")
							MEMORY.pushBlock(16);
						else
							switch (tab[ir.y].typ) {
								case reals: MEMORY.pushBlock(24);  break;
								case bools:
								case chars: MEMORY.pushBlock(17);
								default:  MEMORY.pushBlock(20);
							}
						MEMORY.setInt(MEMORY.getTopOfStack() - 8, h1);
						MEMORY.setInt(MEMORY.getTopOfStack() - 4, ir.y);
					}
				break
				case 19:
					h1 = MEMORY.getTopOfStack() - ir.y; //bytes até a base
					h5 = h1;    //Posição de inicio da pilha do procedimento ou função
					switch (ir.x) {//espaço para o retorno da função
						case reals: h1 += 8; break;
						case bools:
						case chars: h1++; break;
						case notyp: h1 = h1; break; //Procedimento não tem retorno, não precisa alocar espaço
						default:  h1 += 4;
					}
					h2 = MEMORY.getInt(h1 + 12); //{referência para tab}
					h3 = tab[h2].lev;
					display[h3 + 1] = h5;
					h4 = MEMORY.getInt(h1 + 8) + h1;
					MEMORY.setInt(h1, pc);
					MEMORY.setInt(h1 + 4, display[h3]);
					MEMORY.setInt(h1 + 8, b);
					for (h3 = MEMORY.getTopOfStack();  h3 < h4;  h3++)
							MEMORY.setUint8(h3, 0);
					b = h5;
					MEMORY.markStack(h4);
					pc = tab[h2].adr;
					if(DEBUGGER.isRunning){
						if(DEBUGGER.state == IN){
							DEBUGGER.stopLine = kode[tab[h2].adr].line;
							mostraLinhaDepurador(DEBUGGER.stopLine--);
						}
						DEBUGGER.showVariablesToUser(h2);
						//carregaVariaveis(h2+1);
						adicionarTabelaPilha(tab[h2].name);
					}
				break;
				case 20:
					h1 = ir.y; //apontador para atab
					h2 = atab[h1].low;
					switch (atab[h1].inxtyp) {
						case "bools":
						case "chars":
							h3 = MEMORY.popUint8();
						break;
						default:
							h3 = MEMORY.popInt();
					}
					if (h3 < h2)
						crash('index:outside:array');
					else{
						if (h3 > atab[h1].high)
							crash('index:outside:array');
						else
							MEMORY.pushInt(MEMORY.popInt()+h3-h2);
					}
				break;
				case 21:
					h1 = ir.y; //apontador para atab
					h2 = atab[h1].low;
					switch (atab[h1].inxtyp) {
						case "reals":
							crash('index:outside:array');
						break;
						case "bools":
						case "chars":
							h3 = MEMORY.popUint8();
						break;
						default:
							h3 = MEMORY.popInt();
					}
					if (h3 < h2)
						crash('index:outside:array');
					else
					if (h3 > atab[h1].high)
						crash('index:outside:array');
					else
						MEMORY.pushInt(MEMORY.popInt() + (h3 - h2) * atab[h1].elsize);
				break;
				case 22:
					h1 = MEMORY.popInt();
					h2 = ir.y + MEMORY.getTopOfStack();
					if(h2 > StartAddressMemory)
						crash('alloc:nospace:stack');
					else
						while (MEMORY.getTopOfStack() < h2) {
							MEMORY.pushIt(MEMORY.getInt(h1));
							h1 += 4;
						}
				break;
				case 23:
					h2 = MEMORY.popInt();
					h1 = MEMORY.popInt();
					h3 = h1 + ir.y;
					while (h1 < h3){
						MEMORY.setInt(h1, MEMORY.getInt(h2));
						h1 += 4;
						h2 += 4;
					}
				break;
				case 24://Carrega valor literal na pilha
					if (!MEMORY.HasAvailableSpaceInStack(ir.x == reals ? 8 : ir.x == chars || ir.x == bools ? 1 : 4))
						crash('alloc:nospace:stack');
					else
						switch (ir.x) {
						case "reals":
							MEMORY.pushFloat(rconst[ir.y]);
						break;
						case "chars":
						case "bools":
							MEMORY.pushUint8(ir.y);
						break;
						case "strings":
							MEMORY.pushString(MEMORY.setString(ir.y, 0, true));
						break;
						default:
							MEMORY.pushInt(ir.y);
						}
				break;
				case 25://Conversão caractere para string
					switch (ir.y) {
						case 1:
							MEMORY.pushInt(MEMORY.setString(MEMORY.popChar(), 0, true));
						break;
						case 2:
							h1 = MEMORY.popString();
							MEMORY.pushString(MEMORY.setString(MEMORY.popChar(), 0, true));
							MEMORY.pushString(h1);
						break;
					}
				break;
				case 26:  //Conversão inteiro para real
					if (ir.y == 4)
						MEMORY.pushFloat(MEMORY.popInt());
					else if(ir.y == 8){
						h1 = MEMORY.popFloat();
						MEMORY.pushFloat(MEMORY.popInt()); //Converte o dado no topo da pilha de inteiro pra real
						MEMORY.pushFloat(h1);
					}
					break;
				case 27:    //INSTRUÇÃO DE LEITURA
					INPUT.inputData(ir.y);
					pause();
				break;
				case 28:    //Impressão string literal
					h1 = MEMORY.popInt();
					h2 = ir.y;
					atualizarConsole(stab.slice(h2, h2+h1).join(""));
					printToUser();
				break;
				case 29:
					switch (ir.y) {
						case 1:
							atualizarConsole(MEMORY.popInt());
						break;
						case 2:
							atualizarConsole(MEMORY.popFloat());
						break;
						case 3:
							atualizarConsole(MEMORY.popBoolean()?'verdadeiro':'falso');
						break;
						case 4:
							atualizarConsole(MEMORY.popChar());
						break;
						case 7:
							atualizarConsole(MEMORY.getString(MEMORY.popString()));
						break;
						case 8:
							atualizarConsole((MEMORY.getInt() == 0)?'nulo':MEMORY.getInt());
							MEMORY.popBlock(4);
						break;
						default:
							atualizarConsole(MEMORY.popInt());
					}
					printToUser();
				break;
				case 31:
					finalize();
				break;
				case 32:    //Saída de função/procedimento
				case 33:
					if (ir.f == 32)   //Procedimento
						MEMORY.markStack(b);
					else
						MEMORY.markStack(b+ir.y);        //Função
					pc = MEMORY.getInt(b+ir.y);
					h1 = b;		//Base da função de saída
					b = MEMORY.getInt(b + 8 + ir.y);

					if(DEBUGGER.isRunning){
						removerTopoPilha();
						/*h1 = arrayObjetoTabela[arrayObjetoTabela.length - 1];     //Última variável retirada da pilha
						while (h1 instanceof objetoTabela && arrayObjetoTabela[arrayObjetoTabela.length-1].lv == h1.lv) {
							if(arrayObjetoTabela[arrayObjetoTabela.length - 1].idtab <= h1.idtab){     //Verificação para chamadas recursivas
								removerTopoPilhaVar();
								h1 = arrayObjetoTabela.pop();
							}
							else
								break;
						}*/

						if(DEBUGGER.state == IN)
							DEBUGGER.stopLine = kode[pc].line-1;
						else if(DEBUGGER.state == OUT)
							if(DEBUGGER.hasTheSameBaseInStack(h1)){
								DEBUGGER.stopLine = kode[pc].line-1;
								DEBUGGER.state = IN;
							}
					}
				break;
				case 34:    //Carregamento indireto
					switch (ir.y) {
						case TAM_INT:
							MEMORY.pushInt(MEMORY.getInt(MEMORY.popInt()));
						break;
						case TAM_REAL:
							MEMORY.pushFloat(MEMORY.getFloat(MEMORY.popInt()));
						break;
						case TAM_CHAR:
							MEMORY.pushUint8(MEMORY.getUint8(MEMORY.popInt()));
						break;
					}
				break;
				case 35: //não
					MEMORY.pushBoolean(!MEMORY.popBoolean());
				break;
				case 36: //nega inteiro ou real
					if (ir.y == TAM_REAL)
						MEMORY.pushFloat(-MEMORY.popFloat());
					else
						MEMORY.pushInt(-MEMORY.popInt());
				break;
				case 38:
					/*Armazenar na pilha.
					y = Número de variáveis que irão receber o valor.
					x = Tipo da variável(tamanho)
					z = Posição na tabela de símbolos das variáveis atualizadas
					*/
					if (ir.y == 1){
						switch (ir.x) {
							case "strings":
								h1 = MEMORY.getInt(MEMORY.getInt(MEMORY.getTopOfStack() - 8));
								h2 = MEMORY.getInt();
								if(h1 != h2)
									MEMORY.desallocate(h1, STRING.length(h1) + 1)
								if(STRING.isTemporaryString(MEMORY.getInt())){
									STRING.deleteTemporaryString(MEMORY.getInt());
									MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 8), MEMORY.getInt());
								}
								else
									MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 8), MEMORY.getInt());
								MEMORY.popBlock(8);
							break;
							case "reals":
								MEMORY.setFloat(MEMORY.getInt(MEMORY.getTopOfStack() - 12), MEMORY.getFloat());
								atualizaVariavel(MEMORY.getInt(MEMORY.getTopOfStack() - 12), MEMORY.getFloat(), ir.x);
								MEMORY.popBlock(12);
							break;
							case "chars":
							case "bools":    //BOOL ou CHAR
								MEMORY.setUint8(MEMORY.getInt(MEMORY.getTopOfStack() - 5), MEMORY.getUint8());
								atualizaVariavel(MEMORY.getInt(MEMORY.getTopOfStack() - 5), MEMORY.getUint8(), ir.x);
								MEMORY.popBlock(5);
							break;
							default://ints pointers
								MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 8), MEMORY.getInt());
								atualizaVariavel(MEMORY.getInt(MEMORY.getTopOfStack() - 8), MEMORY.getInt(), ir.x);
								MEMORY.popBlock(8);
						}
					}
					else {
						for(i = 1; i <= ir.y; i++){
							switch (ir.x) {
								case "strings":
									h1 = MEMORY.getInt(MEMORY.getInt(MEMORY.getTopOfStack() - 4 - i * 4));
									h2 = MEMORY.getInt();
									if(h1 != h2)
										MEMORY.desallocate(h1, STRING.length(h1) + 1)
									if(STRING.isTemporaryString(MEMORY.getString())){
										STRING.deleteTemporaryString(MEMORY.getString());
										MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 4 - i * 4), MEMORY.getInt());
									}
									else
										MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 4 - i * 4), MEMORY.getInt());
								break;
								case "reals":
									MEMORY.setFloat(MEMORY.getInt(MEMORY.getTopOfStack() - 8 - i * 4), MEMORY.getFloat());
									atualizaVariavel(MEMORY.getInt(MEMORY.getTopOfStack() - 8 - i * 4), MEMORY.getFloat(), ir.x);
								break;
								case "chars":
								case "bools":    //BOOL ou CHAR
									MEMORY.setUint8(MEMORY.getInt(MEMORY.getTopOfStack() - 1 - i * 4), MEMORY.getUint8());
									atualizaVariavel(MEMORY.getInt(MEMORY.getTopOfStack() - 1 - i * 4), MEMORY.getUint8(), ir.x);
								break;
								default://ints pointers
									MEMORY.setInt(MEMORY.getInt(MEMORY.getTopOfStack() - 4 - i * 4), MEMORY.getInt());
									atualizaVariavel(MEMORY.getInt(MEMORY.getTopOfStack() - 4 - i * 4), MEMORY.getInt(), ir.x);
							}
						}
						MEMORY.popBlock(typesLength[ir.x] + ir.y * 4);
					}
				break;
				case 39:  //expressão relacional igual(real, inteiro, string e caracter)
					switch (ir.y) {
						case "reals":
							MEMORY.pushBoolean(MEMORY.popFloat() == MEMORY.popfloat());
						break;
						case "chars":
						case "bools":
							MEMORY.pushBoolean(MEMORY.popUint8() == MEMORY.popUint8());
						break;
						case "strings":
							MEMORY.pushBoolean(STRING.compare(MEMORY.popString(), MEMORY.popString()) == 0);
						break;
						default:
							MEMORY.pushBoolean(MEMORY.popInt() == MEMORY.popInt());
					}
				break;
				case 40://expressão relacional diferente(real, inteiro, caractere, string, logico)
					switch (ir.y) {
						case "reals":
							MEMORY.pushBoolean(MEMORY.popFloat() != MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushBoolean(MEMORY.popInt() != MEMORY.popInt());
						break;
						case "strings":
							MEMORY.pushBoolean(STRING.compare(MEMORY.popString(), MEMORY.popString()) != 0)
						break;
						case "chars":
						case "bools":
							MEMORY.pushBoolean(MEMORY.popUint8() != MEMORY.popUint8());
						break;
						default:
							MEMORY.pushBoolean(MEMORY.popInt() != MEMORY.popInt());
					}
				break;
				case 41://menor(inteiro, real, logico, caracter, string)
					switch (ir.y) {
						case "reals":
							MEMORY.pushBoolean(MEMORY.popFloat() > MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushBoolean(MEMORY.popInt() > MEMORY.popInt());
						break;
						case "strings":
							MEMORY.pushBoolean(STRING.compare(MEMORY.popString(), MEMORY.popString()) > 0)
						break;
						case "chars":
						case "bools":
							MEMORY.pushBoolean(MEMORY.popUint8() > MEMORY.popUint8());
						break;
						default:
							MEMORY.pushBoolean(MEMORY.popInt() > MEMORY.popInt());
					}
				break;
				case 42://menor ou igual(inteiro, real, caracter, string, logico)
					switch (ir.y) {
						case "reals":
							MEMORY.pushBoolean(MEMORY.popFloat() >= MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushBoolean(MEMORY.popInt() >= MEMORY.popInt());
						break;
						case "strings":
							MEMORY.pushBoolean(STRING.compare(MEMORY.popString(), MEMORY.popString()) >= 0)
						break;
						case "chars":
						case "bools":
							MEMORY.pushBoolean(MEMORY.popUint8() >= MEMORY.popUint8());
						break;
						default:
							MEMORY.pushBoolean(MEMORY.popInt() >= MEMORY.popInt());
					}
				break;
				case 43://maior
					switch (ir.y) {
						case "reals":
							MEMORY.pushBoolean(MEMORY.popFloat() < MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushBoolean(MEMORY.popInt() < MEMORY.popInt());
						break;
						case "strings":
							MEMORY.pushBoolean(STRING.compare(MEMORY.popString(), MEMORY.popString()) < 0)
						break;
						case "chars":
						case "bools":
							MEMORY.pushBoolean(MEMORY.popUint8() < MEMORY.popUint8());
						break;
						default:
							MEMORY.pushBoolean(MEMORY.popInt() < MEMORY.popInt());
					}
				break;
				case 44://maior ou igual(inteiro, real, caracter, string, lógico)
					if(MEMORY.getInt(MEMORY.getTopOfStack()-8) == 400)
						debugger;
					switch (ir.y) {
						case "reals":
							MEMORY.pushBoolean(MEMORY.popFloat() <= MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushBoolean(MEMORY.popInt() <= MEMORY.popInt());
						break;
						case "strings":
							MEMORY.pushBoolean(STRING.compare(MEMORY.popString(), MEMORY.popString()) <= 0)
						break;
						case "chars":
						case "bools":
							MEMORY.pushBoolean(MEMORY.popUint8() <= MEMORY.popUint8());
						break;
						default:
							MEMORY.pushBoolean(MEMORY.popInt() <= MEMORY.popInt());
					}
				break;
				case 45:  //quebra de linha
					atualizarConsole("\n");
					printToUser();
				break;
				case 51://ou lógico
					MEMORY.pushBoolean(MEMORY.popBoolean() | MEMORY.popBoolean());
				break;
				case 52://adição(inteiro,real) concatenação(string, caracter)
					switch (ir.y) {
						case "reals":
							MEMORY.pushFloat(MEMORY.popFloat() + MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushInt(MEMORY.popInt() + MEMORY.popInt());
						break;
						case "strings":
							h2 = MEMORY.popString();
							h1 = MEMORY.popString();
							MEMORY.pushString(STRING.concatenate(h1, h2));
						break;
					}
				break;
				case 53://Subtração(inteiro,real)
					switch (ir.y) {
						case "reals":
							h2 = MEMORY.popFloat();
							h1 = MEMORY.popFloat();
							MEMORY.pushFloat(h1 - h2);
						break;
						case "ints":
							h2 = MEMORY.popInt();
							h1 = MEMORY.popInt();
							MEMORY.pushInt(h1 - h2);
						break;
					}
				break;
				case 56://e lógico
					MEMORY.pushBoolean(MEMORY.popBoolean() & MEMORY.popBoolean());
				break;
				case 57://Multiplicação(inteiro,real)
					switch (ir.y) {
						case "reals":
							MEMORY.pushFloat(MEMORY.popFloat() * MEMORY.popFloat());
						break;
						case "ints":
							MEMORY.pushInt(MEMORY.popInt() * MEMORY.popInt());
						break;
					}
				break;
				case 58://Divisão(inteiro,real)
					switch (ir.y) {
						case "ints":
							h1 = MEMORY.popInt();
							h2 = MEMORY.popInt();
							if(h1 == 0)
								crash('div:zero:number');
							MEMORY.pushInt(Math.floor(h2 / h1));
						break;
						case "reals":
							h1 = MEMORY.popFloat();
							h2 = MEMORY.popFloat();
							if(h1 == 0)
								crash('div:zero:number');
							MEMORY.pushFloat(h2 / h1);
						break;
					}
				break;
				case 59://módulo de inteiros
					h1 = MEMORY.popInt();
					h2 = MEMORY.popInt();
					if(h1 == 0)
						crash('div:zero:number');
					MEMORY.pushInt(h2 % h1);
				break;
				case 61://seta uma substring em uma string
					h2 = MEMORY.popString();
					h3 = MEMORY.popInt();
					h1 = MEMORY.popInt();
					MEMORY.setInt(h1, STRING.setStrInString(MEMORY.getInt(h1), h2, h3));
				break;
				case 62: //Pega caracter da posição de uma string
					h3 = MEMORY.popInt();
					if( h3 == 0 )
						crash('index:zero:string');
					else {
						if( h3 < 0 )
							h3 += STRING.length(MEMORY.getInt()) + 1;
						if( h3 > STRING.length(MEMORY.getInt()) || h3 <= 0)
							crash('index:outside:string');
					}
					MEMORY.pushChar(MEMORY.getChar(MEMORY.popInt() + h3));
				break;
				case 63: //Escreve um caracter em uma posição de uma string
					h2 = MEMORY.popInt()
					h1 = MEMORY.popChar()
					h3 = MEMORY.popInt();
					if( h3 < 0 )
						h3 += STRING.length(MEMORY.getInt()) + 1;
					else if( h3 == 0 )
						crash('index:zero:string');
					if( h3 > STRING.length(MEMORY.getInt()) )
						crash('index:outside:string');
					MEMORY.setChar(h2+h3, h1);
					MEMORY.pushString(h2);
				break;
				case 64://Retorna tamanho de uma string
					MEMORY.pushInt(STRING.length(MEMORY.popInt()));
				break;
				case 65:     //Pega endereço de referencia no topo da pilha e converte string para maiúsculo
					MEMORY.pushInt(STRING.toUpperCase(MEMORY.popstring()));
				break;
				case 66:     //Pega endereço de referência no topo da pilha e converte string para minúsculo
					MEMORY.pushInt(STRING.toLowerCase(MEMORY.popstring()));
				break;
				case 67:    //busca um caracter ou string no topo da pilha em uma string em t-1
					if(ir.y == 1)
						h1 = MEMORY.popString();
					else
						h1 = MEMORY.setString(MEMORY.popChar(), 0, false);
					MEMORY.pushInt(StringSearch(h1, MEMORY.popString()));
				break;
				case 68:    //Avaliação curta do operador 'ou'
					if (MEMORY.getBoolean())
						pc = ir.y;
				break;
				case 69:    //Avaliação curta do operador 'e'
					if (!MEMORY.getBoolean())
						pc = ir.y;
				break;
				case 70:  //Desalocação de memória
					MEMORY.desallocate(MEMORY.popInt(), ir.y);
				break;
				case 71:    //Alocação de memória
					MEMORY.pushInt(MEMORY.allocate(MEMORY.popInt()));
				break;
				case 72:    //Aleatório
					if(ir.y == 0)
						MEMORY.pushFloat(this.RANDOM.generate(1));
					else
						MEMORY.pushInt(this.RANDOM.generate(MEMORY.popInt()));
				break;
				case 73:    //Setar semente da função aleatório
					RANDOM.seed = MEMORY.popInt();
				break;
				case 74:    //Pegar tempo
					MEMORY.pushInt(time32());
				break;
				case 75:    //deletar um número de caracteres de uma string
					STRING.delete(MEMORY.popInt(), MEMORY.popInt(), MEMORY.popInt());
				break;
			}
		}while(run);
	}

	function finalize(){
	   elapsedTime += new Date().getTime() - startTime;
		 atualizarConsole('\nTempo de execução: '+elapsedTime+' ms.');
	   clearInterval(intervalExecution);
	   mostraBtExecucarNovamente(true);
		 isRunning = false;
		 run = false;
		 if(DEBUGGER.isRunning)
		 	DEBUGGER.finalize();
	}
	function pause(){
    elapsedTime += new Date().getTime() - startTime;
		run = false;
		clearInterval(intervalExecution);
	}
	function printToUser(){
		elapsedTime += new Date().getTime() - startTime;
		run = false;
	}
	this.resume = function(){
		if(!isRunning)
			this.init();
		else {
			if(readComplete)
				startTime = new Date().getTime();
			clearInterval(intervalExecution);
	    intervalExecution = setInterval(function () {
	        Interpreter.resume();
	    }, 1);
	    executeStatements();
		}

	}
	function crash(error){
		elapsedTime += new Date().getTime() - startTime;
		clearInterval(intervalExecution);
		removerTodaPilhaVar();
		removerTodaPilhaFuncoes();
		mostraItensDepuracao(false);
		limpaLinhaDepurador();
		mostraBtExecucarNovamente(true);
		isRunning = false;
		run = false;
		atualizarConsole(createRuntimeErrorMessage(error));
		if(DEBUGGER.isRunning)
			DEBUGGER.finalize();
	}
	this._crash = crash;
	function createRuntimeErrorMessage(error){
		switch (error) {
			case 'case:unknown':
				return 'Erro na estrutura \'caso\': rótulo indefinido.';   break;
			case 'div:zero:number':
				return 'Erro na divisão: divisão por zero';    break;
			case 'index:outside:array':
				return 'Erro no índice do arranjo: índice fora da área do arranjo.';    break;
			case 'alloc:nospace:stack':
				return 'Erro de alocação: sem espaço na pilha'; break;
			case 'alloc:nospace:heap':
			return 'Erro de alocação: sem espaço para alocações dinamicas.'; break;
			case 'index:zero:string':
				return 'Erro de acesso na string: não existe posição zero';	break;
			case 'index:outside:string':
				return 'Erro de acesso na string: posição fora da área da string'; break;
		}
	}
	this.getBase = function(lv = -1){
		if (lv == -1)
			return b;
		else
			return display[lv];
	}
	this.getIntervalExecution = function(){
		return intervalExecution;
	}
	this.setIntervalExecution = function(value){
		intervalExecution = value;
	}
	this.getActualInstruction = function(i = pc){
		return $.extend(false, {}, kode[i]);	//cópia de objeto
	}

	//retorna o valor armazenado na memória de uma variável referenciada por id
	//arranjos e registros são retornados na forma de arrays.
	this.getValueWithIndexToTab = function(id, ref = tab[id].ref, offset = 0, typ = tab[id].typ){
		var value
		,		v = tab[id]
		,		a
		,		b
		,		l
		,		h;

		if( typ in stantyps ){
			switch (typ) {
				case reals:
					value = MEMORY.getFloat(Interpreter.getBase(v.lev) + v.adr + offset);
				break;
				case pointers:
				case ints:
					value = MEMORY.getInt(Interpreter.getBase(v.lev) + v.adr + offset);
				break;
				case chars:
					value = MEMORY.getChar(Interpreter.getBase(v.lev) + v.adr + offset);
					if(value.charCodeAt() < 32)
						value = '';
				break;
				case bools:
					value = MEMORY.getBoolean(Interpreter.getBase(v.lev) + v.adr + offset);
				break;
				case strings:
					value = MEMORY.getString(MEMORY.getInt(Interpreter.getBase(v.lev) + v.adr + offset));
				break;
			}
		}
		else{
			value = [];
			switch (typ) {
				case records:
					value = [];
					l = btab[ref].last;
					while(l != 0){
						value.push(this.getValueWithIndexToTab(id, tab[l].ref, offset+tab[l].adr, tab[l].typ));
						l = tab[l].link;
					}
				break;
				case arrays:
					value = [];
					a = atab[ref];
					l = 0;
					h = a.high - a.low;	//índice final do arranjo positivo a partir de 0
					while(l <= h){
						value.push(this.getValueWithIndexToTab(id, a.elref, offset+l*a.elsize, a.eltyp));
						l++;
					}
				break;
			}
		}
		return value;
	}
}
