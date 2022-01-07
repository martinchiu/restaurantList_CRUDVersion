# 我的餐廳清單
一個使用 Node.js + Express 打造的餐廳美食網站，可以瀏覽餐廳、依據不同搜尋功能進行搜尋、查看詳細資訊、甚至連結到地圖。

## 畫面呈現
### 首頁
![首頁](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/plusRoutes/public/image/３－首頁.png)
### 登入頁
![登入頁](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/plusRoutes/public/image/登入頁.png)
### 註冊頁
![註冊頁](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/plusRoutes/public/image/註冊頁.png)
### 刪除前確認
![刪除前確認](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/main/public/image/2-3.a5刪除前確認.png)
### 瀏覽特定資訊
![瀏覽特定資訊](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/main/public/image/2-3.a5瀏覽特定資訊.png)
### 新增餐廳
![新增餐廳](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/main/public/image/2-3.a5新增餐廳.png)
### 修改餐廳
![修改餐廳](https://github.com/martinchiu/restaurantList_CRUDVersion/blob/main/public/image/2-3.a5修改餐廳.png)

## 功能
# 登入前
- 使用者可以用信箱註冊
- 使用者可以用臉書帳號登入
- 使用者可以用google帳號登入
# 登入後
- 使用者可以在首頁看到所有餐廳與它們的簡單資料，包含照片、店名、分類、評分
- 使用者可以點擊照片瀏覽更多資訊
- 使用者可以透過地址連結至google map
- 使用者可以用店名進行搜尋
- 使用者可以用餐廳類別進行搜，如果搜尋找不到結果會跳出提醒畫面
- 使用者可以新增餐廳
- 使用者可以修改餐廳資料
- 使用者可以刪除餐廳

## 使用說明
1. 請先確認有安裝 node.js 與 npm
2. 打開終端機 (Terminal)，並複製 (Clone) 此專案至本機電腦
```
git clone https://github.com/martinchiu/restaurantList_CRUDVersion.git --branch plusRoutes
```
3. 進入專案資料夾
```
cd restaurant-list
```
4. 安裝所需套件
```
npm install
```
5. 啟動MongoDB 伺服器及創建資料庫並命名「restaurantList」
6. 產生一組種子資料給資料庫
```
npm run seed
```
6.1 種子資料：
{email: user1@example.com, password: 12345678} 
{email: user2@example.com, password: 12345678}
7. 快速啟動（如果要進入開發者模式，請輸入：npm run dev，請先確保有安裝nodemon)
```
npm run start
``` 
8. 在瀏覽器網址列輸入 `http://localhost:3000/` 瀏覽網站
9. 若欲暫停使用
```
ctrl + c ( mac : command + .)
```

## 開發工具
- Node.js 14.16.0
- Express 4.17.1
- Express-Handlebars 6.0.1
- Bootstrap 4.3.1
- Font-awesome 5.15.4
- mongoose 6.0.14
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 10.0.0
- passport: 0.5.2
- passport-facebook: 3.0.0
- passport-google-oauth20: 2.0.0
- passport-local: 1.0.0
