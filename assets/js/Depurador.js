//ATALHOS
//Para depurar
function debug(){
	if (isOk && isDone){
		debug_op = true;
		call_read = false;
		debug = false;
		limpaContadores();
		mostraItensDepuracao(true);
		stopln = kode[tab[btab[1].last].adr].line-1;
		limpaLinhaDepurador();
		mostraLinhaDepurador(stopln+1);
	}
	else {
		if (isOk){
			MsgErro = "Você precisa compilar primeiro.";
		}
		else {
			MsgErro = "A compilação não foi realizada com sucesso.";
		}
		mostraErro();
	}
}
shortcut.add("F6",function() {	debug();});


//para compilar
function compiler(){
	time = new Date().getTime();
	InputFile = editor.getValue();
	isOk = true;
	isDone = false;
	compiladorPascalS();
	document.getElementById("output").value = "";
	time = new Date().getTime() - time;
	mostraErro();
}
shortcut.add("F9",function() {
	compiler();
});

//executar o programa
function reexecute(){
	if(lastCompiledCode	!= GetHashCode(editor.getValue()))	compiler();
	if (isOk && isDone && !debug_op){
		limpaConsole();
		mostrarModalOutput();
		call_read = false;
		Interpreter.init();
	}
	else {
		if (debug_op){
			debug = false;
			call_read = true;
			stopln = kode[finalInst].line;
			if(kode[pc].f == 70)
			pc++;
			Interpreter.init();
		}
		else if (isOk){
			MsgErro = "Você precisa compilar o programa antes de executá-lo.";
			mostraErro();
			esconderModalOutput();
		}
		else {
			MsgErro = "O programa não foi compilado corretamente.";
			mostraErro();
			esconderModalOutput();
		}

	}
}
shortcut.add("Ctrl+F9",function(){reexecute();});

//Compilar e executar
shortcut.add("F10",function() {compileAndExecute();});

//rodar até o cursor
function runToCursor(){
	if(!debug_op){
		debug();
	}
	stopln = editor.getCursor().line-1;
	CursorRun = true;
	debug_op = true;
	if(!debug_op){
		debug();
		indebug = true;
		interpret();
	}
	interpret();

}
shortcut.add("F4",function(){Interpreter._DEBUGGER.Until();});

//passo-a-passo entrando em rotinas (step into)
function inRoutine(){
	debugger;
	if(!debug_op){
		debug();
		indebug = true;
		interpret();
	}
	else {
		indebug = true;
		stopln = kode[pc].line;
		interpret();
	}

}
shortcut.add("F7",function() {Interpreter._DEBUGGER.In();});

//Executar até o finalInst
shortcut.add("Ctrl+F7", function(){FinishIt();});
function FinishIt(){
	indebug = false;
	bydebug = false;
	CursorRun = false;
	outdebug = false;
	interpret();
}

//Executar até sair da rotina(step out)
function outRoutine(){
	outdebug = true;
	sNumber = getNumberStacks();
	debug = false;
	interpret();
}
shortcut.add("Ctrl+F8",function() {Interpreter._DEBUGGER.Out();});

//passo-a-passo saltando rotinas (step over)
function byRoutine(){
	if(!debug_op){
		debug();
		indebug = true;
		interpret();
	}
	else{
		if(kode[pc].f == 18){
			sNumber = getNumberStacks();
			stopln = kode[pc].line;
			bydebug = true;
			interpret();
		}
		else{
			bydebug = true;
			interpret();
		}
	}


}
shortcut.add("F8",function() {Interpreter._DEBUGGER.Over();});

//interromper a depuração e a execução
function stopDeb(){
	debug_op = false;
	pc = finalInst;
	interpret();
}
shortcut.add("Ctrl+F2",function() {
	stopDeb();
});

//fim atalhos

//funcao para adicionar linha para o depurador no editor
function mostraLinhaDepurador(linha){
	limpaLinhaDepurador();
	editor.addLineClass(linha, 'background', 'line-depurador');
	var info = editor.lineInfo(1);
}

function makeMarkerLinha(linha) {
	var span = document.getElementById("mk_"+linha);
	var valor = 0;

	if (span !== null) {
		valor = parseInt(span.innerHTML);
	}

	valor += 1;
	var marker = document.createElement("div");
	marker.style.color = "#822";
	marker.innerHTML = "<span id=mk_"+linha+" class='badge'>"+ valor +"</span>";
	aumentaMarker();
	return marker;
}

//altera o tamanho dos makers
function aumentaMarker(){
	var elements = document.querySelectorAll('.breakpoints');
	for(var i=0; i<elements.length; i++){
		elements[i].style.width = "28px";
	}
}
//altera o tamanho dos makers
function diminuiMarker(){
	var elements = document.querySelectorAll('.breakpoints');
	for(var i=0; i<elements.length; i++){
		elements[i].style.width = "15px";
	}
}

//limpa todas as linhas depurador
function limpaLinhaDepurador(){
	for(i = 0; i <= editor.lineCount(); i++){
		editor.removeLineClass(i,'background', 'line-depurador');
	}
}

//limpa todos os contadores
function limpaContadores(){
	editor.clearHistory();
	editor.clearGutter("breakpoints");
	diminuiMarker();
}

//funcao para incrementar o numero de vezes que a linha foi executadas
function incrementar(linha){
	editor.setGutterMarker(linha, "breakpoints", makeMarkerLinha(linha));
}

//funcao para adicionar linha de erro no editor
function mostraErroNaLinha(linha, titulo){
	editor.addLineClass(linha, 'background', 'line-error');
	var info = editor.lineInfo(1);
	editor.setGutterMarker(linha, "breakpoints", makeMarker(titulo));
}

//funcao que criar o marcador
function makeMarker(titulo) {
	var marker = document.createElement("div");
	marker.style.color = "#822";
	marker.innerHTML = "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>";
	if (titulo !== "") {
		marker.title = titulo;
	}else{
		marker.title = "";
	}
	marker.setAttribute("data-toggle", "tooltip");
	marker.setAttribute("data-placement", "right");
	return marker;
}
//funcao para remover erros do editor
function limparCodeBox(){
	for(i = 0; i <= editor.lineCount(); i++){
		editor.removeLineClass(i,'background', 'line-error');
	}
	editor.clearHistory();
	editor.clearGutter("breakpoints");
}

//seta tooltip
$(document).ready(function() {
	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

//criar um marquer para ponto de parada
function fazerPontoParada() {
	var marker = document.createElement("div");
	marker.style.color = "#822";
	marker.innerHTML = "●";
	return marker;
}
//verifica se tem ponto parada
function temPontoParada(n){
	var info = editor.lineInfo(n);
	if (info.gutterMarkers !== undefined){
		return true;
	}else{
		return false;
	}
}

//retorna todas as linhas com ponto de parada
function getLinhasPontoParada(){
	var linhas = [];
	for (var i = 0; i < editor.lineCount(); i++) {
		if (temPontoParada(i)) {
			linhas.push(i);
		}
	}
	return linhas;
}
