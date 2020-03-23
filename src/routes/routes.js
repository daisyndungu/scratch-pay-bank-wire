import { Router } from 'express';

import {businessDaysWithDelay} from '../controllers/businessController'

const router = Router();

router.get('', (req, res) => {
    return res.status(200).send({ message: "Welcome To Bank Wire" });
});

// Business Dates Urls
const datesBaseUrl = '/businessDates';
router.post(`${datesBaseUrl}/getBusinessDateWithDelay`, businessDaysWithDelay);
router.get(`${datesBaseUrl}/getBusinessDateWithDelay?`, businessDaysWithDelay);

export default router;