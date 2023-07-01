const { ipcRenderer } = require('electron');

let Cadastrar = document.getElementById('cadastrar');

Cadastrar.addEventListener('submit', async (e) =>{
    e.preventDefault();


    try{
        let Modelo = document.getElementById('modelo');
        let Marca = document.getElementById('marca');
        let Tipo = document.getElementById('tipo');
        let Placa = document.getElementById('placa');
        let Ano = document.getElementById('ano');
        let CPF = document.getElementById('cpf');


        let ModeloResult = Modelo.value || "null";
        let MarcaResult = Marca.value || "Null";
        let TipoResult = Tipo.value || "Null";
        let PlacaResult = Placa.value || "Null";
        let AnoResult = Ano.value || "Null";
        let CpfResult = CPF.value || "Null"

        console.log(ModeloResult)
        console.log(MarcaResult)
        console.log(TipoResult)
        console.log(PlacaResult)
        console.log(AnoResult)
        console.log(CpfResult)
        const data = {modelo: ModeloResult, marca: MarcaResult, tipo: TipoResult, placa: PlacaResult, ano: AnoResult, cpf: CpfResult};

        ipcRenderer.send('cadastroVeiculo', data);


        ipcRenderer.on('cadVeiculo', (event, resposta) => {
            console.log("Dentro: " + resposta); // 'OK'
            executarAposResposta(resposta);
          });


          function executarAposResposta(resposta){
            if(resposta){
                Modelo.value = "";
                Marca.value = "";
                Tipo.value = "";
                Placa.value = "";
                Ano.value = "";
                CPF.value = "";
                console.log("Modelo: " + ModeloResult)
                Swal.fire(
                    'Sucesso!!',
                    'Veículo Cadastrado',
                    'success'
                  );
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'CPF não encontrado!!',
                  })
            }
          }  

    }catch(e){
        console.log("DEU ERRO MERDA")
    }
    
    

})

