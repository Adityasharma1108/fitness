FROM node:20-alpine

# Working directory set karein
WORKDIR /app

# Root folder ka package.json copy aur install karein (agar hai)
COPY package*.json ./
RUN npm install

# Backend dependencies install karein
COPY backend/package*.json backend/
RUN cd backend && npm install

# Frontend (reactapp) dependencies install karein
COPY reactapp/package*.json reactapp/
RUN cd reactapp && npm install

# Pura code copy karein (backend aur reactapp folders)
COPY . .

# Ports expose karein (Frontend 3000, Backend 5000)
EXPOSE 3000 5000

# App start karne ka command (Agar aapne root package.json me dono ko ek sath chalane ka script likha hai)
CMD ["npm", "start"]