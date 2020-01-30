function getTotal(price, total) {
    return price * total
}

function formatMoney(money) {
    let result = 'Rp. '
    result += (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return result
}