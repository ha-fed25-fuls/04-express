/*
REST-API för en fruktaffär
Detta ska göras:
+ Typ för frukt-objekt
+ Datan - array i koden
+ skapa Router-objekt + export default
+ GET
+ POST
+ DELETE
+ PUT
*/
import express, { type Router } from 'express'
const router: Router = express.Router()


type Fruit = {
	id: number;
	name: string;
	price: number;
}

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

})


export default router
