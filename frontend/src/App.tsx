import Header from "./components/Header"
import Body from "./components/Body"
import { Route, Routes } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

const App = () => {
  return (
    <>
      <Header />
      <Routes>
         <Route path="/" element={<Body />} />
         <Route path="/login" element={<LoginForm />} />
         <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App
