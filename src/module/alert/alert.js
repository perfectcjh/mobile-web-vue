import { Dialog } from 'vant'

const show = ({ title, message, isConfirm, onConfirm, onCancel }) => {
  if (isConfirm) {
    Dialog.confirm({
      width: 300,
      confirmButtonColor: '#00ADC7',
      title: title || '提示',
      message: message
    }).then(() => {
      if (!onConfirm) { return }
      onConfirm()
    }).catch(() => {
      if (!onCancel) { return }
      onCancel()
    })
  } else {
    Dialog.alert({
      width: 300,
      confirmButtonColor: '#00ADC7',
      title: title || '提示',
      message: message
    }).then(() => {
      if (!onCancel) { return }
      onCancel()
    }).catch(() => {
      if (!onCancel) { return }
      onCancel()
    })
  }
}

export default {
  show
}
