COMFORT Série 300 — النشر والتحديث ونظام Extensions

أولاً: نشر التطبيق
1) أنشئ مستودعاً عاماً في GitHub وارفع جميع محتويات مجلد site إلى جذر المستودع.
2) في GitHub افتح Settings ثم Pages.
3) اختر Deploy from a branch، ثم main و / (root)، ثم Save.
4) افتح رابط github.io الناتج. التطبيق يعمل دون إنترنت بعد أول زيارة ناجحة وتحميل الملفات.
5) عند تحديث ملفات التطبيق، ارفع النسخة الجديدة. تم رفع رقم ذاكرة Service Worker في sw.js لهذه النسخة.

ثانياً: Extensions
- من Menu > Extensions يمكنك استيراد إضافة ZIP، فتح الإضافات المثبتة أو تعطيلها أو حذفها.
- الإضافات تحفظ في IndexedDB على الجهاز وتعمل دون إنترنت بعد تثبيتها.
- المتجر يقرأ site/extensions/registry.json ويمكن تغيير الرابط من داخل مدير الإضافات.
- عند الاتصال بالإنترنت وفتح مدير الإضافات يتم فحص المتجر. يمكن التثبيت أو التحديث يدوياً.
- التحديث التلقائي للإضافات المثبتة يعمل عندما يختلف الإصدار ويحتوي عنصر المتجر على قيمة sha256 صحيحة. دون sha256 يبقى التحديث يدوياً.
- يوجد نموذج ZIP تجريبي في extensions/hello-extension.zip.
- طريقة بناء ZIP وصيغة registry.json موضحة في extensions/README_AR.txt.

بنية ZIP المطلوبة: manifest.json وملف entry (افتراضياً index.html) في جذر ZIP مباشرة.
مثال manifest:
{"id":"com.example.addon","name":"اسم الإضافة","version":"1.0.0","description":"وصف","entry":"index.html"}

الأمان: الإضافة تعمل داخل iframe معزول، ولا يُسمح لها بالوصول إلى localStorage أو IndexedDB الخاص بالتطبيق أو الاتصال بالشبكة من داخل مساحة الإضافة. استورد ملفات من مصادر موثوقة فقط.

ثالثاً: تطبيق Android
- افتح مجلد android في Android Studio.
- في android/app/src/main/java/com/comfort/serie300/MainActivity.java استبدل APP_URL برابط GitHub Pages الحقيقي، مع / في النهاية.
- File > Sync Project with Gradle Files ثم Build > Build APK(s).
- دعم اختيار ملفات ZIP مضاف إلى WebView.

مهم:
- يجب تشغيل الموقع عبر HTTPS لكي يعمل Service Worker وميزة Offline.
- ملفات الإضافات يتم تحديثها مستقلاً عن APK.
- تحديث محتوى GitHub Pages لا يحدّث APK نفسه؛ تحديث APK يحتاج إعادة بناء وتوزيعه وتأكيد تثبيته من Android.
- بيانات التطبيق والإضافات محلية على كل جهاز ولا تتم مزامنتها تلقائياً بين الأجهزة.
