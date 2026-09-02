/*
REST-API för en fruktaffär
Detta ska göras:
+ Typ för frukt-objekt
+ Datan - array i koden
+ skapa Router-objekt + export default
+ GET
+ POST (även validering)
+ DELETE
+ PUT
*/
import express, { type Router } from 'express'
import * as z from 'zod'
const router: Router = express.Router()


const FruitSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number()
})
type Fruit = z.infer<typeof FruitSchema>
// type Fruit = {
// 	id: number;
// 	name: string;
// 	price: number;
// }

const fruits: Fruit[] = [
    { id: 1, name: "Äpple", price: 15 },
    { id: 2, name: "Banan", price: 10 },
    { id: 3, name: "Apelsin", price: 20 },
    { id: 4, name: "Vindruvor", price: 35 },
    { id: 5, name: "Ananas", price: 45 }
]


// Generiska parametrar: router.get<Params, ResBody, ReqBody, ReqQuery>

//  GET /fruits  -> svara med listan på alla frukter
router.get<{}, Fruit[]>('/', (req, res) => {
	// Användningsområde för querystring - om vi vill kunna svara med fruktlistan sorterad i en viss ordning
	res.status(200).send(fruits)
})

//  GET /fruits/:id  -> svara med specifik frukt - OM DEN FINNS!!
type IdParam = { id: string }
router.get<IdParam, Fruit | void>('/:id', (req, res) => {
	const idString: string = req.params.id
	const id: number = Number(idString)
	// Vad kan hända?
	// 1. id är korrekt, men det finns inget objekt i listan som matchar -> 404 not found
	// 2. id är inte korrekt (går inte att konvertera till ett number) -> 400 bad request
	// 3. id är korrekt och vi hittar ett objekt -> 200

	if( isNaN(id) ) {
		res.sendStatus(400)
		return
	}
	const maybeFruit: Fruit | undefined = fruits.find(f => f.id === id)
	if( maybeFruit === undefined ) {
		res.sendStatus(404)
	} else {
		res.status(200).send(maybeFruit)
	}
})


router.post<{}, void, Fruit>('/', (req, res) => {
	// KOM IHÅG att lägga till express.json() i server.ts
	// Express har inte inbyggt stöd för body, vi måste lägga till det
	try {
		// Se upp - parse kan misslyckas!
		// Om vi inte fångar Error blir det statuskod 500
		const fruit = z.parse(FruitSchema, req.body)
		// här är fruit okej, vi fortsätter...
		fruits.push(fruit)
		res.sendStatus(201)  // 201 Created

	} catch(error) {
		// Det gick inte, dvs status 400 Bad request
		// Vill man vara snäll mot frontend kan man skicka tillbaka ett beskrivande felmeddelande
		res.sendStatus(400)
	}
})


// Detta återstår för att det ska bli ett komplett REST-API:
// DELETE /fruits/:id  - validera id, se GET /fruits/:id
// PUT /fruits/:id - validera både id och request body. Möjliga statuskoder: 200, 400, 404

// Kom ihåg att du kan använda console.log inuti endpoints:
// console.log('METOD /url', req.params, req.body)

export default router
