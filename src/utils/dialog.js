import swal from 'sweetalert2'

export class Dialog {
  async confirm({ title = 'are you sure?', text, yes = 'Yes' }, callback) {
    swal.fire({
      title: title,
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: yes,
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      reverseButtons: true,
    }).then((result) => {
      callback(result)
    })
  }

  async success({ title, text }) {
    swal.fire({
      type: 'success',
      title,
      text,
      showConfirmButton: false,
      timer: 2200,
    })
  }

  async error({ title, text }) {
    swal.fire({
      type: 'error',
      title,
      text,
    })
  }

  async warning({ title, text }) {
    swal.fire({
      type: 'warning',
      title,
      text,
      timer: 2200,
    })
  }

  async info({ title, text }) {
    swal.fire({
      title,
      text,
      timer: 2200,
    })
  }

  display(res, title) {
    if (res.err === undefined) this.success({ title: `${title} completed` })
    else {
      this.error({
        title: `${title} incompleted`,
        text: res.message,
      })
    }
  }

  displayErr(res, title = 'Loading has problem') {
    if (res.err === undefined) {
      this.error({ title, text: res.message })
    }
  }
}

export const dialog = new Dialog()
export default dialog