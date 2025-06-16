import HelloWorld from '../components/HelloWorld.jsx'
import Separator from '../components/Separator.jsx'
import Square from '../components/square.jsx'
import Ball from '../components/Ball.jsx'
import Title from '../components/Title.jsx'
import BallX from '../components/BallX.jsx'
import SquareB from '../components/squareB.jsx'
import '../App.css'
import Fly from '../components/Fly.jsx'
import Capital from '../components/Capital.jsx'
import Cat from '../components/Cat.jsx'
import PhotoBall from '../components/PhotoBall.jsx'
import BingoBall from '../components/BingoBall.jsx'
import PhotoBallX from '../components/PhotoBallX.jsx'
import PictureFrame from '../components/PictureFrame.jsx'
import Buildings from "../components/Buildings.jsx";
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
