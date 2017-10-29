angular.module("filmes").factory("MeusFilmes", function($q, $http){
	return {
		listar: function() {
			var promessa = $q.defer();

			var configHeader = {headers: {
				'client_id': '61922-pof198w5fn6r1e610p62hbtqe974l63y-swagger-ui',
				'Accept': 'application/json;'
				}
			};

			var queryParam = window.location.search.replace("?", "");

			// exemplo de URL para chamar o metodo - http://localhost:8085/angular/app/?auctionId=59251
			var paramEncoded = encodeURIComponent(queryParam + ":start=0:limit=300");

			//buscar lotes
			$http.get("https://stgapi.s4bdigital.net/auction-query/lc/portal/2/offers?q=" + paramEncoded, configHeader).then(
				function(result){
					var filmes = [];

					angular.forEach(result.data.offers, function(filme, offers){
						
						//buscar descricao completa
						$http.get("https://stgapi.s4bdigital.net:443/auction-query/lc/offer/"+ filme.id +"/full-desc", configHeader).then(
							function(result2){

								angular.forEach(result2.data, function(v, o){

									if(o == "fullDesc"){
										filme.fullDesc = v;
									}	
									
								});
														}
						)

						//buscar lances
						$http.get("https://stgapi.s4bdigital.net:443/auction-query/lc/offer/"+ filme.id +"/bid-ranking", configHeader).then(
							function(result2){

								angular.forEach(result2.data, function(v, o){

									if(o == "bids"){
										filme.bids = v;
									}	
									
								});
														}
						)

						filmes.push(filme);
					});

			
					promessa.resolve(filmes);
				}
			);

			return promessa.promise;
		},

		searchOfferComplete: function(obj) {
			var id = obj.offerId;
			
			var configHeader = {headers: {
				'client_id': '61922-pof198w5fn6r1e610p62hbtqe974l63y-swagger-ui',
				'Accept': 'application/json;'
				}
			};

			return $http.get("https://stgapi.s4bdigital.net/auction-query/lc/offer/" + id, configHeader);
		},
		
	};
});