import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTFkOTZlMTczNjhjYjc3YmM5NzBlMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MjYzMTc2MiwiZXhwIjoxNjYyODkwOTYyfQ.LXy0qhPMzUt9_7iFf2nxPmXkNFTBHMX07t9_jlY1pTs";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
