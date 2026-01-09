import connectToDatabase from '@config/db.js';
import app from './app.js';
import { PROT } from '@constants/env.js';

app.listen(PROT, async () => {
  console.log(`Server running on port ${PROT}`);
  await connectToDatabase()
});
