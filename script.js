function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function getInputValue(id) {
    const value = document.getElementById(id)?.value;
    return value && !isNaN(value) ? parseFloat(value) : 0;
}

function calcularCustos() {
    // Obter área total
    const hectares = getInputValue('hectares');
    if (hectares <= 0) {
        alert('Por favor, insira uma área válida em hectares.');
        return;
    }

    // Calcular custos de insumos por hectare
    const custoSementes = getInputValue('sementes') * getInputValue('sementes-kg');
    const custoFertilizantes = getInputValue('fertilizantes') * getInputValue('fertilizantes-kg');

    // Calcular custos de defensivos por hectare
    const custoHerbicidas = getInputValue('herbicidas') * getInputValue('herbicidas-l');
    const custoInseticidas = getInputValue('inseticidas') * getInputValue('inseticidas-l');
    const custoFungicidas = getInputValue('fungicidas') * getInputValue('fungicidas-l');

    // Calcular outros custos totais
    const custoMaoObra = getInputValue('mao-obra') * getInputValue('mao-obra-dias');
    const custoMaquinario = getInputValue('maquinario') * getInputValue('maquinario-horas');

    // Calcular custos por hectare
    const custosVariaveisPorHectare = custoSementes + custoFertilizantes + 
                                    custoHerbicidas + custoInseticidas + custoFungicidas;

    // Calcular custos totais
    const custoTotalInsumos = custosVariaveisPorHectare * hectares;
    const custoTotalOutros = custoMaoObra + custoMaquinario;
    const custoTotal = custoTotalInsumos + custoTotalOutros;
    const custoPorHectare = custoTotal / hectares;

    // Atualizar resultados
    document.getElementById('custo-hectare').textContent = formatarMoeda(custoPorHectare);
    document.getElementById('custo-total').textContent = formatarMoeda(custoTotal);

    // Atualizar detalhamento
    atualizarDetalhamento({
        hectares,
        sementes: custoSementes * hectares,
        fertilizantes: custoFertilizantes * hectares,
        herbicidas: custoHerbicidas * hectares,
        inseticidas: custoInseticidas * hectares,
        fungicidas: custoFungicidas * hectares,
        maoObra: custoMaoObra,
        maquinario: custoMaquinario
    });
}

function atualizarDetalhamento(custos) {
    const details = document.getElementById('details');
    details.innerHTML = `
        <h3>Detalhamento dos Custos</h3>
        <div class="detail-item">
            <span>Área Total:</span>
            <span>${custos.hectares} hectares</span>
        </div>
        <div class="detail-item">
            <span>Sementes:</span>
            <span>${formatarMoeda(custos.sementes)}</span>
        </div>
        <div class="detail-item">
            <span>Fertilizantes:</span>
            <span>${formatarMoeda(custos.fertilizantes)}</span>
        </div>
        <div class="detail-item">
            <span>Herbicidas:</span>
            <span>${formatarMoeda(custos.herbicidas)}</span>
        </div>
        <div class="detail-item">
            <span>Inseticidas:</span>
            <span>${formatarMoeda(custos.inseticidas)}</span>
        </div>
        <div class="detail-item">
            <span>Fungicidas:</span>
            <span>${formatarMoeda(custos.fungicidas)}</span>
        </div>
        <div class="detail-item">
            <span>Mão de Obra:</span>
            <span>${formatarMoeda(custos.maoObra)}</span>
        </div>
        <div class="detail-item">
            <span>Maquinário:</span>
            <span>${formatarMoeda(custos.maquinario)}</span>
        </div>
    `;
}

// Adicionar eventos de input para cálculo em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calcularCustos);
    });
});
