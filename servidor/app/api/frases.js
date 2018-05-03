var api = {};

var frases = [
	{_id: 0, texto:'Debuggers não consertam erros, apenas os exibem em slow motion.',tempo: 8 },
	{_id: 1, texto:'Existem duas tarefas difíceis na Ciência da Computação: invalidação de cache e nomear as coisas.', tempo: 15 },
	{_id: 2, texto:'Ciência da computação é tão sobre computadores quanto astronomia é sobre telescópios.', tempo: 15 },
	{_id: 3, texto:'Na minha máquina funciona.', tempo: 5 },
	{_id: 4, texto:'Hardware é o que você chuta, software é o que você xinga.', tempo: 12 },
	{_id: 5, texto:'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.', tempo: 22 },
	{_id: 6, texto:'It’s not a bug – it’s an undocumented feature.', tempo: 16 },
	{_id: 7, texto:'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', tempo: 34 },
	{_id: 8, texto:'I dont always test my code, but when I do, I do it in production', tempo: 19 },

	];

api.lista = function(req, res) {

	setTimeout(function(){
		if(req.query.id) return res.json(frases[req.query.id]);

		res.json(frases);
	},1500);

};

module.exports = api;
