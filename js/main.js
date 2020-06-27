class caixa {
    static atvOperacional = class {
        constructor(recClientes, pagFornecedores, pagFuncionarios, recolGoverno, pagDividas, balancoOperacional) {
            this.recClientes = recClientes
            this.pagFornecedores = pagFornecedores
            this.pagFuncionarios = pagFuncionarios
            this.recolGoverno = recolGoverno
            this.pagDividas = pagDividas
            this.balancoOperacional = balancoOperacional
        }
    }
    static atvFinanciamento = class {
        constructor(emprestimos, armotizacaoEmprestimos, debentures, integralizacaoCapital, pagDividendos, balancoFinanciamento) {
            this.emprestimos = emprestimos
            this.armotizacaoEmprestimos = armotizacaoEmprestimos
            this.debentures = debentures
            this.integralizacaoCapital = integralizacaoCapital
            this.pagDividendos = pagDividendos
            this.balancoFinanciamento = balancoFinanciamento
        }
    }
    static atvInvestimento = class {
        constructor(recImobiliarias, aquisicaoAtivoPermanente, recDividendos, balancoInvestimento) {
            this.recImobiliarias = recImobiliarias
            this.aquisicaoAtivoPermanente = aquisicaoAtivoPermanente
            this.recDividendos = recDividendos
            this.balancoInvestimento = balancoInvestimento
        }
    }

    static saldo = class {
        constructor(saldo, saldoInicial) {
            this.saldo = saldo
            this.saldoInicial = saldoInicial
        }
    }

    static totalBalanco = class {
        constructor(balancoFinalOperacional, balancoFinalFinanceiro, balancoFinalInvestimentos, final, saldo, saldoInicial) {
            this.balancoFinalOperacional = balancoFinalOperacional
            this.balancoFinalFinanceiro = balancoFinalFinanceiro
            this.balancoFinalInvestimentos = balancoFinalInvestimentos
            this.final = final
            this.saldo = saldo
            this.saldoInicial = saldoInicial
        }
    }

    

    static add = function () {
        let varDump = new Object();
        Object.assign(varDump, new caixa.atvOperacional(0, 0, 0, 0, 0, "0"))
        Object.assign(varDump, new caixa.atvFinanciamento(0, 0, 0, 0, 0, "0"))
        Object.assign(varDump, new caixa.atvInvestimento(0, 0, 0, "0"))
        return varDump
    }
}

var period = []
let selectedPeriod = 1

var balancoFinal = new caixa.totalBalanco([], [], [], [], [], [])
var balancoVar = new caixa.totalBalanco(0, 0, 0, 0, 0, 0)

//Inicializa primeiro periodo
period.push(new caixa.add)

