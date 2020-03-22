import { Router } from 'express';

const router = Router();

router.get('', (req, res) => {
    return res.status(200).send({ message: "Welcome To Bank Wire" });
});

// Business Dates Urls
const datesBaseUrl = '/businessDates';
router.post(`${datesBaseUrl}/getBusinessDateWithDelay`);
router.get(`${datesBaseUrl}/getBusinessDateWithDelay?`);

export default router;