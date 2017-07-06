var codDiv = document.getElementById('codDiv');//

function aumentarTamanho(){
	var style = window.getComputedStyle(codDiv, null).getPropertyValue('font-size');
	var fontSize = parseFloat(style);
	if (fontSize < 30) {
		codDiv.style.fontSize = (fontSize + 2) + 'px';
	}
}

function diminuirTamanho(){
	var style = window.getComputedStyle(codDiv, null).getPropertyValue('font-size');
	var fontSize = parseFloat(style);
	if (fontSize > 12) {
		codDiv.style.fontSize = (fontSize - 2) + 'px';
	}
}

function time32() {
	return new Date().getTime() & 0x7fffffff; // getTime() % (2^31) = getTime() % (2^31-1=0x7fffffff)
}
/* fim teste tooltip */
$(document).ready(function() {
	$('body').delegate('.cm-variable','mouseover',function(e){
		if (Interpreter.isRunning() && Interpreter._DEBUGGER.isRunning) {
			var nome = e.currentTarget.innerText;
			var valorVar = procuraVar(nome);
			if(valorVar !== undefined){
				var x = e.clientX, y = e.clientY;
				var tooltipSpan = document.getElementById('tpVar');
				tooltipSpan.innerHTML = nome + ' := ' +valorVar;
				tooltipSpan.style.visibility = 'visible';
				tooltipSpan.style.top = (y + 10) + 'px';
				tooltipSpan.style.left = (x + 10) + 'px';
			}
		}
	});
	$('body').delegate('.cm-variable','mouseout',function(e){
		var tooltipSpan = document.getElementById('tpVar');
		tooltipSpan.style.visibility = 'hidden';
	});
});

$(document).ready(function() {
	$('body').delegate('.cm-keyword, .cm-reservadas','click',function(e){
		switch (e.currentTarget.innerText) {
			case 'escreva':
			case 'escrevaln':

			break;
			case 'var':

			break;
			case 'retorne':

			break;
			case 'leia':

			break;
			case 'para':
				document.getElementById('infoPanel').innerText = forTip;
				document.getElementById('panel-info2').innerText = forTip2;
			break;
			case 'se':
				document.getElementById('infoPanel').innerText = ifTip;
			break;
			case 'caso':
			break;
			case 'enquanto':
				document.getElementById('infoPanel').innerText = whileTip;
			break;

			case 'de':

			break;
			case 'repita':
				document.getElementById('panel-info').innerText = untilTip;
			break;
			case 'funcao':

			break;
			case 'procedimento':
			break;
			case 'caso':
				document.getElementById('panel-info').innerText = caseTip;
			break;

		}
	});
});

