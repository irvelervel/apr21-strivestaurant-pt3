import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNav'
import Home from './components/Home'
// import Layout from './components/Layout'

function App() {
  return (
    <div>
      {/* if the value of your prop is NOT a string, wrap it in curly brackets */}
      <MyNav title="StriveStaurant" />
      {/* 
      <Layout>
        <Home />
      </Layout>
      */}
      <Home />
    </div>
  )
}

export default App
