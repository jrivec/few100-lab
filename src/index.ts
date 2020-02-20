import './styles.css';

const inputBillAmount = document.getElementById('inputBillAmount') as HTMLInputElement;
const displayBillAmount = document.getElementById('displayBillAmount') as HTMLLIElement;
const displayTipPercentage = document.getElementById('displayTipPercentage') as HTMLLIElement;
const displayPercentagecomment = document.getElementById('displayPercentagecomment') as HTMLSpanElement;
const displayAmountOfTip = document.getElementById('displayAmountOfTip') as HTMLLIElement;
const displayTotal = document.getElementById('displayTotal') as HTMLLIElement;
const button10 = document.getElementById('ten') as HTMLButtonElement;
const button15 = document.getElementById('fifteen') as HTMLButtonElement;
const button20 = document.getElementById('twenty') as HTMLButtonElement;
const buttonGroup = document.getElementsByClassName('.btn-group') as unknown as HTMLDivElement;

const allButtons = [button10, button15, button20];
allButtons.forEach(btn => btn.addEventListener('click', checkButtons));
inputBillAmount.addEventListener('keyup', setBillAmount);

const savedPercentage = false;
console.log('global');

if (savedPercentage) {
    // set button here
} else {
    button10.disabled = false;
    button15.disabled = false;
    button20.disabled = false;
}

let tp = 0;

function ShouldRunCalculate(): boolean {
    const btn = allButtons.filter(btn => btn.disabled === true);
    return btn !== undefined;
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
    }
    calculateAndUpdate();
}


function setTipPercentage() {
    displayTipPercentage.innerText = `Tip Percentage: ${tp.toString()}%`;
    displayPercentagecomment.innerText = `${tp.toString()}%`;
}

function setBillAmount() {
    if (inputBillAmount.value.length > 0) {
        displayBillAmount.innerText = `Bill Amount: $${inputBillAmount.value} `;
        calculateAndUpdate();
    } else {
        resetAll();
    }
}

function setTipAmount() {
    const tip = (tp * Number.parseFloat(inputBillAmount.value)) / 100;
    displayAmountOfTip.innerText = `Amount of tip: ${tip.toString()}`;
}


function setTotalAmount() {
    const bill: number = Number.parseFloat(inputBillAmount.value);
    const tip = tp * Number.parseFloat(inputBillAmount.value);
    const total = bill + tip / 100;

    if (inputBillAmount.value.length > 0) {
        displayTotal.innerText = `Total To Be Paid: $${total} `;
    }
}

function resetAll() {
    displayBillAmount.innerText = `Bill Amount:`;
    displayAmountOfTip.innerText = `Amount of tip:`;
    displayTotal.innerText = `Total To Be Paid:`;
}
