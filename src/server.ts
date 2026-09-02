// ---- Imports ---- //
import express, { type Express, type Request, type RequestHandler, type Response } from 'express'
import carsRouter from './routes/cars.ts'

// ---- Inställningar ---- //
// app är ett objekt som representerar vår server
const app: Express = express()
const port: number = 3001


// ---- Middleware ---- //
const logger: RequestHandler = (req, res, next) => {
	// Om vi behöver någon information om requestet, kolla i "req"
	// Om vi ska skicka svar till klienten, använd "res"
	// Passa vidare till app.get med next()

	// Tips! Lägg till vilken tid requestet kom
	console.log(`${req.method}  ${req.path}`)
	next()  // om vi glömmer next, får vi "timeout" fel
}
app.use(logger)


// ---- Endpoints ---- //

// Om det kommer ett GET request körs följande funktion
app.get('/', (req: Request, res: Response): void => {
	// req innehåller all information om requestet (t.ex. querystring)
	// res används för att skicka ett svar till klienten
    res.status(200).send('Hello from server!')
})

let count: number = 0
app.get('/counter', (req: Request, res: Response): void => {
	count++
	res.status(200).send({ value: count })
})
app.post('/counter', (req: Request, res: Response): void => {
	count = 0
	res.sendStatus(200)  // skickar statuskoden till klienten
	// res.status(200)  // sätter statuskoden, men skickar inget
})

// Tala om vilka URL-parametrar som requestet behöver
type GreetingParams = {
	name: string;
}
// Response body, talar om hur svaret som endpointen skickar ska se ut
type GreetingResponse = {
	salutation: string;
}
app.get<GreetingParams, GreetingResponse>('/greeting/:name', (req, res): void => {
	const name = req.params.name  // name är en URL-parameter
	res.send({ salutation: `Hej, ${name}!` })
})


app.use('/cars', carsRouter)



// ---- Starta server ---- //
// lyssna efter inkommande request
app.listen(port, (): void => {
    console.log(`Server is listening on port ${port}. Stop it with Ctrl+C.`)
})
