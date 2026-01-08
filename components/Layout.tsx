
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 py-6 px-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🕌</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 font-amiri leading-none">مصمم البطاقات</h1>
              <p className="text-slate-400 text-xs mt-1">بساطة التصميم.. روعة الكلمة</p>
            </div>
          </div>
          <div className="hidden md:flex gap-4 text-sm font-medium text-slate-500">
            <span className="hover:text-amber-600 cursor-pointer transition-colors">الرئيسية</span>
            <span className="hover:text-amber-600 cursor-pointer transition-colors">عن التطبيق</span>
            <span className="hover:text-amber-600 cursor-pointer transition-colors">المساعدة</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container max-w-6xl mx-auto px-4 py-10">
        {children}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-10 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-slate-500 text-sm font-medium">تم التطوير لنشر الكلمة الطيبة والجمال في التصميم</p>
          <p className="text-slate-400 text-xs mt-2">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
