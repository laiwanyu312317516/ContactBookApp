# React Native 聯絡簿 App

這是一個使用 React Native (Expo) 和 SQLite 建立的聯絡簿應用程式。

## 功能

- 新增聯絡人 (姓名, 電話)
- 顯示聯絡人列表
- 編輯聯絡人資料
- 刪除聯絡人
- 資料本地儲存 (SQLite)

## 安裝與執行

1.  確保已安裝 Node.js (LTS 版本)。
2.  安裝相依套件：
    ```bash
    npm install
    ```
3.  啟動開發伺服器：
    ```bash
    npm start
    ```
    然後按下 `a` 在 Android 模擬器執行，或使用 Expo Go App 掃描 QR Code 在實機執行。

## 產生 APK (Android 安裝檔)

要產生 APK，您需要安裝 `eas-cli` 並登入 Expo 帳號。

1.  安裝 EAS CLI：
    ```bash
    npm install -g eas-cli
    ```

2.  登入 Expo 帳號 (若無帳號請先去 expo.dev 註冊)：
    ```bash
    eas login
    ```

3.  設定專案 (首次執行時)：
    ```bash
    eas build:configure
    ```

4.  建立 APK (用於測試安裝)：
    修改 `eas.json`，新增 `preview` 設定：
    ```json
    {
      "build": {
        "preview": {
          "android": {
            "buildType": "apk"
          }
        },
        "production": {}
      }
    }
    ```
    
    然後執行：
    ```bash
    eas build -p android --profile preview
    ```
    
    等待建置完成後，會產生下載連結。

5.  建立 AAB (用於上架 Play Store)：
    ```bash
    eas build -p android
    ```