//Função para gerar uma hash do código fonte compilado.
function GetHashCode(str) {
	var hash = 0, i;
	if (str.length == 0)
	return hash;
	for (i in str) {
		hash  = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}





//ao clicar no botao abre janela para selecionar arquivo
/*document.getElementById('novo').onclick = function() {
document.getElementById('my_file').click();getIsRunning
};*/

//seta template no editor de texto
function SetTemplate(){
	editor.setValue("programa test\nvar\n\ti : inteiro\ninicio\n\ti := 2\nfim");
}

//Script para entrada de dados pelo teclado
function InputBoxEvent(e) {
	var value;
	if (e.key == 'Enter') {
		if (Interpreter._INPUT.isReadingInstruction()){
			atualizarConsole(value = getValueFromUser());
			Interpreter._INPUT.save(value);
			clearInputBox();
			Interpreter.resume();
		}
	}
}

//Função para pegar o valor informado pelo usuário
function getValueFromUser() {
	return document.getElementById("InputBox").value;
}

//Limpar input
function clearInputBox() {
	document.getElementById("InputBox").value = "";
}

//Limpa o console de saída quando um novo programa é iniciado
function limpaConsole() {
	document.getElementById("output").value = "";
}

function StringFilter(str){			//Retorna o final da string no tamanho máximo de linhas delimitado por lineLimit
	var count = 0, index = str.length, lineLimit = 200;
	do {
		index = str.lastIndexOf('\n', index-1);
		count++;
		if(count >= lineLimit || index == -1){
			return str.substring(index+1);
		}
		else
		index1 = index;
	} while (true);
}

//Imprime informações no console de saída
function atualizarConsole(string){
	outputConsole.value = StringFilter(outputConsole.value+string);
	outputConsole.scrollTop = outputConsole.scrollHeight;
}

//Imprime erros no console debug abaixo do editor
function mostraErro(){
	limpaDebug();
	adicionarErro(MsgErro+"\nTempo de compilação: "+((time != undefined)?time:0)+" ms.");
}

function getValue(i){
	if(tab[i] instanceof Ttab && (tab[i].obj == variable || tab[i].obj == konstant)){
		switch (tab[i].typ) {
			case reals:
			return s.getFloat64(display[tab[i].lev]+tab[i].adr);
			break;
			case ints:
			return s.getInt32(display[tab[i].lev]+tab[i].adr);
			break;

			case bools:
			return (s.getUint8(display[tab[i].lev]+tab[i].adr) == 0)?'falso':'verdadeiro';
			break;

			case chars:
			return String.fromCharCode(s.getUint8(display[tab[i].lev]+tab[i].adr));
			break;

			case pointers:
			return (s.getInt32(display[tab[i].lev]+tab[i].adr) == 0)?'nulo':s.getInt32(display[tab[i].lev]+tab[i].adr);
			break;
			case strings:
			return getString(s.getInt32(display[tab[i].lev]+tab[i].adr));
			break;
			case arrays:
			var len = Math.abs(atab[tab[i].ref].low) + Math.abs(atab[tab[i].ref].high) + 1;
			var a = [];
			var adr = display[tab[i].lev] + tab[i].adr;
			switch (atab[tab[i].ref].eltyp) {
				case ints:
				case pointers:
				len = adr + len * TAM_INT;
				while(adr < len){
					a.push(s.getInt32(adr));
					adr += TAM_INT;
				}
				break;
				case reals:
				len = adr + len * TAM_REAL;
				while(adr < len){
					a.push(s.getFloat64(adr));
					adr += TAM_REAL;
				}
				break;
				case chars:
				case bools:
				len = adr + len * TAM_CHAR;
				while(adr < len){
					a.push(s.getUint8(adr));
					adr += TAM_CHAR;
				}
				break;
				case records:

				break;
				case strings:
				len = adr + len * TAM_INT;
				while(adr < len){
					a.push(getString(s.getInt32(adr)));
					adr += TAM_INT;
				}
				break;
			}
			return a;
			break;
		}
	}
}

function isLetter(char){
	var a = "a".charCodeAt();
	var A = "A".charCodeAt();
	var z = "z".charCodeAt();
	var Z = "Z".charCodeAt();
	char = char.charCodeAt();
	return char >= a && char <= z || char >= A && char <= Z
}

function isNumber(n){
	n = n.charCodeAt();
	var _0 = "0".charCodeAt();
	var _9 = "9".charCodeAt();
	return n >= _0 && n <= _9;
}

function mostrarModalOutput(){
	$('#modalOutput').modal('show');
	$('#InputBox').focus();
}

function esconderModalOutput(){
	$('#modalOutput').modal('hide');
}

function renderInput(bool) {
	if (bool) {
		document.getElementById("InputBox").style.visibility = "visible";
	} else {
		document.getElementById("InputBox").style.visibility = "hidden";
	}
}

function insertDebugHTML(){
	document.getElementById("debug").innerHTML = `<div id="coluna_direita" class="col-md-4 col-xs-12"  style="background-color:white; max-height:450px;float:right">
    <!-- <div id="coluna_direita" style="width:295px; height:400px; float:right; visible:none; background-color:white; margin:2px;  overflow: auto;" > -->
    <div class="row" style="margin-top:5px;">
      <div class="col-md-6 col-xs-12" style="resize:both;float:right">
        <div id="vars">
          <div class="table-responsive" style="max-height:445px; overflow-y:auto; margin-bottom:5px;border: 0px solid #dddddd;width:100%">
            <table id="tab_var" class="table table-bordered" style="margin-bottom:5px !important;">
              <thead>
                <tr>
                  <th colspan="2">Variáveis</th>
                </tr>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <!-- inserir linhas pilha variaveis-->
              </tbody>
            </table>
            <button type="button" class="btn btn-default pull-right" onclick="salvar()">Salvar</button>
            <button type="button" class="btn btn-default pull-right" onclick="ativarTabelaVar()">Editar</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xs-12">
        <div id="pilha" style="width:100%; float:right">
          <div class="table-responsive" style="max-height:320px; overflow-y:auto;">
            <table class="table table-bordered" id="tab_logic" style="border: 0px solid #dddddd;">
              <thead>
                <tr >
                  <th colspan="2">Pilha de execução</th>
                </tr>
              </thead>
              <tbody>
                <!-- inserir linhas pilha execucao-->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div><!--fim coluna 2 -->`
}


//debug
function adicionarErro(erro) {
	var text = document.getElementById("debugPanel");
	document.getElementById("debugPanel").style.visibility = "visible";
	text.innerText = erro;
}

function limpaDebug(){
	document.getElementById("debugPanel").style.visibility = "hidden";
	document.getElementById("debugPanel").innerText = "";
}

//fim funcoes debug

//funcoes para pilha
function adicionarTabelaPilha(funcao) {
	/*$('#tab_logic').append('<tr><td>'+ funcao + '</td></tr>');*/
	var table = document.getElementById("tab_logic");
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = funcao;
}

function removerTopoPilha() {
	document.getElementById("tab_logic").deleteRow(1);
}

function getNumberStacks(){
	return document.getElementById("tab_logic").rows.length - 1;
}

function removerTodaPilhaFuncoes(){
	$("#tab_logic tr:gt(1	)").remove();
}

//fim funcoes para pilha

//funcoes para pilha de variaveis
//array de objetos
var arrayObjetoTabela = [];
//Carregar variáveis no depurador

function carregaVariaveis(start){//str_tab
	var value, itab = start-1;
	if (tab[itab].lev <= display.length-1)
		return;
	while(tab[start] instanceof Ttab && tab[start].obj != "prozedure" && tab[start].obj != "funktion" && tab[start].name != "") {
		if (tab[start].obj != "prozedure" && tab[start].obj != "funktion"){
			switch (tab[start].typ) {
				case "reals":
				value = s.getFloat64(display[tab[start].lev]+tab[start].adr);
				break;
				case "chars":
				value = String.fromCharCode(s.getUint8(display[tab[start].lev]+tab[start].adr));
				break;
				case "bools":
				value = (s.getUint8(display[tab[start].lev]+tab[start].adr) == 0)?"falso":"verdadeiro";
				break;
				case "strings":
				if (s.getInt32(display[tab[start].lev]+tab[start].adr) != 0)
				value = getString(s.getInt32(display[tab[start].lev]+tab[start].adr));
				else
				value = "";
				break;
				default:
				value = s.getInt32(display[tab[start].lev]+tab[start].adr);
			}
			if(tab[start].typ == "records"){
				if (tab[start].obj == "variable") {
					var ref = tab[start].ref;
					adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
					if (ref !== undefined && ref !== 0) {
						var prox = (btab[ref].last);
						if (prox !== undefined && prox !== 0) {
							do {
								start++;
								adicionarObjetoFilho(tab[prox].name, value, prox, tab[prox].lev, tab[prox].adr);
								prox = tab[prox].link;
							} while (prox !== 0);
						}
					}
				}
			}

			if((tab[start].obj == "variable" || tab[start].obj == "konstant")){

				if(tab[start].typ == "arrays") {
					adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
				}else{
					adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
					if (tab[start].lev < 2) {
					}

				}
			}
			start++;
		}
	}
}

function procuraVar(id){
	var valor;
	for (var i = 0; i < tab.length; i++) {
		if (tab[i].name == id) {
			valor =  getValue(i);
		}
	}
	return valor;
}

//cria objeto tabela e verifica se existe os valores para adicionar na tabela
function adicionarObjetoVar(id){
	objeto = new VarObject(tab[id].name, UNKNOWN, id, tab[id].lev, tab[id].adr);
	insertVariableInDebugPanel(objeto);
	arrayObjetoTabela.push(objeto);
}
//adicionar objeto filho na tabela
function adicionarObjetoFilho(posNome,posValor, start, lv, adr){
	adr += Interpreter.getBase(lv);
	objeto = new VarObject(posNome,posValor, start, lv, adr);
	adicionaFilhos(objeto);
	arrayObjetoTabela.push(objeto);
}

function atualizaVariavel(adr, value, typ){
	for (var i = 0; i < arrayObjetoTabela.length; i++) {
		var objeto = arrayObjetoTabela[i];
		if (objeto.adr == adr) {
			var input = document.getElementById(objeto.id);
			if (input !== null) {
				if(typ == "bools"){
					if(value != 0)
					input.value = "verdadeiro";
					else
					input.value = "falso";
				}
				else if(typ == chars){
					input.value = input.value;
				}
				else if(typ == strings)
				input.value = getString(value);
				else
				input.value = value;
			}
		}
	}
}

/*function mostraValoresArranjo(id){
	$("#tabelaArranjo tr:gt(0)").remove();
	var table = document.getElementById("tabelaArranjo")
	,		v = tab[id]
	,		a = atab[v.ref]
	,		values = Interpreter.getValueWithIndexToTab(id)
	,		i
	,		x = 1;
	if (v !== undefined && values !== undefined) {
		if(atab[tab[id].ref].inxtyp != chars)
			for (i = atab[tab[id].ref].high; i >= atab[tab[id].ref].low; i--) {
				var row = table.insertRow(1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = v.name+"["+(a.inxtyp == chars ? String.fromCharCode(i) : i)+"]";
				cell2.innerHTML = values.pop();
			}
	}
}objeto*/

function insertVariableInDebugPanel(variable, idRow = 2, ref = tab[variable.id].ref, typ = tab[variable.id].typ, offset = 0, name = '') {
	var table = document.getElementById("tab_var")
	,		row = table.insertRow(idRow)
	, 	cell1 = row.insertCell(0)
	, 	cell2 = row.insertCell(1)
	,		show = false
	,		lastRow
	,		value;

	variable.row = row;

	switch (typ) {
		case arrays:
		case records:
			insertComposedFields(row, typ,  cell1, cell2, variable, offset, ref, name, lastRow);
		break;
		default:
			if(tab[variable.id].typ === typ){
				variable.value = Interpreter.getValueWithIndexToTab(variable.id, ref, offset, typ);
				if(typ == pointers && variable.value == 0)
					variable.value = 'nulo';
				if(typ == chars && variable.value < 32)
					variable.value = '';
				if(typ == bools)
					if(variable.value)
						variable.value = 'verdadeiro';
					else
						variable.value = 'falso';
				cell1.innerHTML = variable.name;
				cell2.innerHTML = "<input type='text' value='"+ variable.value +"'name='"+variable.id+"' id='"+ variable.id +"'>";
			}
			else {
				cell1.innerText = normalizeComposedLabel(variable, name);
				cell2.innerText = Interpreter.getValueWithIndexToTab(variable.id, ref, offset, typ);
			}

		break;
	}
	disableVariableInput();
	return row;
}

function normalizeComposedLabel(variable, label){
	var lb = label.split("")
	,		n = 0
	,		str
	,		brackets = {
		b : [],
		n : 0,
		pop : function(){if (this.n > 0) this.n--;},
		push : function(v){this.b[++this.n] = v}
	};
	while(n < lb.length){
		if ( lb[n] === ',' ){
			if(brackets.n === 0){
				brackets.push('[');
				lb.splice(n, 1);
				lb[n] = '[';
			}
		}
		else if( lb[n] === '.' ){
			if( brackets.n > 0 ){
				brackets.pop();
				lb.splice(n, 0, ']');
			}
		}
		n++;
	}
	while( brackets.n > 0 ){
		brackets.pop();
		lb[lb.length] = ']';
	}
	return lb.join("");

}

function insertComposedFields(row, typ, cell1, cell2, variable, offset, ref, name, lastRow){
	var //values = Interpreter.getValueWithIndexToTab(variable.id, ref, offset, typ),
			show = false
	,		table = document.getElementById('tab_var');

	addEventInCell(show, cell2, lastRow, table, row, variable, offset, ref, typ, name);
	cell2.innerHTML = "<i class='glyphicon glyphicon-plus'></i><div id='variableToggle_"+variable.id+"'>";
	cell1.innerText = variable.name + normalizeComposedLabel({}, name);
	setAttributeInComposedRow(row, variable.id);
}

function addEventInCell(show, cell, lastRow, table, row, variable, offset, ref, typ, name = ''){
	var mTyp, mRef, mOffset, i, n, sz;
	cell.addEventListener("click", function(){
		if(show){
			show = false;
			cell.innerHTML = "<i class='glyphicon glyphicon-plus'></i><div id='variableToggle_"+variable.id+"'>"
			let i = lastRow.rowIndex;
			while(i > row.rowIndex)
				table.deleteRow(i--);
		}
		else{
			show = true;
			lastRow = row;
			if(typ === arrays){
				mTyp = atab[ref].eltyp;
				mRef = atab[ref].elref;
				n = atab[ref].low;
				cell.innerHTML = "<i class='glyphicon glyphicon-minus'></i><div id='variableToggle_"+variable.id+"'>"
				mOffset = offset;
				while(n <= atab[ref].high){
					lastRow = insertVariableInDebugPanel(variable, lastRow.rowIndex+1, mRef, mTyp, mOffset, name + ', ' + n);
					mOffset += atab[ref].elsize;
					n++;
				}
			}
			else{
				mOffset = offset;
				n = btab[ref].last;
				mTyp = tab[n].typ;
				mRef = tab[n].ref;
				mOffset += btab[ref].vsize;
				cell.innerHTML = "<i class='glyphicon glyphicon-minus'></i><div id='variableToggle_"+variable.id+"'>"
				while(n != 0){
					lastRow = insertVariableInDebugPanel(variable, lastRow.rowIndex+1, mRef, mTyp, mOffset, name + '.'+tab[n].name);
					mOffset -= tab[n].adr;
					n = tab[n].link;
				}
			}
		}
	});
}

/*function insertComposedFields(variable, ref, actualRow, typ = tab[variable.id].typ, offset = 0, legacyName = (typ === arrays?'[':'')){
	var table = document.getElementById('tab_var')
	,		rowIndex = actualRow.rowIndex
	,		firstRow = table.rows[rowIndex]
	,		row
	,		otherRow
	,		values = Interpreter.getValueWithIndexToTab(variable.id, ref, offset, typ)
	,		value = Array.isArray(values) ? values.shift(): values
	,		cell1, cell2
	,		t
	,		i
	,		show = false
	,		finalRow = 0;
	if(typ == arrays){
		if(!Array.isArray(value))
			typ = atab[ref].eltyp;
		i = atab[ref].low;
		legacyName += legacyName === '[' ? '' + (atab[ref].inxtyp === chars ? String.fromCharCode(i):i) : ', ' + (atab[ref].inxtyp === chars ? String.fromCharCode(i):i);
	}
	if(typ == records){
		t = btab[ref].last;
		if(!Array.isArray(value))
			typ = tab[t].typ;
	}

	while(value != undefined){
		row = table.insertRow(++rowIndex);
		cell1 = row.insertCell(0);
		cell2 = row.insertCell(1);
		if(typ in stantyps){
			cell1.innerText = legacyName+(legacyName === '['? '' : ', ')+(atab[ref].inxtyp == chars? String.fromCharCode(i):i)+']';
			cell2.innerHTML = "<input type='text' disabled=disabled value='"+ value +"'name='"+variable.id+i+"'id='"+ variable.id +"'>";
			i++;
			offset += typesLength[typ];
		}
		else{
			setAttributeInRow(row, variable.id);
			formatElementsInCells(row, cell1, cell2, show, variable, offset, ref, legacyName, i, finalRow);
			if(typ === arrays)
				offset += atab[ref].elsize;
			else if(typ === records){
				offset += btab[ref].vsize;
				t = tab[t].link;
				typ = tab[t].typ;
			}
			i++;
		}
		value = values.shift();
	}
	return row;

}*/

function formatElementsInCells(row, cell1, cell2, show, variable, offset, ref, legacyName = '', i = 1, finalRow){
	var table = document.getElementById('tab_var');
	cell2.innerHTML = "<i class='glyphicon glyphicon-plus'></i><div id='variableToggle_"+variable.id+"'>";
	cell1.innerHTML = legacyName+(legacyName === '['? '' : ', ')+(atab[ref].inxtyp == chars? String.fromCharCode(i):i)+']';
	cell2.addEventListener("click", function(){
		if(show){
			show = false;
			cell2.innerHTML = "<i class='glyphicon glyphicon-plus'></i><div id='variableToggle_"+variable.id+"'>"
			let i = finalRow.rowIndex;
			while(i > row.rowIndex)
				table.deleteRow(i--);

		}
		else{
			let n = '';
			if (legacyName == '')
				n = '[';
			else{
				if (legacyName == '[')
					n += '';
				else
					n += ', ';// + atab[ref].inxtyp === chars ? String.fromCharCode(i):i;
			}
			finalRow = insertComposedFields(variable, atab[ref].elref, row, atab[ref].eltyp, offset, legacyName + n);
			show = true;
			cell2.innerHTML = "<i class='glyphicon glyphicon-minus'></i><div id='variableToggle_"+variable.id+"'>"
		}
	});
}

function setAttributeInComposedRow(row, id){
	row.setAttribute("class", "clickable");
	row.setAttribute("data-toggle", "collapse");
	row.setAttribute("data-target", ".row"+id);
	row.setAttribute("id", "linha_"+id);
}

function adicionaFilhos(objeto){
	var table = document.getElementById("tab_var");
	var row = table.insertRow(3);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	row.setAttribute("class", "collapse active row"+id_linha_pai);

	cell1.innerHTML = objeto.name;
	cell2.innerHTML = "<input type='text' value='"+ objeto.value +"'name='"+objeto.id+"' id='"+ objeto.id +"'>";
}

function disableVariableInput(){
	$("#tab_var").find("input").attr("disabled", "disabled");
}

function ativarTabelaVar(){
	$("#tab_var").find("input").removeAttr('disabled');
}

function removerTopoPilhaVar() {
	if (document.getElementById("tab_var").getElementsByTagName("tr").length > 2) {
		document.getElementById("tab_var").deleteRow(2);
	}
}

function removerTodaPilhaVar(){
	$("#tab_var tr:gt(1)").remove();
	arrayObjetoTabela = [];
}
//funcao para salvar as variaveis editadasstr_tab
function eachObjetoTabela(objeto){
	var input = document.getElementById(objeto.id);
	if(input != null){
		switch (tab[objeto.id].typ) {
			case "strings":
			var adr = s.getInt32(objeto.adr);
			StringAlloc(input.value);
			break;
			case "reals":
			number = Number(input.value);
			if(!Number.isNaN(number))
			s.setFloat64(objeto.adr, number);
			else
			input.value = "NaN";
			break;
			case "ints":
			number = Number(input.value);
			if(!Number.isNaN(number))
			s.setInt32(objeto.adr, number);
			else
			input.value = "NaN";
			break;
			case "bools":
			var str = input.value;
			str = str.toLowerCase();
			if(str == "verdadeiro")
			s.setUint8(objeto.adr, 1);
			else{
				s.setUint8(objeto.adr, 0);
				input.value = "falso";
			}
			break;
			case "chars":
			var char = input.value.charCodeAt();
			s.setUint8(objeto.adr, char);
			input.value = char;
			break;
		}
	}

}


//funcao para atualizar todas as variaveis
function atualizarTodasVar(){
	for (var i = 0; i < arrayObjetoTabela.length; i++) {
		var objeto = arrayObjetoTabela[i];
		var input = document.getElementById(objeto.idinput);
		if (input !== null) {
			input.value = s[objeto.posValor];
		}
	}
}

//fim funcoes para pilha de variaveis

function mostraItensDepuracao(bool){
	if (bool) {
		insertDebugHTML();
		document.getElementById("continuar").style.visibility = "visible";
		document.getElementById("exe_cursor").style.visibility = "visible";
		document.getElementById("prox_funcao").style.visibility = "visible";
		// document.getElementById("exe_entrando").style.visibility = "visible";
		document.getElementById("exe_saindo").style.visibility = "visible";
		//document.getElementById("nao_parar").style.visibility = "visible";
		//document.getElementById("lb_nao_parar").style.visibility = "visible";
		document.getElementById("coluna_direita").style.visibility = "visible";


		document.getElementById("codDiv").className = "col-md-7";
		document.getElementById("coluna_direita").className = "col-md-5 col-xs-12";
		document.getElementById("coluna_direita").style.height = "550px";

	} else {
		//document.getElementById("continuar").style.visibility = "hidden";
		//document.getElementById("exe_cursor").style.visibility = "hidden";
		//document.getElementById("prox_funcao").style.visibility = "hidden";
		// document.getElementById("exe_entrando").style.visibility = "hidden";
		//document.getElementById("exe_saindo").style.visibility = "hidden";
		//document.getElementById("nao_parar").style.visibility = "hidden";
		//document.getElementById("lb_nao_parar").style.visibility = "hidden";
		//document.getElementById("coluna_direita").style.visibility = "hidden";

		document.getElementById("codDiv").className = "col-md-12";
		//document.getElementById("coluna_direita").className = "";
		//document.getElementById("coluna_direita").style.width = "1px;";
		//document.getElementById("coluna_direita").style.height = "1px";

	}
}

function mostraItensDepuracao2(bool){
	if (bool) {
		document.getElementById("colunaDepuracao").className = "col-md-4";
	} else {
		document.getElementById("colunaDepuracao").className = "col-md-0";
	}
}


function mostraBtExecucarNovamente(bool){
	if (bool) {
		document.getElementById("btNovamente").style.visibility = "visible";
	}else{
		document.getElementById("btNovamente").style.visibility = "hidden";
	}
}

mostraItensDepuracao(false);
