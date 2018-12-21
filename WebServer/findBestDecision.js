function findBestDecision(stockValues) {
    let maxRevenueDecision = { operation: 'Do Nothing', revenue: 0 };
    for (let buyingDay = 1; buyingDay <= stockValues.length; ++buyingDay) {
        for (let sellingDay = buyingDay + 1; sellingDay <= stockValues.length; ++sellingDay) {
            let revenue = stockValues[sellingDay - 1] - stockValues[buyingDay - 1];
            if (revenue > maxRevenueDecision.revenue) {
                maxRevenueDecision = { operation: 'Buy And Sell', buyingDay: buyingDay, sellingDay: sellingDay, revenue: revenue };
            }
        }
    }
    return maxRevenueDecision;
}
exports.findBestDecision = findBestDecision;
