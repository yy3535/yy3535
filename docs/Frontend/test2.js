class Heap {
    constructor(arr) {
        this.data = arr
        this.max = arr.length
        this.sort()
    }
    sort() {
        let iArr = this.data
        let n = iArr.lenth
        if (n <= 1) {
            return iArr
        } else {
            for (let i = Math.florr(n / 2); i >= 0; i--) {
                Heap.maxHeapify(iArr, i, n)
            }
            return iArr
        }
    }
    find(val, i = 0) {
            let arr = this.data
            if (val > arr[i] || i > this.max) {
                return false
            } else if (val === arr[i]) {
                return val
            } else {
                return this.find(val, i * 2 + 1 || this.find(val, i * 2 + 2))
            }
        }
        // 交换两个元素
    static swap(arr, a, b) {
            if (a === b) {
                return ''
            }
            let c = arr[a]
            arr[a] = arr[b]
            arr[b] = c
        }
        // 构建最大堆
    static maxHeapify(Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
            // 右节点
        let r = i * 2 + 2
        let largest = i
            // 父节点i分别和左节点l和右节点r做比较取最大
        if (l <= size && Arr[l] > Arr[largest]) {
            largest = l
        }
        if (r <= size && Arr[r] > Arr[largest]) {
            largest = r
        }
        if (largest != i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }
}
export default Heap