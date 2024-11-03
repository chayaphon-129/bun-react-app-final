# ใช้ Node.js เป็นเบสอิมเมจ
FROM node:16 as build

# ตั้งค่าตำแหน่งที่ทำงาน
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดไปยัง container
COPY . .

# สร้างแอป
RUN npm run build

# ใช้ Nginx สำหรับ serving แอป
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# เปิดพอร์ต 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
