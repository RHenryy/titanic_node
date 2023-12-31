import { Router } from "express";

import * as passengers from "../controllers/passengers.js";

const apiRouter = Router();

apiRouter.get("/passengers", passengers.getAll);
apiRouter.get("/passengers/search", passengers.search);

export default apiRouter;
