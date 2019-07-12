export default (arr) => {
    // 钱箱
    let hand = []
        // 是否还有顾客
    while (arr.length) {
        // 取出最前面顾客的钱
        let money = arr.shift()
        if (money === 5) {
            hand.push(money)
        } else {
            // 手里的零钱降序排列
            // 需要的找零
            let change = mone - 5
            for (let i = 0, len = hand.length; i < len; i++) {
                if (hand[i] <= change) {
                    change -= hand[i]
                    hand.splice(i, 1)
                        // 删除了元素，数组的长度发生了变化，要维持刚才的i不变
                    i--
                }
                if (change === 0) {
                    break
                }
            }
            // 没有足够的零钱给顾客
            if (change !== 0) {
                return false
            } else {
                // 顾客的钱收起来
                hand.push(money)
            }
        }
    }
    return true
}