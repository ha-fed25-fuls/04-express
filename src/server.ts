// ---- Imports ---- //
import express, { type Express, type Request, type Response } from 'express'

// ---- Inställningar ---- //
// app är ett objekt som representerar vår server
const app: Express = express()
const port: number = 3001


// ---- Endpoints ---- //

// Om det kommer ett GET request körs följande funktion
app.get('/', (req: Request, res: Response): void => {
	// req innehåller all information om requestet (t.ex. querystring)
	// res används för att skicka ett svar till klienten
    res.status(200).send('Hello from server!')
})


// ---- Starta server ---- //
// lyssna efter inkommande request
app.listen(port, (): void => {
    console.log(`Server is listening on port ${port}. Stop it with Ctrl+C.`)
})
