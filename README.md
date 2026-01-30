# React Native 聯絡簿 App

這是一個使用 React Native (Expo) 和 SQLite 建立的聯絡簿應用程式。

**GitHub Repository**: [https://github.com/laiwanyu312317516/ContactBookApp](https://github.com/laiwanyu312317516/ContactBookApp)

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

## 產生 APK (GitHub Actions)

本專案已設定 GitHub Actions 自動建置 APK。每當您推送程式碼到 GitHub 時，系統會自動開始建置。

**如何下載 APK**:

1.  開啟 GitHub Repository 頁面：[https://github.com/laiwanyu312317516/ContactBookApp](https://github.com/laiwanyu312317516/ContactBookApp)
2.  點擊上方的 **Actions** 標籤。
3.  點擊最新的 **Build Android APK** 工作流程執行紀錄。
4.  在頁面底部的 **Artifacts** 區域，點擊 `app-debug` 即可下載 APK 壓縮檔。
5.  解壓縮後即可取得 `app-debug.apk` 並安裝到手機。

注意：此 APK 為 Debug 版本，安裝時可能會跳出安全警告，這是正常的。

