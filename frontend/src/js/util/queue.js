// 노드 클래스 정의
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// 큐 클래스 정의
class Queue {
  constructor() {
    this.front = null // 큐의 맨 앞을 가리키는 포인터
    this.rear = null // 큐의 맨 뒤를 가리키는 포인터
    this.size = 0 // 큐의 크기
  }

  // 큐에 요소를 추가하는 메서드
  enqueue(data) {
    const newNode = new Node(data)
    if (this.isEmpty()) {
      this.front = newNode
      this.rear = newNode
    } else {
      this.rear.next = newNode
      this.rear = newNode
    }
    this.size++
  }

  // 큐에서 요소를 제거하고 반환하는 메서드
  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    const removedNode = this.front
    if (this.front === this.rear) {
      this.front = null
      this.rear = null
    } else {
      this.front = this.front.next
    }
    this.size--
    return removedNode.data
  }

  // 큐의 맨 앞에 있는 요소를 반환하는 메서드
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.front.data
  }

  // 큐가 비어있는지 확인하는 메서드
  isEmpty() {
    return this.size === 0
  }

  // 큐의 크기를 반환하는 메서드
  getSize() {
    return this.size
  }

  // 큐의 내용을 문자열로 반환하는 메서드
  toString() {
    let result = ''
    let current = this.front
    while (current !== null) {
      result += current.data + ' '
      current = current.next
    }
    return result.trim()
  }
}

export { Queue }
