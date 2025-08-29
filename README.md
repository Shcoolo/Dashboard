# React Admin Dashboard
    School Management System (short description)

## Project Setup Guide

    هذا الدليل يشرح كيفية تجهيز البيئة وتشغيل المشروع محلياً خطوة بخطوة.
    ---

    ## ✅ المتطلبات الأساسية

    قبل تشغيل المشروع، تأكد من تنصيب البرامج التالية على جهازك:

    1. **Node.js**  
    - حمّل النسخة المناسبة لنظامك من الموقع الرسمي: [Node.js](https://nodejs.org/)  
    - للتحقق من تنصيبه بنجاح، افتح الطرفية (Terminal) واكتب:  
        ```bash
        node -v
        ```
        سيظهر رقم الإصدار مثل: `v18.x.x`

    2. **npm (مدير الحزم الخاص بـ Node.js)**  
    - يتم تثبيت npm تلقائياً مع Node.js.  
    - للتحقق من تنصيبه:  
        ```bash
        npm -v
        ```
        سيظهر رقم الإصدار مثل: `9.x.x`

    ---

    ## 📦 إعداد المشروع

    1. **نسخ المشروع من GitHub**
    ```bash
    git clone https://github.com/Shcoolo/Dashboard.git
    ````

    2. **الدخول إلى مجلد المشروع**

    ```bash
    cd repo-name
    ```

    3. **تنصيب الحزم اللازمة**

    ```bash
    npm install
    ```

    ---

    ## 🚀 تشغيل المشروع

    لتشغيل المشروع في وضع التطوير:

    ```bash
    npm start
    ```

    * بعد التشغيل سيتم فتح المتصفح تلقائياً على العنوان:
    **[http://localhost:3000/](http://localhost:3000/)**
    * أي تعديل تحفظه على الملفات سيُعاد تحميله مباشرة في المتصفح (**Hot Reloading**).

    ---

    ## ⚡ حل المشاكل الشائعة

    * **مشكلة في الحزم (Modules) أو ظهور أخطاء بعد التثبيت:**
    احذف مجلد `node_modules` وملف `package-lock.json` ثم أعد تثبيت الحزم:

    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

    * **في حال لم يعمل الأمر `npm start`:**
    تأكد أنك داخل مجلد المشروع نفسه الذي يحتوي على ملف `package.json`.

    ---

    🎉 مبروك! أنت الآن جاهز للعمل على مشروع React وتشغيله محلياً.

    ```

## Core Features

    Authentication
        Login           ✅
        Logout          ✅ 
        Profile    Show ✅ Edit
        Forget Password ✅
        Confirm Account ✅

    Academic 
        Years    ✅ => Calendar
        Terms    ✅ =>
        Classes  ✅ => Subject 
        Sections /api => Table (Now) [ show, حصص , table schedule ]

    Management 
        Adminstrators /api ( admin, manager)
        Teachers /api
        Students  index✅ store✅, show, edit, delete /api => Report ( subject , examps ,  attendce ,...)

    General 
        School Information /api
    
    Sehedules 
        Teacher // Calendar like for the manager
        Sections for Student ()
        Calender

    Admin
        Examps // Create => subject
        Degrees // Entry => Student in a Section
        Absence // Entry => Student in a Section
        Subjects // => Term
        
## Extra Features 

    Localization 
        En ✅
        Ar 

    Activities  // non

    Alectronic library  // Upload file for evrey subject

    Commencations  Select one Student , or All Student , Select All Teacher, or Teacher

    Shows  // analiysis

    Reports  // attendce, degrees


    Done by Schoolo Team