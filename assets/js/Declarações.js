//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT_STRING
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
//VARIÁVEIS COMPILADOR
var nkw = 27;		//Nº de palavras chave
var alng = 10;		//Nº de caracteres significativos nos identificadores
var llng = 120;		//Tamanho da linha de entrada
var emax = 500;		//Exponente máximo para numeros reais
var emin = -500;	//Exponente minimo para numeros reais
var kmax = 40;		//Numero máximo de digitos significativos
var tmax = 100;		//Tamanho da tabela
var bmax = 20;		//Tamanho da tabela de blocos
var amax = 30;		//Tamanho da tabela de arranjos
var c2max = 20;		//Tamanho  da tabela de numeros constantes
var csmax = 30; 	//Numero máximo de rótulos
var cmax = 1500;		//Tamanho do código
var smax = 600;		//Tamanho da tabela de strings
var ermax = 100;		//Nº máximo de erros
var omax = 63;		//Ordem do código de alto nível
var xmax = 1000;	//131071 2**17 - 1
var nmax = 2147643648;	//281474976710655 2**48-1
var lmax = 10;		//Nível máximo de chamadas de rotinas
var stacksize = (1024*1024)*20;   //20 megabytes de espaço
var TAM_REAL = 8;   //Tamanho em bytes do tipo real
var TAM_INT = 4;    //Tamanho em bytes do tipo inteiro
var TAM_BOOL = 1;   //Tamanho em bytes do tipo logico
var TAM_CHAR = 1;   //Tamanho em bytes do tipo caractere
var finalInst;      //Armazena o índice da última instrução do programa.
var SourceCode;     //Armazena o código fonte compilado.
var InputFile;    //Variável que irá armazenar o código, cada linha será armazenada em uma posição do vetor de string
var sy="";  //Ultimo simbolo lido por insymbol
var id;    //Identificador de insymbol
var inum;         //Inteiro de insymbol
var rnum;         //Real de insymbol
var sleng;        //Tamanho da string de insymbol
var ch = "";           //Ultimo caracter lido do código fonte
var line = "";         //Ultima linha lida
var cc;           //Contagem de caracteres
var lc;           //Contador do programa
var ll;           //Tamanho da linha atual
var ilnx;       //Posição da linha no ultimo caracter lido
var ccx;      //Posição da coluna no ultimo caracter lido
var changed = false;    //flag para mudança de linha de símbolo
var linecount;    //Linha do ultimo símbolo lido
var charcount;     //coluna do ultimo símbolo lido
var errs = [];    //Lista de erros
var errpos;       //Posição do erro
var progname;
var iflag, oflag;
var constbegsys = [];
var typebegsys = [];
var blockbegsys = [];
var facbegsys = [];
var statbegsys = [];
var key = [];   //Tipo alfa não especificado, lembrar de tratar isso depois
var ksy = [];   //Tipo symbol não especificado, lembrar de tratar isso depois
var sps = [];      //Simbolos especiais, tipo symbol não especificado
var csps = [];    //Caracteres de simbolos especiais
var xsps = [];  //Símbolos especiais com índice numerico
var nsps = []    //Nome dos símbolos especiais
var xname;
var t, a, b, sx, c1, c2;    //Indices para tabelas
var stantyps;
var display = [];
var tab = [];   //Tabela de símbolos
var atab = [];  //Tabela auxiliar arranjos
var btab = [];  //Tabela auxiliar blocos
var stab = [];  //Tabela string literal
var rconst = new Array(c2max);    //Tabela de constantes reais
var kode = [];
var iln = 0;  //contador de caracteres total
var indexmax;  //Tamanho total do código
var isOk = true;    //Verifica se o código foi compilado corretamente
var isDone = false; //Verifica se o código foi compilado
var MsgErro = ""; //Mensagem de erro para o usuário.
var debug;  //flag para ponto de parada da palavra "depurar"
var time;   //Tempo de compilação/execução
var lastCompiledCode = 0;	//Hash com o último código fonte compilado.
var types = {"notyp":0, "ints":1, "reals":2, "bools":3, "chars":4, "arrays":5, "records":6, "strings":7, "pointers":8};
var lineOfLastSymbol;
const typesLength = {"notyp":0, "ints":4, "reals":8, "bools":1, "chars":1, "arrays":4, "records":4, "strings":4, "pointers":4}


