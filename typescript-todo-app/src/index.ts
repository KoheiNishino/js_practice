// 追加ボタンの処理
const onClickAdd = () => {
  const addText: HTMLInputElement = document.getElementById("add-text") as HTMLInputElement
  if (!addText.value || !addText.value.match(/\S/g)) {
    alert("Todoを入力してください。")
    return
  }

  createUnfinishedTodos(addText.value)
  addText.value = ""
}

const createUnfinishedTodos = (text: string) => {
  const unfinishedTodos: HTMLElement | null = document.getElementById("unfinished-todos")
  if (unfinishedTodos === null) return

  const maximumNumberOfTodos = 5
  if (unfinishedTodos.childElementCount >= maximumNumberOfTodos) {
    alert(`登録できるTodoは${maximumNumberOfTodos}個までです。未完了のTodoを減らしてください。`)
    return
  }

  // divタグ生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // buttonタグ生成
  const completeButton: HTMLButtonElement = createCompleteButton()
  const deleteButton: HTMLButtonElement = createDeleteButton()

  // divタグの子要素に各要素を設定
  div.appendChild(li)
  div.appendChild(completeButton)
  div.appendChild(deleteButton)

  // 完了リストに追加
  unfinishedTodos.appendChild(div);
}

// 完了ボタンの設定
const createCompleteButton = (): HTMLButtonElement => {
  const completeButton = document.createElement("button")
  completeButton.innerText = "完了"
  completeButton.addEventListener("click", () => {
    if (completeButton.parentNode === null) return
    addToFinishedTodos(completeButton.parentNode)
  })
  return completeButton
}

// 完了ボタンの処理
const addToFinishedTodos = (target: (Node & ParentNode)) => {
  // 押された完了ボタンの親タグ(div)を未完了リストから削除
  deleteFromUnfinishiedTodos(target)

  // TODO内容テキストを取得
  const todoFirstElementChild: HTMLElement = target.firstElementChild as HTMLElement

  // div以下を初期化
  target.textContent = null

  // liタグ生成
  const li = document.createElement("li")
  li.innerText = todoFirstElementChild.innerText

  // buttonタグ生成
  const backButton: HTMLButtonElement = createBackButton()

  // divタグの子要素に各要素を設定
  target.appendChild(li)
  target.appendChild(backButton)

  // 完了リストに追加
  const finishedTodos: HTMLElement | null = document.getElementById("finished-todos")
  if (finishedTodos !== null) {
    finishedTodos.appendChild(target)
  }
}

// 戻すボタンの設定
const createBackButton = (): HTMLButtonElement => {
  const backButton = document.createElement("button")
  backButton.innerText = "戻す"

  backButton.addEventListener("click", () => {
    if (backButton.parentNode !== null) {
      backToUnfinishedTodos(backButton.parentNode)
    }
  })
  return backButton
}

// 戻すボタンの処理
const backToUnfinishedTodos = (target: (Node & ParentNode)) => {
  // 押された戻すボタンの親タグ(div)を完了リストから削除
  const finishedTodos: HTMLElement | null = document.getElementById("finished-todos")
  if (finishedTodos !== null) {
    finishedTodos.removeChild(target)
  }

  // 未完了リストに追加
  const todoFirstElementChild: HTMLElement = target.firstElementChild as HTMLElement
  createUnfinishedTodos(todoFirstElementChild.innerText);
}

// 削除ボタンの設定
const createDeleteButton = (): HTMLButtonElement => {
  const deleteButton = document.createElement("button")
  deleteButton.innerText = "削除"
  deleteButton.addEventListener("click", () => {
     // 押された削除ボタンの親タグ(div)を未完了リストから削除
    if (deleteButton.parentNode !== null) {
      deleteFromUnfinishiedTodos(deleteButton.parentNode)
    }
  })
  return deleteButton
}

// 削除ボタンの処理
const deleteFromUnfinishiedTodos = (target: (Node & ParentNode)) => {
  const unfinishedTodos: HTMLElement | null = document.getElementById("unfinished-todos")
  if (unfinishedTodos !== null) {
    unfinishedTodos.removeChild(target)
  }
}

// 追加ボタンに処理を追加
const addButton: HTMLElement | null = document.getElementById("add-button")
if (addButton !== null) {
  addButton.addEventListener("click", () => {onClickAdd()})
}
