import '@/index.css'
import { StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
)

let innerCursor = document.querySelector('.inner-cursor')
let outerCursor = document.querySelector('.outer-cursor')
document.addEventListener('mousemove', moveCursor)
function moveCursor(e)
{
    let x = e.clientX
    let y = e.clientY

    innerCursor.style.left = `${x}px`
    innerCursor.style.top = `${y}px`
    outerCursor.style.left = `${x}px`
    outerCursor.style.top = `${y}px`
}