function MemoryBlock(start, size, isAvailable){   //Objeto para gerenciamento de memória
	this.start = start;
	this.size = size;
	this.isAvailable = isAvailable;
}

//objeto auxiliar para controlar as variáveis exibidas no debug panel
function VarObject(id){
	this.name = tab[id].name;
	this.value = 0;
	this.id = id;
	this.lv = tab[id].lev;
	this.adr = tab[id].adr;
	this.row = 0;
}

//TIPOS DEFINIDOS
function item(typ, ref){
  this.typ = typ;
  this.ref = ref;
}
function order(f, x, y, z, line){
  this.f = f;
  this.x = x;
  this.y = y;
  this.z = z;
  this.line = line;
}
function conrec(tp, i, r){
  this.tp = tp;
  this.r = r;
  this.i = i;
}
function xtp(tp, rf, sz){
  this.tp = tp;
	this.xtyp = tp;
  this.rf = rf;
  this.sz = sz;
}
function Ttab(name = '', link = 0, obj = '', typ = '', xtyp = '', ref = 0, normal = 0, lev = 0, adr = 0){
  this.name = name;
  this.link = link;
  this.obj = obj;
  this.typ = typ;
  this.xtyp = xtyp;
  this.ref = ref;
  this.normal = normal;
  this.lev = lev;
  this.adr = adr;
}
function Tatab(inxtyp = 0, eltyp = 0, elxtyp = 0, elref = 0, low = 0, high = 0, elsize = 0, size = 0){
  this.inxtyp = inxtyp;
  this.eltyp = eltyp;
	this.elxtyp = elxtyp;
  this.elref = elref;
  this.low = low;
  this.high = high;
  this.elsize = elsize;
  this.size = size;
}
function Tbtab(last = 0, lastpar = 0, psize = 0, vsize = 0){
  this.last = last;
  this.lastpar = lastpar;
  this.psize = psize;
  this.vsize = vsize;
}
function ENUM(obj){
  this.add = function(obj){
		if(typeof obj == "string")
			this[obj] = obj;
		else
	    for(var i in obj)
				if(typeof obj[i] == "string")
	    		this[obj[i]] = obj[i];
  }
  this.del = function(obj){
		if(obj in this)
      delete this[obj];
  }
	this.copy = function(obj){
		var enums = new ENUM;
		if(obj != undefined){
			if(typeof obj == "string")
				enums[obj] = obj;
			else
				for(let i in obj)
					if(typeof obj[i] == "string")
						enums[obj[i]] = obj[i];
		}
		for(let i in this)
			if(typeof this[i] == "string")
				enums[this[i]] = this[i];
		return enums;
	}
	if(obj != undefined)
		this.add(obj);
}

function RandomGen() {
	this.seed = 0;  //semente = zero, por padrão

	this.generate = function (n = 1) {
		//Entrada facultativa: n (número inteiro positivo)
		//Saídas:  a) 0 <= valor < 1(se n for omitido); ou b) 0 <= valor < n
		//O algoritmo abaixo é o mesmo usado pelo Delphi 7. (SANTOS, W.L.; FACET/UFGD; 2016)
		this.seed = (Math.imul(134775813, this.seed) + 1) & 0xffffffff; //(x%2^32=x&(2^32-1))
		if (n === 1) {
			if (this.seed >= 0)
			return this.seed / 4294967296;  //4294967296 = 2^32
			else
			return 1 + this.seed / 4294967296;
		}
		else {
			if (this.seed >= 0)
			return Math.floor(this.seed / 4294967296 * n);
			else
			return n + Math.floor(this.seed / 4294967296 * n);
		}
	}
}

