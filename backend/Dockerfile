# ใช้ Node.js เป็น base image
FROM node:16

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจกต์ทั้งหมดไปยัง container
COPY . .

# คอมไพล์แอป (ถ้าจำเป็น) หรือสามารถใช้คำสั่งอื่นๆ ตามต้องการ
# RUN npm run build

# ตั้งค่า environment variables
ENV DB_HOST=db
ENV DB_PORT=5433
ENV DB_USER=postgres
ENV DB_PASSWORD=MY@ym2562
ENV DB_NAME=bitcoin_prices

# เปิดพอร์ตสำหรับแอป
EXPOSE 5001

# รันแอป
CMD ["npm", "start"]
