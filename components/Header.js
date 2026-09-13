import Link from 'next/link';
import { Logo } from './Logo';
import { PwaRegister } from './PwaRegister';

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        <Logo className="wordmark-logo" />
        Reelstash
      </Link>
      <PwaRegister />
    </header>
  );
}