function DebugObject(memoryTHIS){
	var baseOfRoutineInStack = 0
	,		activedVariables = []
	,		n = 0;
	const MEMORY = memoryTHIS;

	this.isRunning = false;
	this.state = 0;
	this.lastLine = 0;
	this.stopLine = 0

	this.init = function(){
		limpaContadores();
		mostraItensDepuracao(true);
		limpaLinhaDepurador();
		this.isRunning = true;
		this.state = 0;
		adicionarTabelaPilha(progname);
		this.showVariablesToUser();
		activedVariables = [];
		n = 0;
	}

	this.finalize = function(){
		this.isRunning = false;
		removerTodaPilhaVar();
		removerTodaPilhaFuncoes();
		mostraItensDepuracao(false);
		limpaLinhaDepurador();

		document.getElementById('debug').removeChild(document.getElementById('coluna_direita'));
	}

	this.In = function(){
		if(this.isRunning){
			if(!Interpreter._INPUT.isReadingInstruction()){
				this.state =	IN;
				this.stopLine = Interpreter.getActualInstruction().line;
				Interpreter.resume();
			}
		}
		else {
			if(!Interpreter.isRunning()){
				Interpreter.init();
				if(Interpreter.isRunning()){
					this.init();
					this.stopLine = Interpreter.getActualInstruction().line - 1;
					this.state = IN;
					Interpreter.resume();
				}
			}
		}
	}

	this.Over = function(){
		if(this.isRunning){
			this.state = OVER;
			this.stopLine = Interpreter.getActualInstruction().line;
			Interpreter.resume();
		}
		else {
			if(!Interpreter.isRunning()){
				Interpreter.init();
				if(Interpreter.isRunning()){
					this.init();
					this.stopLine = Interpreter.getActualInstruction().line - 1;
					this.state = IN;
					Interpreter.resume();
					if(Interpreter.getActualInstruction().f == 18)
						this.stopLine++;
				}
			}

		}
	}

	this.Out = function(){
		if(this.isRunning){
			baseOfRoutineInStack = Interpreter.getBase();
			if(!baseOfRoutineInStack == 0){
				this.state = OUT;
				Interpreter.resume();
			}
			else
				this.In();
		}
		else{
			if(!Interpreter.isRunning()){
				Interpreter.init();
				if(Interpreter.isRunning()){
					this.init();
					this.stopLine = Interpreter.getActualInstruction().line - 1;
					this.state = IN;
					Interpreter.resume();
				}
			}
		}
	}

	this.Until = function(){
		if(!this.isRunning){
			if(!Interpreter.isRunning())
				Interpreter.init();
			if(Interpreter.isRunning())
				this.init();
		}
		this.stopLine = editor.getCursor().line;
		this.state = UNTIL;
		Interpreter.resume();

	}

	this.updateVariables = function(){

	}

	this.showVariablesToUser = function(id = 0){
		if(id == 0)		//variáveis da rotina principal
			id = btab[2].last;
		else
			id = btab[tab[id].ref].last;
		while(id != 0){
			if(tab[id].obj == variable)
				insertVariableInDebugPanel(this.activeVariable(id));
			id = tab[id].link;
		}
	}

	this.activeVariable = function(id){
		activedVariables[++n] = new VarObject(id);
		return activedVariables[n];
	}

	this.hasTheSameBaseInStack = function(base){
		return baseOfRoutineInStack === base;
	}

	this.incrementLine = function(ln){
		editor.setGutterMarker(ln, "breakpoints", makeMarkerLinha(ln));
	}
}

