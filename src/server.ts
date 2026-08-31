// ---- Imports ---- //
import express, { type Express, type Request, type RequestHandler, type Response } from 'express'

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
app.get('/counter', (req: Request, res: Response): void => {
	let count = 1
	// Övning: se till att count ökas varje gång man skickar request till /counter
	res.status(200).send({ value: count })
})


// ---- Starta server ---- //
// lyssna efter inkommande request
app.listen(port, (): void => {
    console.log(`Server is listening on port ${port}. Stop it with Ctrl+C.`)
})
