function moltiplicatoreToTempo(moltiplicatore) {
    const unita = 3600 
    let m = moltiplicatore * unita // converto tutto in secondi, finche non uso un'unita di misura da select
    const anniInSecondi = 365*24*60*60
    const giorniInSecondi = 24*60*60
    const oreInSecondi = 60*60
    const minutiInSecondi = 60
    
    let anni = 0
    let giorni = 0
    let ore = 0
    let minuti = 0
    let secondi = 0

    if (m >= anniInSecondi) {
        anni = Math.floor(m/anniInSecondi)
        m -= anni * anniInSecondi
    }

    if (m >= giorniInSecondi) {
        giorni = Math.floor(m/giorniInSecondi)
        m -= giorni * giorniInSecondi
    }

    if (m >= oreInSecondi) {
        ore = Math.floor(m/oreInSecondi)
        m -= ore * oreInSecondi
    }

    if (m >= minutiInSecondi) {
        minuti = Math.floor(m/minutiInSecondi)
        m -= minuti * minutiInSecondi
    }

    secondi = (Math.round(m)).toFixed(0)
    
    return {
        anni: anni,
        giorni: giorni,
        ore: ore,
        minuti: minuti,
        secondi: secondi
    }
}

function onChangeValue() {
    let massa = parseFloat(document.getElementById("massa_buco_nero").value)
    let distanza = parseFloat(document.getElementById("distanza").value)
    calculate(massa, distanza)
}

function getNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculate(massa, distanza) {
    // Velocità della luce [m/s]
    const c = 299792458

    // Costante gravitazionale di Newton [m^3 Kg^-1 s^-2]
    const G = 6.67E-11

    // Massa del buco nero in masse solari [-]
    const M = massa

    const html_massa_buco_nero = document.getElementById('massaBucoNero')
    html_massa_buco_nero.innerHTML = getNumberWithCommas(massa.toFixed(0))

    // Massa del sole [Kg]
    const M_s = 1.99E+30

    // Raggio orizzonte degli eventi (calcolato sulla massa M) [m]
    const R = 2 * G * M * M_s / (c * c)

    const html_orizzonte = document.getElementById('raggioOrizzonteEventi')
    html_orizzonte.innerHTML = getNumberWithCommas(R.toFixed(0))

    // Distanza dall'orizzonte degli eventi [m]
    const D = distanza

    // Percentuale di rallentamento del tempo rispetto a un osservatore infinitamente lontano dal buco nero
    const percentuale_rallentamento = (1 - Math.sqrt(1 - R / (R + D))) * 100

    const html_percentuale_rallentamento = document.getElementById('percentualeRallentamento')
    html_percentuale_rallentamento.innerHTML = percentuale_rallentamento.toFixed(4)

    // Moltiplicatore
    const moltiplicatore = 1 / Math.sqrt(1 - R / (R + D))

    const html_moltiplicatore = document.getElementById('moltiplicatore')
    html_moltiplicatore.innerHTML = moltiplicatore.toFixed(2)

    // converti il moltiplicatore (es. 1h vicino al buco nero 1.23 -> fa un'ora e 13 minuti)
    const html_anni = document.getElementById('anni')
    const html_giorni = document.getElementById('giorni')
    const html_ore = document.getElementById('ore')
    const html_minuti = document.getElementById('minuti')
    const html_secondi = document.getElementById('secondi')

    const tempo = moltiplicatoreToTempo(moltiplicatore)
    html_anni.innerHTML = tempo.anni
    html_giorni.innerHTML = tempo.giorni
    html_ore.innerHTML = tempo.ore
    html_minuti.innerHTML = tempo.minuti
    html_secondi.innerHTML = tempo.secondi
}

onChangeValue()