function InputObject(memoryTHIS){
	var isReadingInstruction = false
	,		readComplete = false
	,		typeOfData;
	const MEMORY = memoryTHIS;

	this.save = function(value){
			if(isReadingInstruction){
				isReadingInstruction = false;
				switch (typeOfData) {
					case ints:
						MEMORY.setInt(MEMORY.getInt(), parseInt(value));
						atualizaVariavel(MEMORY.popInt(), parseInt(value));
					break;
					case reals:
						MEMORY.setFloat(MEMORY.getInt(), Number(value));
						atualizaVariavel(MEMORY.popInt(), Number(value));
					break;
					case chars:
						MEMORY.setChar(MEMORY.getInt(), value[0]);
						atualizaVariavel(MEMORY.popInt(), value[0]);
					break;
					case strings:
						MEMORY.setInt(MEMORY.getInt(), MEMORY.setString(value, MEMORY.getInt(MEMORY.getInt()), false));
						atualizaVariavel(MEMORY.popInt(), value)
					break;
				}
			}
	}

	this.isReadingInstruction = function(){
		return isReadingInstruction;
	}

	this.inputData = function(type){
		isReadingInstruction = true;
		mostrarModalOutput();
		setTypeOfData(type);
	}

	function setTypeOfData(typeID){
		typeOfData = typeID == 1 ? ints :
			typeID == 2 ? reals :
			typeID == 4 ? chars :
			typeID == 7 ? strings : notyp;
	}
}

 function StringObject(memoryTHIS){
	var temporaryStrings = {};
	const MEMORY = memoryTHIS;
	this.addTemporaryString = function(stringAddress){
		temporaryStrings[stringAddress] = stringAddress;
	}
	this.deleteTemporaryString = function(stringAddress){
		delete temporaryStrings[stringAddress];
	}
	this.isTemporaryString = function(stringAddress){
		return stringAddress in temporaryStrings;
	}
	this.init = function(){
		temporaryStrings = {};
	}

	this.compare = function(string1, string2){
		let length = this.length(string1) < this.length(string2) ?
		this.length(string1) : this.length(string2)
		,		i = 0;

		while(i <= length)
			if(MEMORY.getUint8(string1 + ++i) < MEMORY.getUint8(string2 + i))
				return -1;
			else if(MEMORY.getUint8(string1 + i) > MEMORY.getUint8(string2 + i))
				return 1;

		if(this.length(string1) == this.length(string2))
			return 0;
		else
			return this.length(string1) <	this.length(string2)? -1 : 1;
	}

	this.concatenate = function(firstString, secondString){
		var firstStringLength = this.length(firstString)
		,		secondStringLength = this.length(secondString)
		,		newStringLength = firstStringLength + secondStringLength
		, 	newString = MEMORY.allocate(newStringLength + 1)
		,		i = 0
		,		greatestLength;
		if(newStringLength > 255){
			secondStringLength -= newStringLength - 255;
			newStringLength = 255;
		}

		MEMORY.setUint8(newString, newStringLength);

		greatestLength = firstStringLength > secondStringLength ?
		firstStringLength : secondStringLength

		while(++i <= greatestLength){
			if(i <= firstStringLength)
				MEMORY.setUint8(newString + i, MEMORY.getUint8(firstString + i));
			if(i <= secondStringLength)
				MEMORY.setUint8(newString + i + firstStringLength, MEMORY.getUint8(secondString + i));
		}
		return newString;
	}

	this.setStrInString = function(initialString, secondString, positionInInitialString){		//Seta uma string em outra string
		var initialStringLength = this.length(initialString)
		,   secondStringLength = this.length(secondString)
		,   resultLength = initialStringLength + secondStringLength
		,   i = 0
		,		x = 1;

		if(resultLength >= 256)
			resultLength = 255;

		if(positionInInitialString == 0){
			Interpreter._crash('index:zero:string');
			return;
		}
		if (positionInInitialString < 0)
			positionInInitialString = positionInInitialString + 1 + initialStringLength;
		stringResult = MEMORY.allocate(resultLength + 1);
		MEMORY.setUint8(stringResult, resultLength);
		while (++i < positionInInitialString)
			MEMORY.setUint8(stringResult+i, MEMORY.getUint8(initialString+i));
		while (x <= secondStringLength){
			MEMORY.setUint8(stringResult+i, MEMORY.getUint8(secondString+x));
			i++;x++;
		}
		while (positionInInitialString <= initialStringLength) {
			MEMORY.setUint8(stringResult+i, MEMORY.getUint8(initialString+positionInInitialString))
			i++;positionInInitialString++;
		}
		MEMORY.desallocate(initialString, MEMORY.getUint8(initialString));
		return stringResult;
	}

	this.length = function(head){	//Retorna o tamanho da string
		return MEMORY.getUint8(head);
	}

	this.toLowerCase = function(initialString){
		var length = this.length(initialString)
		,		newString
		,		i = 0;

		if(initialString in temporaryStrings){
			newString = initialString;
			this.deleteTemporaryString(initialString);
		}
		else
			newString = MEMORY.allocate(length+1);

		MEMORY.setUint8(newString, length);
		while (++i <= length)
			MEMORY.setUint8(newString+i, MEMORY.getChar(initialString + i).toLocaleLowerCase().charCodeAt());

		return newString;
	}
	this.toUpperCase = function(initialString){
		var length = this.length(initialString)
		,		newString
		,		i = 0;

		if(initialString in temporaryStrings){
			newString = initialString;
			this.deleteTemporaryString(initialString);
		}
		else
			newString = MEMORY.allocate(length+1);

		MEMORY.setUint8(newString, length);
		while (++i <= length)
			MEMORY.setUint8(newString+i, MEMORY.getChar(initialString + i).toLocaleUpperCase().charCodeAt());

		return newString;
	}

	this.search = function(substring, string){
		let subStringLength = this.length(substring)
		,		stringLength = this.length(string)
		,		i = -1, x = 0;

		if(this.isTemporaryString(string)){
			this.deleteTemporaryString(string);
			MEMORY.desallocate(string, this.length(string));
		}
		if(this.isTemporaryString(substring)){
			this.deleteTemporaryString(substring);
			MEMORY.desallocate(substring, this.length(substring));
		}

		if(subStringLength > stringLength || !subStringLength)
			return 0;

		while ( ++i <= stringLength){
			while(MEMORY.getUint8(string + ++i) == MEMORY.getUint8(substring + ++x))
				if(x >= subStringLength)
					return i - subStringLength + 1;

			i -= x;
			x = 0;
		}
		return 0;
	}
	this.delete = function(numberOfChars, index, string){
		var stringLength = this.length(string)
		,		i = -1;
		if (index == 0){
			Interpreter._crash('index:zero:string');
		}

		index = index < 0 ? index + stringLength + 1 : index;	//números negativos apontam para o final da string

		if (index + numberOfChars > stringLength){
			numberOfChars = stringLength - index + 1;
			MEMORY.desallocate(string + index + 1, numberOfChars);
		}
		else
			MEMORY.desallocate(string + index + 1, numberOfChars);
		MEMORY.setUint8(string, stringLength-numberOfChars);
		while(i++ < stringLength-index-numberOfChars+1)
			MEMORY.setChar(string + i + index, MEMORY.getChar(string + numberOfChars + i + index));
	}
}

