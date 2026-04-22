import connectToDatabase from '@config/db.js';
import app from './app.js';
import { NODE_ENV, PROT } from '@constants/env.js';

app.listen(PROT, async () => {
  console.log(`Server running on port ${PROT} in ${NODE_ENV} environment`);
  await connectToDatabase()
});
