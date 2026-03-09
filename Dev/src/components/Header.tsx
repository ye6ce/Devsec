import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Show logo after scrolling down past the hero section (approx 100vh minus some buffer)
      if (window.scrollY > window.innerHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showLogo = !isHomePage || isScrolled;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Left: Menu */}
        <button className="text-stone-400 hover:text-stone-100 transition-colors flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-bold">
          <Menu size={16} />
          <span className="hidden sm:inline">Rituals</span>
        </button>

        {/* Center: Logo */}
        <Link 
          to="/" 
          className={`absolute left-1/2 -translate-x-1/2 text-3xl sm:text-4xl font-ravens text-stone-100 tracking-widest hover:text-white transition-all duration-700 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`} 
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
        >
          Ravens
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold hidden sm:inline">
                {user.username}
              </span>
              <button onClick={logout} className="text-stone-400 hover:text-stone-100 transition-colors" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsLoginOpen(true)} className="text-stone-400 hover:text-stone-100 transition-colors" title="Login">
              <UserCircle size={18} />
            </button>
          )}
          <button className="text-stone-400 hover:text-stone-100 transition-colors">
            <Search size={18} />
          </button>
          <button className="text-stone-400 hover:text-stone-100 transition-colors relative group">
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-stone-800 text-stone-300 text-[8px] flex items-center justify-center rounded-full border border-stone-600 group-hover:bg-stone-100 group-hover:text-black transition-colors">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
    <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
