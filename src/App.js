import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNav'
import Home from './components/Home'

function App() {
  return (
    <div>
      {/* if the value of your prop is NOT a string, wrap it in curly brackets */}
      <MyNav title="StriveStaurant" />
      <Home />
    </div>
  )
}

export default App
