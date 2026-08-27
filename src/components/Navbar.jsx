import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 72,
        background: scrolled ? 'var(--navy)' : 'transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.25)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
        display: 'flex', alignItems: 'center'
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <Link to="/" className="site-logo-link" aria-label="TxtilPros home">
            <img src="/logo.png" alt="TxtilPros Marketing & Services" />
          </Link>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0 }} className="desktop-nav">
            {navItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} style={{
                  color: pathname === item.path ? 'white' : 'rgba(255,255,255,0.75)',
                  textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.5px',
                  padding: '8px 14px', borderRadius: 6,
                  background: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.2s'
                }}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" style={{
                background: 'var(--orange)', color: 'white', textDecoration: 'none',
                fontSize: 13, fontWeight: 700, padding: '9px 20px', borderRadius: 6,
                transition: 'background 0.2s', marginLeft: 8
              }}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login" style={{
                background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none',
                fontSize: 13, fontWeight: 700, padding: '9px 20px', borderRadius: 6,
                transition: 'background 0.2s', marginLeft: 8, border: '1px solid rgba(255,255,255,0.15)'
              }}>
                Login
              </Link>
            </li>
          </ul>

          <button
            onClick={() => setOpen(!open)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: 22 }}
            className="mobile-toggle"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
              background: 'var(--navy)', padding: 16, display: 'flex', flexDirection: 'column', gap: 4,
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {[...navItems, { label: 'Contact Us', path: '/contact' }, { label: 'Login', path: '/login' }].map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                  padding: '12px 16px', borderRadius: 8, fontSize: 15, transition: 'background 0.2s'
                }}
              >
                {item.label}
              </Link>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .site-logo-link {
            width: 178px !important;
            height: 50px !important;
            padding: 7px 10px !important;
          }
        }
      `}</style>
    </>
  )
}
