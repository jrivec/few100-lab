import './styles.css';

const inputBillAmount = document.getElementById('inputBillAmount') as HTMLInputElement;
const customTipAmount = document.getElementById('customTipAmount') as HTMLInputElement;

const displayBillAmount = document.getElementById('displayBillAmount') as HTMLLIElement;
const displayTipPercentage = document.getElementById('displayTipPercentage') as HTMLLIElement;
const displayPercentagecomment = document.getElementById('displayPercentagecomment') as HTMLSpanElement;
const displayAmountOfTip = document.getElementById('displayAmountOfTip') as HTMLLIElement;
const displayTotal = document.getElementById('displayTotal') as HTMLLIElement;
const button10 = document.getElementById('ten') as HTMLButtonElement;
const button15 = document.getElementById('fifteen') as HTMLButtonElement;
const button20 = document.getElementById('twenty') as HTMLButtonElement;
const buttonCustom = document.getElementById('custom') as HTMLButtonElement;
const buttonGroup = document.getElementsByClassName('.btn-group') as unknown as HTMLDivElement;

const invalidChars = [
    '-',
    '+',
    'e',
];
const invalidCharsE = [
    'e'
];
inputBillAmount.addEventListener('keydown', (e) => {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
});

customTipAmount.addEventListener('keydown', function (e) {
    const that = this as HTMLInputElement;

    if (e.key === 'Backspace') { return; }
    if (invalidChars.includes(e.key) || that.value.length >= 2) {
        e.preventDefault();
    }
});

const allButtons = [button10, button15, button20, buttonCustom];
let tp = 0;
let customTp = 0;
console.log('global');

allButtons.forEach(btn => btn.addEventListener('click', checkButtons));
inputBillAmount.addEventListener('keyup', setBillAmount);
customTipAmount.addEventListener('keyup', updateCustomButtonText);

function updateCustomButtonText() {
    customTp = Number.parseInt(customTipAmount.value);
    buttonCustom.innerText = customTp ? `${customTp}%` : 'Custom';
    localStorage.setItem('savedCustomTipPercentage', customTp.toString());
    if (buttonCustom.disabled === true) {
        tp = customTp ? customTp : 0;
        setTipPercentage();
        calculateAndUpdate();
    }
}


const savedPercentage = localStorage.getItem('savedTipPercentage');
const savedCustomPercentage = localStorage.getItem('savedCustomTipPercentage');
if (savedPercentage) {
    if (savedCustomPercentage) {
        customTp = Number.parseInt(savedPercentage);
        buttonCustom.innerText = `${customTp}%`;
    }
    switch (savedPercentage) {
        case '10':
            tp = 10;
            button10.disabled = true;
            setTipPercentage();
            break;
        case '15':
            tp = 15;
            button15.disabled = true;
            setTipPercentage();
            break;
        case '20':
            tp = 20;
            button20.disabled = true;
            setTipPercentage();
            break;
        default:
            // customTp = Number.parseInt(savedPercentage);
            tp = customTp;
            buttonCustom.disabled = true;
            customTipAmount.value = tp.toString();
            setTipPercentage();
    }
} else {
    button10.disabled = false;
    button15.disabled = false;
    button20.disabled = false;
    buttonCustom.disabled = false;
}

function ShouldRunCalculate(): boolean {
    // if a button is selected and there is anything in bill amount
    const btn = allButtons.filter(btn => btn.disabled === true);
    return btn !== undefined &&
        inputBillAmount.value.length > 0 &&
        parseFloat(inputBillAmount.value) > 0;
}
function calculateAndUpdate() {
    if (ShouldRunCalculate()) {
        setTipAmount();
        setTotalAmount();
    }
}

function checkButtons() {
    const that = this as HTMLButtonElement;
    if (that.disabled) { return; } // allready selected
    allButtons.forEach(btn => btn.disabled = (btn === that));
    switch (that) {
        case button10:
            tp = 10;
            setTipPercentage();
            break;
        case button15:
            tp = 15;
            setTipPercentage();
            break;
        case button20:
            tp = 20;
            setTipPercentage();
            break;
        case buttonCustom:

            tp = customTp ? customTp : 0;
            setTipPercentage();
            break;
    }
    localStorage.setItem('savedTipPercentage', tp.toString());
    calculateAndUpdate();
}


function setTipPercentage() {
    displayTipPercentage.innerText = `Tip Percentage: ${tp.toString()}%`;
    displayPercentagecomment.innerText = `${tp.toString()}%`;
}

function setBillAmount() {
    if (inputBillAmount.value.length > 0) {

        if (parseFloat(inputBillAmount.value) < 0) {
            const that = this as HTMLInputElement;
            that.classList.add('inTheRed');
            resetAll();
        } else {
            displayBillAmount.innerText = `Bill Amount: $${inputBillAmount.value} `;
            calculateAndUpdate();
        }
    } else {
        resetAll();
    }
}

function setTipAmount() {
    const tip = (tp * Number.parseFloat(inputBillAmount.value)) / 100;
    displayAmountOfTip.innerText = `Amount of tip: ${tip.toFixed(2)}`;
}

function setTotalAmount() {
    const bill: number = Number.parseFloat(inputBillAmount.value);
    const tip = tp * Number.parseFloat(inputBillAmount.value);
    const total = bill + tip / 100;

    if (inputBillAmount.value.length > 0) {
        displayTotal.innerText = `Total To Be Paid: $${total.toFixed(2)} `;
    }
}

function resetAll() {
    displayBillAmount.innerText = `Bill Amount:`;
    displayAmountOfTip.innerText = `Amount of tip:`;
    displayTotal.innerText = `Total To Be Paid:`;
}