window.onchange = async function () {
    let container = document.getElementById("containerBody")
    let inputs = container.getElementsByTagName("input")
    let display = container.getElementsByTagName("span")
    let menu = document.getElementById("menu")
    let periods = menu.getElementsByTagName("li").length
    let saldo = document.querySelector("[name=saldo]")

    for (i = 0; i < inputs.length; i++) {
        // Atualiza valores no objeto
        if (i <= 4) {
            period[selectedPeriod - 1][inputs[i].name] = Number(inputs[i].value)
        } else if (i > 4 && i <= 9) {
            period[selectedPeriod - 1][inputs[i].name] = Number(inputs[i].value)
        } else if (i > 9 && i <= 12) {
            period[selectedPeriod - 1][inputs[i].name] = Number(inputs[i].value)
        }
        // Realiza a atualizacao do valor por balanco e periodo das atividades

         switch (i) {
            case 0:
                saldo.setAttribute('disabled', 'disabled');
                period[selectedPeriod - 1].saldo = 0
                period[selectedPeriod - 1].saldo += Math.abs(inputs[0].value)
                balancoFinal.saldo[selectedPeriod - 1] = period[selectedPeriod - 1].saldo
            case 4:
                period[selectedPeriod - 1].balancoOperacional = 0
                period[selectedPeriod - 1].balancoOperacional += Math.abs(inputs[1].value)
                period[selectedPeriod - 1].balancoOperacional += -Math.abs(inputs[2].value)
                period[selectedPeriod - 1].balancoOperacional += -Math.abs(inputs[3].value)
                period[selectedPeriod - 1].balancoOperacional += -Math.abs(inputs[4].value)
                period[selectedPeriod - 1].balancoOperacional += -Math.abs(inputs[5].value)
                balancoFinal.balancoFinalOperacional[selectedPeriod - 1] = period[selectedPeriod - 1].balancoOperacional
                break;
            case 7:
                period[selectedPeriod - 1].balancoFinanciamento = 0
                period[selectedPeriod - 1].balancoFinanciamento += -Math.abs(inputs[6].value)
                period[selectedPeriod - 1].balancoFinanciamento += -Math.abs(inputs[7].value)
                period[selectedPeriod - 1].balancoFinanciamento += Math.abs(inputs[8].value)
                period[selectedPeriod - 1].balancoFinanciamento += Math.abs(inputs[9].value)
                period[selectedPeriod - 1].balancoFinanciamento += -Math.abs(inputs[10].value)
                balancoFinal.balancoFinalFinanceiro[selectedPeriod - 1] = period[selectedPeriod - 1].balancoFinanciamento
                break;
            case 12:
                period[selectedPeriod - 1].balancoInvestimento = 0
                period[selectedPeriod - 1].balancoInvestimento += Math.abs(inputs[11].value)
                period[selectedPeriod - 1].balancoInvestimento += -Math.abs(inputs[12].value)
                period[selectedPeriod - 1].balancoInvestimento += Math.abs(inputs[13].value)
                balancoFinal.balancoFinalInvestimentos[selectedPeriod - 1] = period[selectedPeriod - 1].balancoInvestimento
                break;
    
            }
            
    }
    changeModal();

    
}
async function callBox(id, idIn, idOut) {
    selectedPeriod = id
    let containerMenu = document.getElementById("menu")
    let menu = containerMenu.getElementsByTagName("a")
    let container = document.getElementById("containerBody")
    let inputs = container.getElementsByTagName("input")

    for (i = 0; i < menu.length; i++) {
        menu[i].classList.remove("active")
    }

    document.getElementById("nav" + id).classList.add("active")
    document.getElementById(idOut).classList.add("fadein")
    for (i = 0; i < inputs.length; i++) {
        if (i <= 4) {
            inputs[i].value = period[selectedPeriod - 1][inputs[i].name]
        } else if (i > 4 && i <= 9) {
            inputs[i].value = period[selectedPeriod - 1][inputs[i].name]
        } else if (i > 9 && i <= 12) {
            inputs[i].value = period[selectedPeriod - 1][inputs[i].name]
        }
    }
    function convertModal(enter) {
        if (enter != 0) {
            return enter.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        } else {
            return "R$ 0.0"
        }
    }
    var balancoOperacional = document.getElementById("balancoOperacional");
    balancoOperacional.innerHTML = convertModal(period[selectedPeriod - 1].balancoOperacional);
    var balancoFinanciamento = document.getElementById("balancoFinanciamento");
    balancoFinanciamento.innerHTML = convertModal(period[selectedPeriod - 1].balancoFinanciamento);
    var balancoInvestimento = document.getElementById("balancoInvestimento");
    balancoInvestimento.innerHTML = convertModal(period[selectedPeriod - 1].balancoInvestimento);

    var saldoInicial = document.getElementById("saldoInicial");
    saldoInicial.innerHTML = convertModal(period[selectedPeriod - 1].saldoInicial);


    await new Promise(resolve => setTimeout(resolve, 2000))
    document.getElementById(idIn).classList.remove("fadein")


}
async function addNewPeriod() {
    let containerMenu = document.getElementById("menu")
    let aliasMenu = containerMenu.getElementsByTagName("li")
    period.push(new caixa.add)
    containerMenu.innerHTML += "<li class='nav-item fadein'><a class='nav-link' id='nav" + (aliasMenu.length + 1) + "' onclick='callBox(" + (aliasMenu.length + 1) + ", \"containerBody\", \"containerBody\")' href='#'>" + (aliasMenu.length + 1) + "ª semana</a></li>"
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(period)

}
function changeModal() {

    //INNER CARDS MODAL
    var balancoOperacional = document.getElementById("balancoOperacional")
    balancoOperacional.innerHTML = period[selectedPeriod - 1].balancoOperacional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    if (period[selectedPeriod - 1].balancoOperacional >= 0) {
        balancoOperacional.classList.add("badMoney")
        balancoOperacional.classList.add("goodMoney")
    } else {
        balancoOperacional.classList.remove("goodMoney")
        balancoOperacional.classList.add("badMoney")
    }

    var balancoFinanciamento = document.getElementById("balancoFinanciamento")
    balancoFinanciamento.innerHTML = period[selectedPeriod - 1].balancoFinanciamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    if (period[selectedPeriod - 1].balancoFinanciamento >= 0) {
        balancoFinanciamento.classList.add("badMoney")
        balancoFinanciamento.classList.add("goodMoney")
    } else {
        balancoFinanciamento.classList.remove("goodMoney")
        balancoFinanciamento.classList.add("badMoney")
    }


    var balancoInvestimento = document.getElementById("balancoInvestimento")
    balancoInvestimento.innerHTML = period[selectedPeriod - 1].balancoInvestimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    if (period[selectedPeriod - 1].balancoInvestimento >= 0) {
        balancoInvestimento.classList.add("badMoney")
        balancoInvestimento.classList.add("goodMoney")
    } else {
        balancoInvestimento.classList.remove("goodMoney")
        balancoInvestimento.classList.add("badMoney")
    }


    //MODAL DISPONIBILIDADES

    function finalResult(element, id) {
        balancoVar[id] += element
    }
    function changeModal(element, value) {
        var elementVar = document.getElementById(element)
        balancoFinal[value].forEach(element => { finalResult(element, value); })
        elementVar.innerHTML = balancoVar[value].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (balancoVar[value] >= 0) {
            elementVar.classList.add("badMoney")
            elementVar.classList.add("goodMoney")
        } else {
            elementVar.classList.remove("goodMoney")
            elementVar.classList.add("badMoney")
        }
    }

    changeModal("totalBalOp", "balancoFinalOperacional")
    changeModal("totalBalInv", "balancoFinalInvestimentos")
    changeModal("totalBalFinanc", "balancoFinalFinanceiro")
    changeModal("saldoInicial", "saldo")

    var elementVar = document.getElementById("totalBalFinal")
    balancoVar.final = balancoVar["balancoFinalOperacional"] + balancoVar["balancoFinalInvestimentos"] + balancoVar["balancoFinalFinanceiro"] + balancoVar["saldo"]
    elementVar.innerHTML = balancoVar.final.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (balancoVar.final >= 0) {
        elementVar.classList.add("badMoney")
        elementVar.classList.add("goodMoney")
    } else {
        elementVar.classList.remove("goodMoney")
        elementVar.classList.add("badMoney")
    }
    
    balancoVar["balancoFinalOperacional"] = 0
    balancoVar["balancoFinalInvestimentos"] = 0
    balancoVar["balancoFinalFinanceiro"] = 0
    balancoVar["saldo"] = 0
    balancoVar.final = 0


}
