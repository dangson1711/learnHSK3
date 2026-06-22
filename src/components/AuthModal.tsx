import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  auth 
} from '../lib/firebase';
import { 
  X, 
  Mail, 
  Lock, 
  UserPlus, 
  LogIn, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (userEmail: string) => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu tối thiểu phải dài 6 ký tự.');
      setLoading(false);
      return;
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('Đăng ký tài khoản thành công! Dữ liệu đang được đồng bộ...');
        setTimeout(() => {
          onSuccess(email);
          onClose();
        }, 1500);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
        setTimeout(() => {
          onSuccess(email);
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      let localMsg = 'Đã xảy ra lỗi hệ thống, vui lòng thử lại.';
      if (err.code === 'auth/email-already-in-use') {
        localMsg = 'Email này đã được sử dụng ở tài khoản khác.';
      } else if (err.code === 'auth/invalid-email') {
        localMsg = 'Địa chỉ email không đúng định dạng.';
      } else if (err.code === 'auth/weak-password') {
        localMsg = 'Mật khẩu quá yếu (yêu cầu ít nhất 6 ký tự).';
      } else if (err.code === 'auth/operation-not-allowed') {
        localMsg = 'Tính năng đăng ký tài khoản qua Email hiện chưa được bật trên cấu hình Firebase Auth. Vui lòng bật "Email/Password" provider.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        localMsg = 'Email hoặc mật khẩu không chính xác.';
      } else if (err.code) {
        localMsg = `Gặp lỗi hệ thống (${err.code}): ${err.message || 'vui lòng thử lại.'}`;
      } else if (err.message) {
        localMsg = `Lỗi hệ thống: ${err.message}`;
      }
      setError(localMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-250 text-left overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4.5 right-4.5 p-2 hover:bg-slate-150 text-slate-400 hover:text-slate-600 rounded-full transition-all border border-slate-100 bg-slate-50 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Decorative Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 pt-7 text-white text-center space-y-1">
          <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl font-serif font-black shadow-inner">
            汉
          </div>
          <h3 className="text-xl font-bold tracking-tight">Hanzi Story</h3>
          <p className="text-xs text-blue-100">Lưu trữ lộ trình học bộ thủ và từ vựng HSK trực tuyến</p>
        </div>

        {/* Tabs switcher */}
        <div className="flex border-b border-slate-150">
          <button
            onClick={() => { setIsRegister(false); setError(null); }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 text-center uppercase tracking-wide cursor-pointer ${
              !isRegister 
                ? 'border-blue-600 text-blue-600 font-extrabold bg-blue-50/10' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(null); }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 text-center uppercase tracking-wide cursor-pointer ${
              isRegister 
                ? 'border-blue-600 text-blue-600 font-extrabold bg-blue-50/10' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl flex items-start gap-2.5 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-start gap-2.5 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Địa chỉ Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ten-ban@vi-du.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Mật khẩu</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isRegister ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Đồng ý sinh tạo tài khoản</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập hệ thống</span>
              </>
            )}
          </button>

          {/* Offline reminder */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors font-semibold"
            >
              Tiếp tục chế độ Offline (Máy chủ khách)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