//DECLARAÇÃO DO GERENCIADOR DA MEMÓRIA DO INTERPRETADOR (stack + heap)
function MemoryObject(){
	var startHeapMemory
	,		topOfStack
	,		totalHeapBytes
	,		stack
	,		s
	,		MemoryBlocks = [];
	this.init = function(totalSizeInBytes = 20971520 /*20 megabytes*/, percentageOfStack = 0.75 /*75% reservado para stack e 25% reservado para o heap*/){
		if (percentageOfStack > 1)
			percentageOfStack /= 100
		startHeapMemory = totalSizeInBytes*percentageOfStack;
		totalHeapBytes = totalSizeInBytes-startHeapMemory;
		topOfStack = 0;
		stack = new ArrayBuffer(totalSizeInBytes);
		s = new DataView(stack);
		MemoryBlocks = [];
		MemoryBlocks[0] = new MemoryBlock(startHeapMemory, totalHeapBytes, true);
	}
	this.HasAvailableSpaceInStack = function(sizeInBytes = 1){
		return topOfStack+sizeInBytes < startHeapMemory;
	}
	this.getTopOfStack = function(){
		return topOfStack;
	}
	this.markStack = function(mark){
		topOfStack = mark;
	}
	this.pushInt = function(value){
		if(topOfStack < startHeapMemory){
			s.setInt32(topOfStack, value);
			topOfStack += 4;
		}
	}
	this.pushFloat = function(value){
		if(topOfStack < startHeapMemory){
			s.setFloat64(topOfStack, value);
			topOfStack += 8;
		}
	}
	this.pushBoolean = function(value){
		if(topOfStack < startHeapMemory)
			s.setUint8(topOfStack++, value);

	}
	this.pushChar = function(value){
		if(topOfStack < startHeapMemory)
			s.setUint8(topOfStack++, value.charCodeAt());
	}
	this.pushUint8 = function(value){
		if(topOfStack < startHeapMemory)
			s.setUint8(topOfStack++, value);
	}
	this.pushString = function(value){
		if(topOfStack < startHeapMemory){
			s.setInt32(topOfStack, value);
			topOfStack += 4;
		}
	}
	this.pushBlock = function(sizeInBytes){
		topOfStack += sizeInBytes;
	}
	this.setUint8 = function(adr, value){
		s.setUint8(adr,value);
	}
	this.setInt = function(adr, value){
		s.setInt32(adr, value);
	}
	this.setUint8 = function(adr, value){
		s.setUint8(adr,value);
	}
	this.setFloat = function(adr, value){
		s.setFloat64(adr, value);
	}
	this.setBoolean = function(adr, value){
		s.setUint8(adr, value);

	}
	this.setChar = function(adr, value){
		s.setUint8(adr, value.charCodeAt());

	}
	this.setString = function(string, stringAddress, isTemporaryString){
		var stringLength = string.length
		, 	stringStart;
		if(stringLength >= 256)
			stringLength = 255;
		if(stringAddress == 0)
			stringStart = this.allocate(stringLength+1);
		else{
			stringStart = stringAddress;
			if(stringLength < s.getUint8(stringAddress)){
				this.desallocate(stringAddress + stringLength + 1, s.getUint8(stringAddress) - stringLength)
				stringStart = stringAddress;
			}
			else {
				this.desallocate(stringAddress, s.getUint8(stringAddress));
				stringStart = this.allocate(string.length+1);
			}

		}
		if(Interpreter._STRING.isTemporaryString())
			Interpreter._STRING.addTemporaryString(stringStart);
		this.setUint8(stringStart, stringLength);
		stringStart += stringLength+1;
		while(stringLength){
			stringStart--;
			this.setChar(stringStart, string.charAt(--stringLength));
		}
		return --stringStart;
	}
	this.popInt = function(){
		return s.getInt32(topOfStack -= 4);
	}
	this.popFloat = function(){
		return s.getFloat64(topOfStack -= 8);
	}
	this.popBoolean = function(){
		return s.getUint8(--topOfStack) != 0;
	}
	this.popChar = function(){
		return String.fromCharCode(this.getUint8(--topOfStack));
	}
	this.popUint8 = function(){
		return s.getUint8(--topOfStack);
	}
	this.popString = function(){
		return s.getInt32(topOfStack -= 4);
	}
	this.popBlock = function(n){
		topOfStack -= n;
	}
	this.getInt = function(adr = topOfStack - 4){
		return s.getInt32(adr);
	}
	this.getFloat = function(adr = topOfStack - 8){
		return s.getFloat64(adr);
	}
	this.getBoolean = function(adr = topOfStack - 1){
		return s.getUint8(adr) != 0;
	}
	this.getChar = function(adr = topOfStack - 1){
		return String.fromCharCode(this.getUint8(adr));
	}
	this.getUint8 = function(adr = topOfStack - 1){
		return s.getUint8(adr);
	}
	this.getString = function(adr){
		var string = '',
				stringLength = this.getUint8(adr++),
				stringEnd;
		if(stringLength == 0)
			return '';
		stringEnd = adr + stringLength;
		while(adr < stringEnd)
			string += this.getChar(adr++);
		return string;
	}
	this.allocate = function(length){
			var BlockAddress
			, 	NumberOfBlocks = MemoryBlocks.length;
			if(length == 0)
				return 0;

			for(var i = 0; i < NumberOfBlocks; i += 2)
				if (MemoryBlocks[i].isAvailable && MemoryBlocks[i].size >= length)
					break;
				else if(!MemoryBlocks[i].isAvailable)
					i--;
			if(i >= NumberOfBlocks){
				Interpreter._crash('alloc:nospace:heap');
				return;
			}

			if(MemoryBlocks[i].size == length){
				if(MemoryBlocks[i-1] instanceof MemoryBlock && !MemoryBlocks[i-1].isAvailable){
					MemoryBlocks[i-1].size += length;
					BlockAddress = MemoryBlocks[i].start;
					if(MemoryBlocks[i+1] instanceof MemoryBlock && !MemoryBlocks[i+1].isAvailable){
						MemoryBlocks[i-1].size += MemoryBlocks[i+1].size;
						MemoryBlocks.splice(i+1,1);
					}
					MemoryBlocks.splice(i,1).start;
					return BlockAddress;
				}
				else if (MemoryBlocks[i-1] instanceof MemoryBlock){
					MemoryBlocks[i].isAvailable = false;
					if(MemoryBlocks[i+1] instanceof MemoryBlock && !MemoryBlocks[i+1].isAvailable){
						MemoryBlocks[i].size += MemoryBlocks[i+1].size;
						BlockAddress = MemoryBlocks[i].start;
						MemoryBlocks.splice(i+1, 1);
						return BlockAddress;
					}
					return MemoryBlocks[i].start;
				}

			}
			if(MemoryBlocks[i-1] instanceof MemoryBlock && !MemoryBlocks[i-1].isAvailable){
				MemoryBlocks[i-1].size += length;
				BlockAddress = MemoryBlocks[i].start;
				MemoryBlocks[i].start += length;
				MemoryBlocks[i].size -= length;
				return BlockAddress;
			}
			else if(MemoryBlocks[i-1] instanceof MemoryBlock){
				BlockAddress = MemoryBlocks[i].start;
				MemoryBlocks[i].start += length;
				MemoryBlocks[i].size -= length;
				MemoryBlocks.splice(i, 0, new MemoryBlock(BlockAddress, length, false));
				return BlockAddress;
			}
			else if(i == 0){
				if(MemoryBlocks[i+1] instanceof MemoryBlock && !MemoryBlocks[i+1].isAvailable){
					MemoryBlocks[i+1].start -= length;
					MemoryBlocks[i+1].size += length;
					BlockAddress = MemoryBlocks[i+1].start;
					MemoryBlocks.splice(i,1);
				}
				else{
					BlockAddress = MemoryBlocks[0].start;
					MemoryBlocks[0].start += length;
					MemoryBlocks[0].size -= length;
					MemoryBlocks.splice(0, 0, new MemoryBlock(BlockAddress, length, false));
				}
				return BlockAddress;
			}
		}
	this.desallocate = function(start, length){
		var i
		, 	half
		, 	left = 0
		, 	right = MemoryBlocks.length-1;
		if(start+length > MemoryBlocks[MemoryBlocks.length-1].start + MemoryBlocks[MemoryBlocks.length-1].size)
			return false;

		if(start < startHeapMemory)
			return false;

		while(left <= right){
			half = left+right >> 1;
			if(start > MemoryBlocks[half].start)
			left = half+1;
			else
			right = half-1;
		}
		if(right < 0)
			right++;
		if(MemoryBlocks[right].start <= start && start < MemoryBlocks[right].start + MemoryBlocks[right].size)
			i = right;
		else if(MemoryBlocks[right+1] instanceof MemoryBlock && MemoryBlocks[right+1].start == start)
			i = right+1;
		else
			return false;

		if(start+length <= MemoryBlocks[i].start+MemoryBlocks[i].size){
			if(MemoryBlocks[i].isAvailable)
			return;
			if(MemoryBlocks[i].start < start){
				var size = MemoryBlocks[i].size;
				MemoryBlocks[i].size = start - MemoryBlocks[i].start;
				size -= MemoryBlocks[i].size;
				size -= length;
				if(size > 0){
					MemoryBlocks.splice(i+1, 0, new MemoryBlock(start+length, size, false));
					MemoryBlocks.splice(i+1, 0, new MemoryBlock(start, length, true));
				}
				else{
					if(MemoryBlocks[i+1] instanceof MemoryBlock && MemoryBlocks[i+1].isAvailable){
						MemoryBlocks[i+1].start = start;
						MemoryBlocks[i+1].size += length;
					}
					else {
						MemoryBlocks.splice(i+1, 0, new MemoryBlock(start, length, true));
					}
				}
			}
			else{
				if(MemoryBlocks[i].size == length){
					if(MemoryBlocks[i-1] instanceof MemoryBlock && MemoryBlocks[i-1].isAvailable){
						MemoryBlocks[i-1].size += length;
						MemoryBlocks.splice(i,1);
					}
					else
					i++;
					if(MemoryBlocks[i] instanceof MemoryBlock && MemoryBlocks[i].isAvailable){
						MemoryBlocks[i-1].size += MemoryBlocks[i].size;
						MemoryBlocks[i-1].isAvailable = true;
						MemoryBlocks.splice(i,1);
					}
					else
					MemoryBlocks[i-1].isAvailable = true;
				}
				else{
					MemoryBlocks[i].start += length;
					MemoryBlocks[i].size -= length;
					if(MemoryBlocks[i-1] instanceof MemoryBlock && MemoryBlocks[i-1].isAvailable)
					MemoryBlocks[i-1].size += length;
					else
					MemoryBlocks.splice(i, 0, new MemoryBlock(MemoryBlocks[i].start-length, length, true));
				}
			}
		}
		else {
			let firstByte = MemoryBlocks[i].size + MemoryBlocks[i].start;
			let CorrectSize = firstByte - start;
			this.desallocate(start, CorrectSize);
			this.desallocate(firstByte, length-CorrectSize);
		}
	}
}

