import express, { type Router } from 'express'
const router: Router = express.Router()



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
// router.get<Params, ResBody, ReqBody, ReqQuery>
// Serverfilen har /cars och vi ska inte upprepa det, då hade det blivit /cars/cars
router.get<{}, CarModel[]>('/', (req, res) => {
	res.status(200).send(carModels)
	// status(200) är default, man kan utelämna den
})


type ModelParam = {
	model: string;
}
router.post<ModelParam, void>('/:model', (req, res) => {
	const model: string = req.params.model
	carModels.push(model)
	res.sendStatus(201)  // 201==Created
})


router.delete<{}, void>('/', (req, res) => {
	// carModels = []     // mer intuitivt
	carModels.length = 0  // helt galet men det är tillåtet i JavaScript
	res.sendStatus(204)  // 204==No content
})

export default router
