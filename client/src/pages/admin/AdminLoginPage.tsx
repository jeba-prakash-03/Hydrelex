import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Please provide your admin email or username and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await login(identifier.trim(), password.trim());
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-arch-black flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo variant="light" />
          </div>
          <div className="pt-2">
            <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
              MANAGEMENT ACCESS PORTAL
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-white mt-1">
              Operations Control
            </h2>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-sm bg-arch-graphite/90 border border-arch-steel/60 backdrop-blur-xl shadow-architectural-dark space-y-6">
          {error && (
            <div className="p-3.5 rounded-sm bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Admin Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@hydrelex.com"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-sm bg-arch-charcoal border border-arch-steel text-white text-xs font-mono focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <Mail className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Administrative Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 rounded-sm bg-arch-charcoal border border-arch-steel text-white text-xs font-mono focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <Lock className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-arch-champagne hover:bg-arch-champagneLight text-arch-black font-mono text-xs font-bold uppercase tracking-architectural transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to System</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-arch-steel/40 flex items-center justify-between text-[10px] font-mono text-arch-slate">
            <span className="flex items-center gap-1.5 text-arch-champagne">
              <ShieldCheck className="w-3.5 h-3.5" />
              SHA-256 JWT Authenticated
            </span>
            <span>HYDRELEX // v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
