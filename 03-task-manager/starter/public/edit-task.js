const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, isCompleted, task } = tasks
    console.log("🚀 ~ file: edit-task.js:17 ~ showTask ~ tasks:", tasks)

    taskIDDOM.textContent = taskID
    taskNameDOM.value = task
    tempName = task
    if (isCompleted) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { tasks },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      task: taskName,
      isCompleted: taskCompleted,
    })

    const { _id: taskID, isCompleted, task } = tasks

    taskIDDOM.textContent = taskID
    taskNameDOM.value = task
    tempName = task
    if (isCompleted) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
