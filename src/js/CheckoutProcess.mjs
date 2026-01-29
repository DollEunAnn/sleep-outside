export class CheckoutModule {
    constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubTotal() {
        let itemNumber = 0;
        let shipping = 0;
        let subTotal = 0;
        this.list.forEach(item => {
            subTotal += item.FinalPrice;
            itemNumber += 1;
            if(itemNumber = 1) {
                shipping += 10;
            } else {
                shipping += 2;
            }
        this.shipping = shipping;
        return subTotal;
        });
        
    }

    calcTotal() {
        this.tax = (this.itemTotal * 0.06);
        this.orderTotal = this.tax + this.calculateItemSubTotal() + this.shipping;
    }

    displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}