import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Logo } from './Logo';

const PwaRegister = dynamic(
  () => import('./PwaRegister').then((mod) => mod.PwaRegister),
  { ssr: false }
);

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        <Logo className="wordmark-logo" />
        ReelsDl.net
      </Link>
      <PwaRegister />
    </header>
  );
}
