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

/*
3a Lägg till en endpoint GET "/cars" som svarar med en lista med namn på bilmodeller. Listan ska vara tom från början.
3b Lägg till en endpoint POST "/cars/:model" som lägger till en bilmodell till listan, med hjälp av en URL-parameter. Exempel:
GET /cars → "[]"
POST /cars/volvo
POST /cars/ferrarri
GET /cars → "['volvo', 'ferrarri']"

3c Lägg till en endpoint DELETE "/cars" som rensar listan igen.
*/
type CarModel = string
const carModels: CarModel[] = []
// app.get<Params, ResBody, ReqBody, ReqQuery>
app.get<{}, CarModel[]>('/cars', (req, res) => {
	res.status(200).send(carModels)
	// status(200) är default, man kan utelämna den
})

type ModelParam = {
	model: string;
}
app.post<ModelParam, void>('/cars/:model', (req, res) => {
	const model: string = req.params.model
	carModels.push(model)
	res.sendStatus(201)  // 201==Created
})

app.delete<{}, void>('/cars', (req, res) => {
	// carModels = []     // mer intuitivt
	carModels.length = 0  // helt galet men det är tillåtet i JavaScript
	res.sendStatus(204)  // 204==No content
})



// ---- Starta server ---- //
// lyssna efter inkommande request
app.listen(port, (): void => {
    console.log(`Server is listening on port ${port}. Stop it with Ctrl+C.`)
})
