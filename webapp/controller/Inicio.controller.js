sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("projetonetflix.controller.Inicio", {
        onInit: function () {

            //NOMECLATURA
            let sNome = 'Cristiano';//string
            let aLista = []; //array
            let oUser = {}; //
            
            //definição de lista vazia de resultados
          let resultados = {
            titles: []
          }

          //definição de modelo - variável especial para mostrar dados na tela
          let resultadosModel = new JSONModel();
          //atribuição de dados
          resultadosModel.setData(resultados);
          //anexar modelo na tela
          let tela = this.getView();
          tela.setModel(resultadosModel, "APINetflix");

        },
        onInicioLinkPress: function(){
            alert("navegar para a tela inicial");
        },

        onBuscarDados: function(){
            //busca de dados na api da netflix
            let searchField = this.byId("idSearchField");
            let filtro = searchField.getValue();

            alert(filtro);

            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'deb352dea3msh7cb9fd6137bce55p192dfcjsnd2c9b34bfbe3',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                //RESGATAR O MODELO E ATUALIZAR OS DADOS

                let tela = this.getView();
                let modelo = tela.getModel("APINetflix");
                let dados = modelo.getData();

                //limpar a lista
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh();
                
            }.bind(this));
        }
    });
});
