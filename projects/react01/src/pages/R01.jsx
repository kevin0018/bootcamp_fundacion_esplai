import HelloWorld from '../components/r01/HelloWorld.jsx'
import Separator from '../components/r01/Separator.jsx'
import Square from '../components/r01/square.jsx'
import Ball from '../components/r01/Ball.jsx'
import Title from '../components/r01/Title.jsx'
import BallX from '../components/r01/BallX.jsx'
import SquareB from '../components/r01/squareB.jsx'
import '../App.css'
import Fly from '../components/r01/Fly.jsx'
import Capital from '../components/r01/Capital.jsx'
import Cat from '../components/r01/Cat.jsx'
import PhotoBall from '../components/r01/PhotoBall.jsx'
import BingoBall from '../components/r01/BingoBall.jsx'
import PhotoBallX from '../components/r01/PhotoBallX.jsx'
import PictureFrame from '../components/r01/PictureFrame.jsx'
import Buildings from "../components/r01/Buildings.jsx";
import buildings from '../data/edificis.json'

function R01() {

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
			<Fly color='blue' />
			<Capital word='Barcelona' />
			<Cat height='200' width='200' name='Garfield' />
			<PhotoBall src='http://loremflickr.com/200/200' radius='100' />
			<BingoBall num={8} />
			<PhotoBallX src='http://loremflickr.com/200/200' radius='100' />
			<PictureFrame
				src='http://loremflickr.com/200/300'
				width='200'
				height='300'
				padding='10'
				color='brown'
				background='beige'
			/>
			<Buildings buildings={buildings} />
		</>
	)
}

export default R01
