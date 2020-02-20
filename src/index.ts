
import './styles.css';

const inputBillAmount = document.getElementById('imputBillAmount') as HTMLInputElement;
const displayBillAmount = document.getElementById('displayBillAmount') as HTMLLIElement;
const displayTipPercentage = document.getElementById('displayTipPercentage') as HTMLLIElement;
const displayAmountOfTip = document.getElementById('displayAmountOfTip') as HTMLLIElement;
const displayTotal = document.getElementById('displayTotal') as HTMLLIElement;

inputBillAmount.addEventListener('keyup', setBillAmount);

function setBillAmount() {
    displayBillAmount.innerText = `Bill Amount: $${inputBillAmount.value}`;
}
