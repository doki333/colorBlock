import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface IPortal {
  children: ReactNode
}
const Portal = ({ children }: IPortal) => {
  const modalElement = document.querySelector('#modal-root') as HTMLDivElement
  return ReactDOM.createPortal(children, modalElement)
}

export default Portal
