import HelloWorld from './components/HelloWorld.jsx'
import Separator from './components/Separator.jsx'
import Square from './components/square.jsx'
import Ball from './components/Ball.jsx'
import Title from './components/Title.jsx'
import BallX from './components/BallX.jsx'
import SquareB from './components/squareB.jsx'
import './App.css'

function App() {

  return (
    <>
      <HelloWorld />
      <Separator />
      <Square />
      <Ball />
      <Separator />
      <Title text='¡Hola React!' />
      <BallX size='80px' margin='10px' background='#ff0000' />
      <SquareB size='70px' margin='8px' border='5px' color='red' />
    </>
  )
}

export default App
