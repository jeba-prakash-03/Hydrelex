import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { TechnicalEyebrow } from '../../components/ui/TechnicalEyebrow';

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
    <div
      className="min-h-screen bg-ink-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-steel-100"
      style={{ backgroundColor: '#0A0A0B' }}
    >
      <div className="w-full max-w-md relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo variant="light" />
          </div>
          <div className="pt-2">
            <TechnicalEyebrow variant="copper">
              MANAGEMENT ACCESS PORTAL
            </TechnicalEyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-steel-100 mt-1">
              Operations Control
            </h2>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-sm bg-graphite-900 border border-graphite-700 border-t-2 border-t-copper-500 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-sm bg-danger-500/15 border border-danger-500 text-danger-500 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block font-sans text-[12px] uppercase tracking-[0.14em] text-steel-300 mb-2 font-bold">
                Admin Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@hydrelex.com"
                  autoComplete="username"
                  className="w-full h-14 pl-11 pr-4 bg-ink-950 border border-steel-300/40 text-steel-100 rounded-xs text-sm font-sans focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none transition-colors placeholder:text-steel-300/40"
                />
                <Mail className="w-4 h-4 text-steel-300 absolute left-4 top-5" />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[12px] uppercase tracking-[0.14em] text-steel-300 mb-2 font-bold">
                Administrative Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full h-14 pl-11 pr-4 bg-ink-950 border border-steel-300/40 text-steel-100 rounded-xs text-sm font-sans focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none transition-colors placeholder:text-steel-300/40"
                />
                <Lock className="w-4 h-4 text-steel-300 absolute left-4 top-5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 inline-flex items-center justify-center gap-2.5 px-6 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all shadow-copper-glow active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to System</span>
                  <ArrowRight className="w-4 h-4 text-ink-950" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-graphite-700 flex items-center justify-between text-[11px] font-sans text-steel-300/70">
            <span className="flex items-center gap-1.5 text-copper-500 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              SHA-256 JWT Authenticated
            </span>
            <span className="font-mono">HYDRELEX // v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