//CONSTANTES DE STATUS DO DEPURADOR
const	IDLE = "IDLE"
,			IN = "IN"
,			OUT = "OUT"
,			OVER = "OVER"
,			UNTIL = "UNTIL"
,			UNKNOWN = 0;

//DECLARAÇÕES TOKENS DO COMPILADOR
//Tipos
const notyp = "notyp", ints = "ints", reals = "reals", bools = "bools",
chars = "chars", strings = "strings", pointers = "pointers", arrays = "arrays", records = "records";

//Objetos
const type1 = "type1", funktion = "funktion", prozedure = "prozedure", variable = "variable", konstant = "konstant";

//Literais
const intcon = "intcon", realcon = "realcon", charcon = "charcon", stringsy = "stringsy", ident = "ident";

//Operadores
const plus = "plus", minus = "minus", times = "times", rdiv = "rdiv",
idiv = "idiv", orsy = "orsy", andsy = "andsy", eql = "eql",
neq = "neq", lss = "lss", leq = "leq", gtr = "gtr", geq = "geq", notsy = "notsy", imod = "imod", address = "address",
ptr = "ptr", addr = "addr", becomes = "becomes";

//Delimitadores
const comma = "comma", semicolon = "semicolon", rbrack = "rbrack", lbrack = "lbrack",
rparent = "rparent", lparent = "lparent", period = "period", colon = "colon";

//Palavras reservadas
const constsy = "constsy", typesy = "typesy", varsy = "varsy", proceduresy = "proceduresy",
functionsy = "functionsy", beginsy = "beginsy", endsy = "endsy",
casesy = "casesy", ofsy = "ofsy", dosy = "dosy", tosy = "tosy",
elsesy = "elsesy", ifsy = "ifsy", untilsy = "untilsy", whilesy =  "whilesy", thensy = "thensy",
programsy = "programsy", stepsy = "stepsy",  downtosy = "downtosy", refsy = "refsy",
recordsy = "recordsy", arraysy = "arraysy",
repeatsy = "repeatsy", forsy = "forsy", returnsy = "returnsy";
//FIM DECLARAÇÕES DE TOKENS
