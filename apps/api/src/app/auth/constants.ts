import * as dotenv from 'dotenv';
dotenv.config();
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
export const googleConstants = {
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
};
