import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import 'sweetalert2/dist/sweetalert2.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
